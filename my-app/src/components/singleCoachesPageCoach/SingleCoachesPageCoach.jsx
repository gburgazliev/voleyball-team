import "./singleCoach.css";
import { deleteStorageObject, deleteDatabaseObject } from "../../utils/utils";

import { useNavigate } from "react-router-dom";

const SingleCoachesPageCoach = ({ isAdmin, coach }) => {
  const navigate = useNavigate();

  const handleDeleteCoach = async () => {
    if (coach.imageURL) {
      await deleteStorageObject(coach.imageURL);
    }
    await deleteDatabaseObject(`coaches/${coach.uid}`);
  };

  return (
    <div className="single-coach-container">
      <img className="coach-image" src={coach.imageURL} alt="" />

      <div className="navigation">
        <div id="coach-names">
          <p className="single-coach-name">{coach.firstName} </p>
          <p className="single-coach-name">{coach.lastName}</p>
        </div>

        <button  onClick={() => navigate(`/detailed-coach/:${coach.uid}`)}>
          View profile
        </button>
        {isAdmin ? <button onClick={handleDeleteCoach}>Delete</button> : null}
      </div>
    </div>
  );
};

export default SingleCoachesPageCoach;
