/**
 * Renders a single athlete component for the home page.
 * @param {Object} props - The component props.
 * @param {Object} props.athlete - The athlete object.
 * @param {boolean} props.isAdmin - Indicates if the user is an admin.
 * @returns {JSX.Element} The rendered component.
 */

import { Text, Flex, Image } from "@chakra-ui/react";

import { useState } from "react";
import { handleDeleteAthlete } from "../../utils/utils";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MotionButton, MotionText } from "../motionComponents/motionComponents";
import PropTypes from "prop-types";
import "./singleHomePageAthlete.css";

const SingleHomePageAthlete = ({ athlete, isAdmin }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <Flex w="100%" direction="column" justify="center" align="center">
      <motion.div
        layout
        id="athlete-pic"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          name={athlete.firstname}
          src={athlete.picture}
          fit="cover"
          boxSize={["85px", "90px", "100px", "150px"]} //   {["xl", "lg", "2xl", "2xl"]}
          borderRadius="full"
          sx={{ userSelect: 'none' }} 
        /> 
        {/* {isAdmin() && isHovered && (
          <Flex justify="space-evenly" direction="column" position="absolute">
            {" "}
            <Button
              zIndex={10}
              colorScheme="red"
              onClick={() => navigate(`/detailed-athlete-view/:${athlete.uid}`)}
            >
              View profile
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleDeleteAthlete(athlete.uid)}
            >
              Delete
            </Button>
          </Flex>
        )} */}
        {isAdmin && isHovered && (
          <Flex
            w="100%"
            justify="center"
            align="center"
            direction="column"
            position="absolute"
            top={['20%', '20%' , '30%' , '30%']}
            gap={1}
          >
            <MotionButton
              w="80%"
              layout
              size="sm" //{["sm", "sm", "md", "md"]}
              backgroundColor="red"
              whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.6, transition: { duration: 0.1 } }}
              p={[0.5, 1, 1, 1]}
              borderRadius="13px"
              
              onClick={() => navigate(`/detailed-athlete-view/${athlete.uid}`)}
            
            
            >
              <MotionText layout fontSize="clamp(11px, 2vw, 13px)">View profile</MotionText>
            </MotionButton>

            <MotionButton
              w={['80%', '80%', '80%', '80%']}
              layout
              size="sm" //{["sm", "sm", "md", "md"]}
              backgroundColor="red"
              whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.6, transition: { duration: 0.1 } }}
              p={[0.5, 1, 1, 1]}
              borderRadius="13px"
              
              onClick={() =>handleDeleteAthlete(athlete.uid, athlete.gender)}
            
            
            >
               
              <MotionText layout fontSize="clamp(8px, 2vw, 13pxrem)">Delete</MotionText>
            </MotionButton>
          </Flex>
        )}

{!isAdmin && isHovered && (
          <Flex justifyContent='center' align='center'>

          
           <MotionButton
           w={["90%", '80%' , '80%' , '80%']}
           layout
           size="sm" //{["sm", "sm", "md", "md"]}
           backgroundColor="red"
          position='absolute'
          top={['20%', '20%' , '35%' , '35%']}
           whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
           whileTap={{ scale: 0.6, transition: { duration: 0.1 } }}
           p={1}
           borderRadius="13px"
           
           onClick={() => navigate(`/detailed-athlete-view/${athlete.uid}`)}
         
         
         >
           <MotionText layout fontSize="clamp(11px, 2vw, 13px)">View profile</MotionText>
         </MotionButton>
</Flex>
        )}
      </motion.div>

      <Flex
        direction="column"
        justify="center"
        align="center"
        w="100%"
        mt="5px"
      >
        <Text>{athlete.firstname}</Text>
        <Text>{athlete.lastname}</Text>
      </Flex>
    </Flex>
  );
};

SingleHomePageAthlete.propTypes = {
  athlete: PropTypes.exact({
    description: PropTypes.string,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    picture: PropTypes.string,
    uid: PropTypes.string.isRequired,
    videoID: PropTypes.string,
    gender: PropTypes.string,
  }),
  isAdmin: PropTypes.bool,
};

export default SingleHomePageAthlete;
