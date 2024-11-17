/**
 * Component for displaying detailed information about an athlete.
 * @component
 * @returns {JSX.Element} DetailedAthletePage component
 */
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import { Box, Flex, Heading, Input, Button, Textarea } from "@chakra-ui/react";

import { useAuth } from "../../context/AuthContext";
import { subscribeToAthleteById } from "../../utils/utils";
import { updateAthlete } from "../../utils/utils";

import { SkeletonText } from "../ui/skeleton";
import "./detailedAthlete.css";

const DetailedAthletePage = () => {
  const { id } = useParams();
  const [athlete, setAthlete] = useState({});
  const { isAdmin } = useAuth();
  const gender = useLocation().state.gender;
  

  const [videoId, setVideoId] = useState("");

  const [description, setDescription] = useState("");
  const formattedDescription = athlete?.description
    ?.split("\n")
    .map((item, index) => {
      if (item.includes("http")) {
        item = item.split(": ");
        if (item.length > 1) {
          return (
            <p key={index}>
              {item[0]}{" "}
              <a
                className="link"
                onClick={() =>
                  window.open(item[1], "_blank", "noopener,noreferrer")
                }
              >
                {item[1]}
              </a>
            </p>
          );
        } else {
          return (
            <p
              key={index}
              className="link"
              onClick={() => window.open(item, "_blank", "noopener,noreferrer")}
            >
              {item}
            </p>
          );
        }
      } else {
        return <p key={index}>{item}</p>;
      }
    });

  const handleAddVideo = async () => {
    const videoProp = {
      videoID: videoId,
    };
    await updateAthlete(id, videoProp, gender);
    setVideoId("");
  };

  /**
   * Handles the deletion of a video for the athlete.
   * @returns {Promise<void>}
   */
  const handleDeleteVideo = async () => {
    const videoProp = {
      videoID: null,
    };
    await updateAthlete(id, videoProp, gender);
    setVideoId("");
  };

  /**
   * Handles the submission of the athlete's description.
   * Updates the athlete's description using the updateAthlete function.
   * @returns {Promise<void>} A promise that resolves when the athlete's description is updated.
   */
  const handleSubmitDescription = async () => {
    const descriptionProp = {
      description: description,
    };
    await updateAthlete(id, descriptionProp, gender);
    setDescription(description);
  };

  useEffect(() => {
    let unsubscribe;
   
    subscribeToAthleteById(id, setAthlete, gender)
      .then((func) => {
        unsubscribe = func;
      })
      .catch((error) =>
        console.log(`Failed retrieving athlete data: ${error.message}`)
      );

    // Unsubscribe when the component unmounts
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [id, gender]);

  useEffect(() => {
    setDescription(athlete?.description);
  
  }, [athlete]);

  return (
    <Flex w="100%" direction="column" justify="flex-start" align="center">
      <div id="videoContainer" className="fadeIn">
        <iframe
          className="video"
          src={`https://www.youtube.com/embed/${athlete?.videoID}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Athlete Video"
        >
          Your browser does not support the video tag.
        </iframe>
      </div>

      {isAdmin && (
        <Flex
          w="10%"
          h="10%"
          direction="column"
          justify="center"
          align="center"
          gap={5}
        >
          {!athlete?.videoID && (
            <Input
              bg="white"
              w={200}
              type="text"
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
            ></Input>
          )}
          {!athlete?.videoID && (
            <Button colorScheme="red" onClick={handleAddVideo}>
              Add video
            </Button>
          )}
          {athlete?.videoID && (
            <Button colorScheme="red" onClick={handleDeleteVideo}>
              Delete video
            </Button>
          )}
        </Flex>
      )}

      <Flex
        w={["100%", "100%", "50%", "50%"]}
        borderRadius="1px"
        h={["100%", "100%", "100%", "20%"]}
        justify="center"
        align="center"
      >
        <div className="description">
          {!isAdmin && (
            <Box
              padding={5}
              h={["100%", "100%", "100%", "100%"]}
              boxShadow="5px"
              w="100%"
            >
              <Heading>{athlete?.firstname + " " + athlete?.lastname}</Heading>

              {!athlete?.description && (
                <SkeletonText mt="4" noOfLines={4} spacing="4" />
              )}
              {athlete?.description && !isAdmin && <>{formattedDescription}</>}
            </Box>
          )}
          <Flex w="100%" direction="column" gap={5}>
            {isAdmin && (
              <Textarea
                bg="white"
                color="black"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Textarea>
            )}
            {isAdmin && description !== athlete?.description && (
              <Button onClick={handleSubmitDescription}>
                {" "}
                Submit description
              </Button>
            )}{" "}
          </Flex>
        </div>
      </Flex>
    </Flex>
  );
};

export default DetailedAthletePage;
