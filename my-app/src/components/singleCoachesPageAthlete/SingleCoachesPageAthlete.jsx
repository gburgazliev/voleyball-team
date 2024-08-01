import './singleCoach.css'
import { getUserById, deleteStorageObject, deleteDatabaseObject } from '../../utils/utils'
import { useState, useEffect } from 'react'

const SingleCoachesPageCoach = ({user, coach}) => {
    

  const handleDeleteCoach = async () => {
    if (coach.imageURL){
      await deleteStorageObject(coach.imageURL);
    }
        await deleteDatabaseObject(`coaches/${coach.uid}`);
  }



     
  
    return (
        <div class='single-coach-container'>
          
                <img class='coach-image' src={coach.imageURL} alt="" />
             
              
              
                 <div className="navigation">
                  <div id='coach-names'> 
                    <p>{coach.firstName} </p> 
                    <p>{coach.lastName}</p>
                  </div>
               
                <button>View profile</button>
                {user && user.role === 'admin' ? <button onClick={handleDeleteCoach}>Delete</button> : null}
               
               </div>
                
        </div>
    )
}

export default SingleCoachesPageCoach