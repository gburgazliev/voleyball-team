import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getUserById } from "../../utils/utils";
import { Box, Flex, Image, Text, Heading, List, ListItem, ListIcon, OrderedList, Skeleton, SkeletonCircle, SkeletonText, UnorderedList, Input, Button, Container, Textarea, Popover, PopoverArrow, PopoverAnchor, PopoverBody, PopoverTrigger, PopoverContent, PopoverHeader, PopoverCloseButton } from "@chakra-ui/react"
import { useAuth } from "../../context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebase-config";
import { subscribeToAthleteById } from "../../utils/utils";
import { updateAthlete } from "../../utils/utils";
import { set } from "firebase/database";


const DetailedAthletePage = () => {
    const { id } = useParams();
    const [athlete, setAthlete] = useState({});
    const [videoFile, setVideoFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const { user } = useAuth();
    const [currUser, setUser] = useState({});
    const [userData, setUserData] = useState({});
    const [videoId, setVideoId] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = subscribeToAthleteById(id.slice(1), setAthlete);

        // Unsubscribe when the component unmounts
        return () => {
            unsubscribe();
            setIsLoading(false);
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

    const handleSubmitDescription = async () => {
        setIsLoading(true);
        const descriptionProp = {
            description: description
        }
        await updateAthlete(id.slice(1), descriptionProp);
        setDescription(description);
        setIsLoading(false);
    }


    return (
        <Flex w='100%' h='100%' direction='column' justify='center' align='center' bgColor='black'  >
            <Flex w={['100%', '100%', '50%', '45%']} h='53%' direction='column' align='center' bgColor='black' >
                <iframe width='100%'
                    height="100%"

                    src={`https://www.youtube.com/embed/${athlete?.videoID}`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Athlete Video">
                    Your browser does not support the video tag.
                </iframe>

            </Flex>

            {currUser.role === 'admin' && <Flex w='10%' h='10%' direction='column' justify='center' align='center'>

                <Input type="text" value={videoId} onChange={(e) => setVideoId(e.target.value)}></Input>
                {!athlete?.videoID && <Button colorScheme='red' onClick={handleAddVideo}>Add video</Button>}
                {athlete?.videoID && <Button colorScheme='red' onClick={handleDeleteVideo}>Delete video</Button>}
            </Flex>}


            <Flex w={['100%', '100%', '50%', '50%']} borderRadius='1px' h={['10%', '20%', '30%']} align='flex-start' justify='flex-start' direction='column'>
                <Box padding={6} marginTop={5} boxShadow='lg' bg='white' w='100%'>
                    <Heading >{athlete?.firstname + '' + athlete?.lastname}</Heading>
                    {isLoading ? (
    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
) : (
    <Text>{athlete?.description}</Text>
)}
                </Box>

                {currUser.role === 'admin' && <Textarea bg='white' value={description} onChange={(e) => setDescription(e.target.value)} ></Textarea>}

            </Flex>
            {currUser.role === 'admin' && description !== athlete.description && <Button onClick={handleSubmitDescription}> Submit description</Button>}
        </Flex>
    )
}

export default DetailedAthletePage