import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getUserById } from "../../utils/utils";
import { Box, Flex, Image, Text, Heading, List, ListItem, ListIcon, OrderedList, UnorderedList, Input, Button, Container,Textarea } from "@chakra-ui/react"
import { useAuth } from "../../context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebase-config";
import { subscribeToAthleteById } from "../../utils/utils";
import { updateAthlete } from "../../utils/utils";


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
        const descriptionProp = {
            description: description
        }
        await updateAthlete(id.slice(1), descriptionProp);
        setDescription(description);
    }


    return (
        <Flex w='100%' h='100%' direction='column' justify='center' align='center'>
            <Flex w='50%' h='50%' direction='column' >
                <iframe width="100%"
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


            <Flex w='50%' borderRadius='1px' bg='green' borderColor='green'>
                {currUser.role !== 'admin' && <Container>{athlete?.description}</Container>}
                {currUser.role === 'admin' && <Textarea value={description} onChange={(e) => setDescription(e.target.value)} ></Textarea>}

            </Flex>
            {currUser.role === 'admin' && description !== athlete.description && <Button onClick={handleSubmitDescription}> Submit description</Button>}
        </Flex>
    )
}

export default DetailedAthletePage