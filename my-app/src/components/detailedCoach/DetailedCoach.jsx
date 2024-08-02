import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { subscribeToCoachById } from '../../utils/utils'
  
  const DetailedCoach = () => {
    const { id } = useParams()
    const [ coach, setCoach ] = useState({});

    

    useEffect(() => {
        subscribeToCoachById(id.slice(1), setCoach)
      
    }, [id])


useEffect(() => {   
    console.log(coach)
}
, [coach])
 
useEffect(() => {
  console.log(id)

}, [id])


    return (
      <div>
        <h1>Coach</h1>
        <h1>{coach.firstName}</h1>
        <h1>{coach.lastName}</h1>
        <img src={coach.imageURL} alt
        ={`${coach.firstName} ${coach.lastName}`} />
        
      </div>
    )
  }

    export default DetailedCoach