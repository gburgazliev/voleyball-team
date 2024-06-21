import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getAthleteById, getUserById } from "../../utils/utils";
import { Box, Flex, Image, Text, Heading, List, ListItem, ListIcon, OrderedList, UnorderedList,Input, Button } from "@chakra-ui/react"
import { useAuth } from "../../context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebase-config";


const DetailedAthletePage = () => {
    const { id } = useParams();
    const [athlete, setAthlete] = useState({});
    const [videoFile, setVideoFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const { user } = useAuth();
    const [currUser, setUser] = useState({});
    const [userData, setUserData] = useState({});

       
    useEffect(() => {
        const fetchAthlete = async () => {
            return await getAthleteById(id.slice(1));
        };
        fetchAthlete()
            .then((data) => {
                setAthlete(data);
            })
            .catch((error) => {
                console.error(error);
            });
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

   
    return (
        <Flex w='100%' h='100%' direction='column' justify='center' align='center'>
            <Flex w='50%' h='50%' direction='column' >
                <iframe   width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${athlete.videoID}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Athlete Video">
                    Your browser does not support the video tag.
                </iframe>

            </Flex>

            { currUser.role === 'admin' && <Flex w='10%' h='10%' direction='column' justify='center' align='center'>
                   
               <Input type="text"></Input>
              {!athlete.videoID && <Button colorScheme='red' onClick={() => {}}>Add video</Button>}
                {athlete.videoID && <Button colorScheme='red'  onClick={() => {}}>Delete video</Button>}
            </Flex>}

            
            <Flex w='50%' borderRadius='1px' bg='green'>
                <Heading>{athlete.firstname} {athlete.lastname}</Heading>
            </Flex>
        </Flex>
    )
}

export default DetailedAthletePage