import './singleCoach.css'
import { getUserById, deleteStorageObject, deleteDatabaseObject } from '../../utils/utils'
import { useState, useEffect } from 'react'

const SingleCoachesPageCoach = ({user, coach}) => {
    

  const handleDeleteCoach = async () => {
        await deleteStorageObject(coach.imageURL);
        await deleteDatabaseObject(`coaches/${coach.uid}`);
  }



     
  
    return (
        <div class='single-coach-container'>
          
                <img class='coach-image' src={coach.imageURL} alt="" />
         
                 <p>{coach.firstName} {coach.lastName}</p>
              
                 <div className="navigation">
                <button>View profile</button>
                {user && user.role === 'admin' ? <button onClick={handleDeleteCoach}>Delete</button> : null}
               
               </div>
              
        </div>
    )
}

export default SingleCoachesPageCoach