import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { subscribeToCoachById } from "../../utils/utils";
import "./detailedCoach.css";
import { useAuth } from "../../context/AuthContext";
import { updateCoach } from "../../utils/utils";
import { Box } from "@chakra-ui/react";

const DetailedCoach = () => {
  const { id } = useParams();
  const [coach, setCoach] = useState({});
  const { userData } = useAuth();

  const [coachDescription, setCoachDescription] = useState("");
  const formatCoachDescription =  coach?.description
    ? coach?.description.split("\n").map((string, index) => {
        return <li key={index}>{string}</li>;
      })
    : [];

  const handleSubmit = async () => {
    await updateCoach(coach.uid, { description: coachDescription });
  };
  useEffect(() => {
    const unsubscribe = subscribeToCoachById(id.slice(1), setCoach);

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    setCoachDescription(coach?.description || "");
  }, [coach]);

  return (
    <Box w={['90%' , '80%', '80%', '50%']} paddingTop={['30px', '30px' ,'30px' , '0px']}>
      <div id="coach-details-container">
        <img
          id="detailed-coach-image"
          src={coach.imageURL}
          alt={`${coach.firstName} ${coach.lastName}`}
        />

        <div id="coach-description">
          <h1>
            {coach.firstName} {coach.lastName}
          </h1>
          {userData?.role === "admin" ? (
            <>
              {formatCoachDescription}
              <textarea
                id="admin-text-area"
                cols="30"
                rows="10"
                value={coachDescription}
                onChange={(e) => setCoachDescription(e.target.value)}
              >
                
              
              </textarea>
            </>
          ) : (
            <or>{formatCoachDescription}</or>
          )}

          {userData?.role === "admin" &&
            coach?.description !== coachDescription && (
              <>
                <button
                  onClick={() => setCoachDescription(coach?.description || "")}
                >
                  Cancel
                </button>
                <button onClick={handleSubmit}>Save</button>{" "}
              </>
            )}
        </div>
      </div>
    </Box>
  );
};

export default DetailedCoach;
