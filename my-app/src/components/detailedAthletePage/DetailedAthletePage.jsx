/**
 * Component for displaying detailed information about an athlete.
 * @component
 * @returns {JSX.Element} DetailedAthletePage component
 */
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { delay, motion, stagger } from "framer-motion";
import {
  MotionList,
  MotionListItem,
  MotionFlex,
} from "../motionComponents/motionComponents";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Textarea,
  List,
  InputAddon,
  Group,
  Editable,
  AspectRatio,
  IconButton,
} from "@chakra-ui/react";
import { InputGroup } from "../ui/input-group";
import { LuCheck, LuPencilLine, LuScale, LuX } from "react-icons/lu";
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
  const [isEditableOpen, setIsEditableOpen] = useState(false);
  const [isEditableVideoOpen, setIsEditableVideoOpen] = useState(false);
  const [isAchievmentsHovered, setIsAchievmentsHovered] = useState(false);
  const [isListVisible, setIsListVisible] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [description, setDescription] = useState("");
  const listVariants = {
    invisible: {
     height: 0,
     width: 0,
      opacity: 0,
      scale: 0,
    },
    visible: {
      width: 'auto',
      height: 'auto',
      scale: 1,
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };
  const listItemVariants = {
    invisible: {
      opacity: 0,
      y: -10, 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const formattedDescription = athlete?.description
    ?.split("\n")
    .map((item, index) => {
      if (item.includes("http")) {
        item = item.split(": ");
        if (item.length > 1) {
          return (
            <Text key={index}>
              {item[0]}{" "}
              <a
                className="link"
                onClick={() =>
                  window.open(item[1], "_blank", "noopener,noreferrer")
                }
              >
                {item[1]}
              </a>
            </Text>
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
        return (
          <Text fontFamily='monospace' color="white" key={index}>
            {item}
          </Text>
        );
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
    <Flex
      direction={["column", "column", "column", "row"]}
      justifyContent="center"
      alignItems="center"
      mt={[10, 10, 5, 0]}
      p={5}
      gap={2}
      overflow="hidden"
    >
      <Box>
        <Flex justifyContent="space-between">
          <Text fontFamily="heading" fontSize="clamp(15px, 4vw, 1.5rem)">
            {athlete.firstname && `${athlete.firstname}'s highlight video`}{" "}
          </Text>
          <Box>
            {!isEditableVideoOpen && (
              <IconButton
                variant="ghost"
                size="xs"
                onClick={() => setIsEditableVideoOpen(!isEditableVideoOpen)}
              >
                <LuPencilLine />
              </IconButton>
            )}
            {isEditableVideoOpen && (
              <>
                <IconButton
                  variant="outline"
                  size="xs"
                  onClick={() => {
                    handleAddVideo();
                    setIsEditableVideoOpen(false);
                  }}
                >
                  <LuCheck />
                </IconButton>

                <IconButton
                  variant="outline"
                  size="xs"
                  onClick={() => setIsEditableVideoOpen(false)}
                >
                  <LuX />
                </IconButton>
              </>
            )}
            {isEditableVideoOpen && (
              <Input
                placeholder="Example: abbstDTVweY"
                bg="bg.subtle"
                color="white"
                value={videoId}
                onChange={(e) => setVideoId(e.target.value)}
              />
            )}
          </Box>
        </Flex>

        <AspectRatio
          w={["350px", "350px", "700px", "700px"]}
          ratio={16 / 9}
          minH={100}
          border="3px solid"
          borderColor="border.emphasized"
          boxShadow={["2xl", "2xl", "lg", "lg"]}
          order={0}
        >
          <iframe
            title="naruto"
            src={`https://www.youtube.com/embed/${athlete?.videoID}`}
            allowFullScreen
          />
        </AspectRatio>
      </Box>

      {isAdmin && (
        <Editable.Root
          value={description}
          color="white"
          order={2}
          w={
            isEditableOpen
              ? ["100%", "100%", "80%", "80%"]
              : ["100%", "5%", "5%", "5%"]
          }
        >
          <Editable.Textarea
            minW="300px"
            minH="200px"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Editable.Control>
            <Editable.EditTrigger asChild>
              <IconButton
                variant="ghost"
                size="xs"
                onClick={() => setIsEditableOpen(!isEditableOpen)}
              >
                <LuPencilLine />
              </IconButton>
            </Editable.EditTrigger>
            <Editable.CancelTrigger asChild>
              <IconButton
                variant="outline"
                size="xs"
                onClick={() => setIsEditableOpen(false)}
              >
                <LuX />
              </IconButton>
            </Editable.CancelTrigger>
            <Editable.SubmitTrigger asChild>
              <IconButton
                variant="outline"
                size="xs"
                onClick={() => {
                  handleSubmitDescription();
                  setIsEditableOpen(false);
                }}
              >
                <LuCheck />
              </IconButton>
            </Editable.SubmitTrigger>
          </Editable.Control>
        </Editable.Root>
      )}
      {!isEditableOpen && (
        <MotionFlex
          layout
          flexDirection="column"
          p={3}
          order={1}
          bg="bg.subtle"
          border="2px solid"
          borderColor="border.info"
          position="relative"
          onClick={() => setIsListVisible(!isListVisible)}
          whileHover={() => setIsAchievmentsHovered(true)}
          onHoverEnd={() => setIsAchievmentsHovered(false)}
        >
          {isAchievmentsHovered && (
            <MotionFlex
              layout
              cursor="pointer"
              onClick={() => {
                console.log("asdasdsad");
                setIsListVisible(!isListVisible);
              }}
              position="absolute"
              zIndex={10}
              bg="rgba(0, 0, 0, 0.5)"
              h="100%"
              w="100%"
              top={0}
              left={0}
            />
          )}

          <Text
            alignSelf="center"
            fontSize="clamp(10px, 3vw, 2rem)"
            fontFamily="heading"
            userSelect="none"
            color="white"
          >
            Achievments
          </Text>
          <MotionList
            layout
            initial="invisible"
            animate={isListVisible ? "visible" : "invisible"}
            variants={listVariants}
            as="ol"
            maxW={["250px", "300px", "400px", "500px"]}
            overflow="hidden"
          >
            {formattedDescription?.map((item) => (
              <MotionListItem
                variants={listItemVariants}
                layout
                fontSize="clamp(12px, 4vw, 1rem)"
              
                key={item}
              >
                {item}
              </MotionListItem>
            ))}
          </MotionList>
        </MotionFlex>
      )}
    </Flex>
  );
};

export default DetailedAthletePage;
