import { Box, Container, Flex, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Divider, Center, Icon, Image, Button, Text } from "@chakra-ui/react"
import { HStack } from "@chakra-ui/react"
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'
import youtube from '../../assets/youtube.png'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../../firebase/firebase-config"
import { ref, set, get, update } from 'firebase/database'
import { getUserById } from "../../utils/utils"
import { useAuth } from "../../context/AuthContext"
import './header.css'


/**
 * Header component for the volleyball site.
 *
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [content, setContent] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const {logout} = useAuth();


    /**
     * Renders the content based on the user's login status.
     */
    const isLoggedInContent = () => {
        let content = '';

        if (user) {
            content = (
                <Flex direction='column' justify='center' >
                    <Text>Logged in as {currentUser?.username}</Text>
                    
                    <Button  w='100px' alignSelf='flex-end'onClick={async () => {
                        await logout(currentUser?.email, currentUser?.password);
                        navigate('/');
                    }}>Sign out</Button>
                </Flex>
            );
        } else {
            content = (
                <Flex>
                    <Button onClick={() => navigate('/auth/login')} marginRight={2}>Sign in</Button>

                    <Button onClick={() => navigate('/auth/register')} marginLeft={2}>Sign up</Button>
                </Flex>
            );
        }
        setContent(content);
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        
        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);


    useEffect(() => {
        getUserById(user?.uid, setCurrentUser);
         isLoggedInContent();
    }, [user]);


useEffect(() => {
    isLoggedInContent();
}, [currentUser]);

    return (
        <Flex className="slideInLeft" position='relative'  justifySelf='flex-start' h='200px' direction='column'  w= '90%'   textColor='white' marginRight='5%' marginLeft='5%'  bg='transparent' >
            <Flex w={['80%', '60%' , '90%', '90%']} justify='flex-end' paddingTop={10}>
                <HStack spacing={5}>

                    {content}


                    <Image src={facebook} boxSize="35px" alt="Facebook" />
                    <Image src={instagram} boxSize="35px" alt="Instagram" borderRadius="full" />
                    <Image src={youtube} boxSize="40px" alt="Youtube" borderRadius="full" />
                </HStack>
            </Flex>

            <Box w='27%' textColor='white' justify='flex-start' alignSelf='flex-start' bgColor='transparent'>
                <Heading  _hover={{ color: 'blue.300', cursor: 'pointer' }} onClick={() => navigate('/')}> HEAVEN 07</Heading>

            </Box>

            <Flex w='100%' h='100%' justify='space-between' direction='row' align='center' bgColor='transparent' paddingTop={5} marginBottom={5}>
                <Heading paddingLeft={['0', '0' , '5', '5']} paddingRight={['0', '0' , '5', '5']} size='sm' _hover={{ color: 'blue.300', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    HOME

                </Heading>

                <Divider orientation="vertical" height='20px' borderWidth='1px' >

                </Divider>

               

               

                <Heading paddingLeft={['0', '0' , '5', '5']} paddingRight={['0', '0' , '5', '5']} size='sm' _hover={{ color: 'blue.300', cursor: 'pointer' }} onClick={() => navigate('/coaches')}>
                    COACHES
                </Heading>

                <Divider orientation="vertical" height='20px' borderWidth='1px'>

                </Divider>

              
                

                <Heading paddingLeft={['0', '0' , '5', '5']} paddingRight={['0', '0' , '5', '5']} size='sm' _hover={{ color: 'blue.300', cursor: 'pointer' }} onClick={() => navigate('/about-us')}>
                    ABOUT US
                </Heading>

                <Divider orientation="vertical" height='20px' borderWidth='1px' >

                </Divider>

                <Heading paddingLeft={0} paddingRight={0} size='sm' _hover={{ color: 'blue.300', cursor: 'pointer' }} onClick={() => navigate('/contact')}>
                    CONTACT
                </Heading>
            </Flex>
        </Flex>
    )
}

export default Header