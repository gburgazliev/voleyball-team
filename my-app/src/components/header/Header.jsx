import {Flex, Heading, Divider,  Image, Button } from "@chakra-ui/react"
import { HStack } from "@chakra-ui/react"
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'
import youtube from '../../assets/youtube.png'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../../firebase/firebase-config"
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
    const { logout } = useAuth();
    const [theme, setTheme] = useState(false);


    /**
     * Renders the content based on the user's login status.
     */
    const isLoggedInContent = () => {
        let content = '';

        if (user) {
            content = (
                <div id="log-in-info" >
                    <p>Welcome, {currentUser?.username} !</p>

                    <Button w='100px' alignSelf='flex-end' onClick={async () => {
                        await logout(currentUser?.email, currentUser?.password);
                        navigate('/');
                    }}>Sign out</Button>
                </div>
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


    useEffect(() => {
        const themeSwitch = document.getElementById('theme-switch');
        const body = document.querySelector('body');
        const moon = document.getElementById('moon');
        const sun = document.getElementById('sun');
        const lightmode = localStorage.getItem('lightmode');

        if (lightmode === 'true') {
            body.classList.add('light-mode');
            sun.style.display = 'none';
            moon.style.display = 'block';
        }

        themeSwitch.addEventListener('click', () => {

            if (lightmode !== 'true') {
                body.classList.add('light-mode');
                localStorage.setItem('lightmode', 'true');
                sun.style.display = 'none';
                moon.style.display = 'block';
            } else {
                body.classList.remove('light-mode');
                localStorage.removeItem('lightmode');
                sun.style.display = 'block';
                moon.style.display = 'none';
            }
        });
   setTheme(false);
    }, [theme]);



    return (
        <header id='pc-header' class="slideInLeft">
            <div id="theme-switch" onClick={() => setTheme(true)}>
                <svg id='moon' class='rotate'xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#1E124A"><path d="M582-80q-86.08 0-162.7-32.17-76.63-32.16-134.51-87.27-57.88-55.1-91.34-128.92Q160-402.17 160-485.08q0-83.92 33.5-157.75 33.5-73.84 91.33-129Q342.67-827 419.3-859.17q76.62-32.16 162.7-32.16 49.33 0 93.67 11.33Q720-868.67 760-848.67q-90.33 60.34-145.83 154.5-55.5 94.17-55.5 208.5 0 114.34 55.5 208.84T760-122.67q-40 20-84.33 31.34Q631.33-80 582-80Zm0-66.67h24.61q11.72 0 20.06-1.33-63-71.33-98.84-157.17Q492-391 492-485.33q0-94.34 35.83-180.17 35.84-85.83 98.84-157.83-8.34-1.34-20.06-1.34H582q-146.33 0-250.83 99.14-104.5 99.15-104.5 240.17 0 141.03 104.5 239.86 104.5 98.83 250.83 98.83ZM492-486Z" /></svg>
                <svg id='sun' class='rotateLeft' xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFF55"><path d="M446.67-766.67V-920h66.66v153.33h-66.66ZM706-659.33l-46.33-46.34 108-109.66 46.66 47.66L706-659.33Zm60.67 212.66v-66.66H920v66.66H766.67ZM446.67-40v-153.33h66.66V-40h-66.66ZM253.33-660.67l-108-107 47-46.66L300.67-706l-47.34 45.33ZM768-145.33l-108.33-109L705-299.67l110 106-47 48.34ZM40-446.67v-66.66h153.33v66.66H40Zm153 301.34-47.33-47L253-299.67l24.33 22.34L301.67-254 193-145.33ZM480-240q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-66.67q72 0 122.67-50.66Q653.33-408 653.33-480t-50.66-122.67Q552-653.33 480-653.33t-122.67 50.66Q306.67-552 306.67-480t50.66 122.67Q408-306.67 480-306.67ZM480-480Z" /></svg>
            </div>

            <Flex className="slideInLeft" position='relative' justifySelf='flex-start' h='200px' direction='column' w='90%' textColor='white' marginRight='5%' marginLeft='5%' bg='transparent' >
                <Flex w={['80%', '60%', '90%', '90%']} justify='flex-end' paddingTop={10}>
                    <HStack spacing={5}>

                        {content}


                        <Image src={facebook} boxSize="35px" alt="Facebook" />
                        <Image src={instagram} boxSize="35px" alt="Instagram" borderRadius="full" />
                        <Image src={youtube} boxSize="40px" alt="Youtube" borderRadius="full" />
                    </HStack>
                </Flex>


                <h1 id='header-heading' onClick={() => navigate('/')}> HEAVEN 07</h1>



                <Flex w='100%' h='100%' justify='space-between' direction='row' align='center' bgColor='transparent' paddingTop={5} marginBottom={5}>
                    <Heading paddingLeft={['0', '0', '5', '5']} paddingRight={['0', '0', '5', '5']} size='sm' _hover={{ color: 'blue.300', cursor: 'pointer' }} onClick={() => navigate('/')}>
                        HOME

                    </Heading>

                    <Divider orientation="vertical" height='20px' borderWidth='1px' >

                    </Divider>





                    <Heading paddingLeft={['0', '0', '5', '5']} paddingRight={['0', '0', '5', '5']} size='sm' _hover={{ color: 'blue.300', cursor: 'pointer' }} onClick={() => navigate('/coaches')}>
                        COACHES
                    </Heading>

                    <Divider orientation="vertical" height='20px' borderWidth='1px'>

                    </Divider>




                    <Heading paddingLeft={['0', '0', '5', '5']} paddingRight={['0', '0', '5', '5']} size='sm' _hover={{ color: 'blue.300', cursor: 'pointer' }} onClick={() => navigate('/about-us')}>
                        ABOUT US
                    </Heading>

                    <Divider orientation="vertical" height='20px' borderWidth='1px' >

                    </Divider>

                    <Heading paddingLeft={0} paddingRight={0} size='sm' _hover={{ color: 'blue.300', cursor: 'pointer' }} onClick={() => navigate('/contact')}>
                        CONTACT
                    </Heading>
                </Flex>
            </Flex>
        </header>

    )
}

export default Header