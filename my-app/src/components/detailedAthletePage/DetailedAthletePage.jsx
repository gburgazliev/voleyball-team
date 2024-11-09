/**
 * Component for displaying detailed information about an athlete.
 * @component
 * @returns {JSX.Element} DetailedAthletePage component
 */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getUserById } from "../../utils/utils";
import { Box, Flex, Heading, Input, Button,Textarea } from "@chakra-ui/react"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebase-config";
import { subscribeToAthleteById } from "../../utils/utils";
import { updateAthlete } from "../../utils/utils";
import Loader from "../loader/Loader";
import { SkeletonText } from "../ui/skeleton";
import './detailedAthlete.css'



const DetailedAthletePage = () => {
    const { id } = useParams();
    const [athlete, setAthlete] = useState({});
    const [currUser, setUser] = useState({});
    const [userData, setUserData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [videoId, setVideoId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState('');
    const formattedDescription = athlete?.description?.split('\n').map((item) =>{
        

        if(item.includes('http')){
          item = item.split(' -')
          if(item.length > 1){
                 
                return <p>{item[0]} <a class='link'  onClick={() => window.open(item[1], '_blank', 'noopener,noreferrer')}>{item[1]}</a></p>
            } else {
            
                return <p class='link'  onClick={() => window.open(item, '_blank', 'noopener,noreferrer')}>{item}</p>
            }
        } else {
            return <p>{item}</p>
        }
    });



    useEffect(() => {
           setIsLoaded(true);
        const unsubscribe = subscribeToAthleteById(id.slice(1), setAthlete, setIsLoaded);

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




    return (<Flex w='100%' direction='column' justify='flex-start' align='center'  >
      

       {isLoaded ? <div id='detailed-athlete-loader'>
           <Loader /> 
        </div>  :
           <div id='videoContainer' class='fadeIn'>
                <iframe 
                 class="video"
                src={`https://www.youtube.com/embed/${athlete?.videoID}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Athlete Video">
                Your browser does not support the video tag.
            </iframe>
        </div>

        }


        
          
        

        {currUser.role === 'admin' && <Flex w='10%' h='10%' direction='column' justify='center' align='center' gap={5} >

           {!athlete?.videoID && <Input bg='white' w={200} type="text" value={videoId} onChange={(e) => setVideoId(e.target.value)}></Input>}
            {!athlete?.videoID && <Button colorScheme='red' onClick={handleAddVideo}>Add video</Button>}
            {athlete?.videoID && <Button colorScheme='red' onClick={handleDeleteVideo}>Delete video</Button>}
        </Flex>}


        <Flex w={['100%', '100%', '50%', '50%']}  borderRadius='1px' h={['100%', '100%', '100%', '20%']} justify='center' align='center'  >
            <div className="description">
               {currUser.role !== 'admin' && <Box padding={5} h={['100%', '100%', '100%', '100%']} boxShadow='5px'  w='100%'>
                <Heading >{athlete?.firstname + ' ' + athlete?.lastname}</Heading>

                {!athlete?.description && <SkeletonText mt="4" noOfLines={4} spacing="4" />}
                {athlete?.description && currUser.role !== 'admin' && <>{formattedDescription}</>}

            </Box>}
<Flex w='100%'  direction='column' gap={5}>
            {currUser.role === 'admin' && <Textarea bg='white' color='black' value={description} onChange={(e) => setDescription(e.target.value)} ></Textarea>  }

      
        {currUser.role === 'admin' && description !== athlete?.description && <Button onClick={handleSubmitDescription}> Submit description</Button>} </Flex>
            </div>
              </Flex>
              
        
    </Flex>

    )
}

export default DetailedAthletePage