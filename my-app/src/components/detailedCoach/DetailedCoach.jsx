import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { subscribeToCoachById } from '../../utils/utils'
import './detailedCoach.css'
import Header from '../header/Header'
import { isMobileDevice } from '../../utils/utils'
import Footer from '../footer/Footer'
import MobileHeader from '../mobileHeader/MobileHeader'
import { useAuth } from '../../context/AuthContext'
import { getUserById, updateCoach } from '../../utils/utils'


const DetailedCoach = () => {
  const { id } = useParams()
  const [coach, setCoach] = useState({});
  const { user } = useAuth();
  const [userData, setUser] = useState({});
  const [coachDescription, setCoachDescription] = useState('');


  useEffect(() => {
    getUserById(user?.uid, setUser)
  }, [user])


  useEffect(() => {
    subscribeToCoachById(id.slice(1), setCoach)

  }, [id])

  useEffect(() => {
    setCoachDescription(coach?.description || '')

  }, [coach])
 

  const handleSubmit = async () => {
    await updateCoach(coach.uid, { description: coachDescription })
  }



  return (
     <div class='detailed-coach-container'>


        <div id="coach-details-container">
          <img id='detailed-coach-image' src={coach.imageURL} alt

            ={`${coach.firstName} ${coach.lastName}`} />

          <div id='coach-description'>
            <h1>{coach.firstName} {coach.lastName}</h1>
            {userData?.role === 'admin' ? <><p>{coach?.description}</p>
              <textarea id='admin-text-area' cols="30" rows="10" value={coachDescription} onChange={(e) => setCoachDescription(e.target.value)}>
                {coach?.description}
              </textarea>
            </>
                :
              <p>{coach?.description}</p>
            }

            {userData?.role === 'admin' && coach?.description !== coachDescription && <><button onClick={() => setCoachDescription(coach?.description || '')}>Cancel</button> <button onClick={handleSubmit}>Save</button> </>}




          </div>
        </div>




      </div>
    

   



  )
}

export default DetailedCoach