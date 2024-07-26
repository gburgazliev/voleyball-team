/**
 * Component for displaying detailed information about an athlete.
 * @component
 * @returns {JSX.Element} DetailedAthletePage component
 */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getUserById } from "../../utils/utils";
import { Box, Avatar, Flex, Image, Text, Heading, List, ListItem, ListIcon, OrderedList, Skeleton, SkeletonCircle, SkeletonText, UnorderedList, Input, Button, Container, Textarea, Popover, PopoverArrow, PopoverAnchor, PopoverBody, PopoverTrigger, PopoverContent, PopoverHeader, PopoverCloseButton, Grid } from "@chakra-ui/react"
import { useAuth } from "../../context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebase-config";
import { subscribeToAthleteById } from "../../utils/utils";
import Header from "../header/Header";
import { updateAthlete } from "../../utils/utils";
import { isMobileDevice } from "../../utils/utils";
import MobileHeader from "../mobileHeader/MobileHeader";
import './detailedAthlete.css'


const DetailedAthletePage = () => {
    const { id } = useParams();
    const [athlete, setAthlete] = useState({});
    const [currUser, setUser] = useState({});
    const [userData, setUserData] = useState({});
    const [videoId, setVideoId] = useState('');
    const [description, setDescription] = useState('');
    const formattedDescription = athlete?.description?.split('\n').map((item) => <p>{item}</p>);



    useEffect(() => {
        const unsubscribe = subscribeToAthleteById(id.slice(1), setAthlete);

        // Unsubscribe when the component unmounts
        return () => {
            unsubscribe();

        };

    }, [id])


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUserData(currentUser);
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);


    useEffect(() => {
        getUserById(userData?.uid, setUser)

    }, [userData]);

    const handleAddVideo = async () => {
        const videoProp = {
            videoID: videoId
        }
        await updateAthlete(id.slice(1), videoProp);
        setVideoId('');

    }


    /**
     * Handles the deletion of a video for the athlete.
     * @returns {Promise<void>}
     */
    const handleDeleteVideo = async () => {
        const videoProp = {
            videoID: null
        }
        await updateAthlete(id.slice(1), videoProp);
        setVideoId('');
    }

    useEffect(() => {
        setDescription(athlete?.description);
    }, [athlete])

    /**
     * Handles the submission of the athlete's description.
     * Updates the athlete's description using the updateAthlete function.
     * @returns {Promise<void>} A promise that resolves when the athlete's description is updated.
     */
    const handleSubmitDescription = async () => {

        const descriptionProp = {
            description: description
        }
        await updateAthlete(id.slice(1), descriptionProp);
        setDescription(description);

    }


    return (<Flex w='100%' minH='100%'direction='column' justify='center' align='center' bgColor='black' >
        {!isMobileDevice()? <Flex position='absolute' w={['100%', '100%', '100%', '100%']} top={0} justify='center' h='5%' bg='black'  bgColor='black'>
            <Header />
        </Flex> : 
        <div className='header'>    <MobileHeader /></div>
         
       }


        
             <div id='videoContainer'>
                <iframe 
                 className="video"
                src={`https://www.youtube.com/embed/${athlete?.videoID}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Athlete Video">
                Your browser does not support the video tag.
            </iframe>
        </div>

        

        {currUser.role === 'admin' && <Flex w='10%' h='10%' direction='column' justify='center' align='center'>

            <Input bg='white' type="text" value={videoId} onChange={(e) => setVideoId(e.target.value)}></Input>
            {!athlete?.videoID && <Button colorScheme='red' onClick={handleAddVideo}>Add video</Button>}
            {athlete?.videoID && <Button colorScheme='red' onClick={handleDeleteVideo}>Delete video</Button>}
        </Flex>}


        <Flex w={['100%', '100%', '50%', '50%']} borderRadius='1px' h={['100%', '100%', '100%', '20%']} justify='center' align='center'  >
            <div className="description">
               {currUser.role !== 'admin' && <Box padding={5} h={['100%', '100%', '100%', '100%']}boxShadow='lg' bg='black' w='100%'>
                <Heading >{athlete?.firstname + '' + athlete?.lastname}</Heading>


                {!athlete?.description && <SkeletonText mt="4" noOfLines={4} spacing="4" />}
                {athlete?.description && currUser.role !== 'admin' && <Text >{formattedDescription}</Text>}

            </Box>}
<Flex w='100%' >
            {currUser.role === 'admin' && <Textarea bg='white' value={description} onChange={(e) => setDescription(e.target.value)} ></Textarea>  }

      
        {currUser.role === 'admin' && description !== athlete.description && <Button onClick={handleSubmitDescription}> Submit description</Button>} </Flex>
            </div>
              </Flex>
        
    </Flex>

    )
}

export default DetailedAthletePage