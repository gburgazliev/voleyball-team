/**
 * MobileHeader component for the volleyball site.
 * @component
 * @example
 * return (
 *   <MobileHeader />
 * )
 */
import {
    Heading, Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box,
    Text, Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor, Image, Flex
} from "@chakra-ui/react";
import { Button, Radio, RadioGroup, Stack, useDisclosure, usePopover } from "@chakra-ui/react"
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../../firebase/firebase-config"
import { useAuth } from "../../context/AuthContext";
import { color } from "framer-motion";
import { useLocation } from 'react-router-dom';
import instagram from '../../assets/instagram.png';
import facebook from '../../assets/facebook.png';
import youtube from '../../assets/youtube.png';
import { getUserById } from "../../utils/utils";
import './mobileHeader.css'





const MobileHeader = () => {

    const [userData, setUser] = useState(null);
    const navigate = useNavigate();
    const {user, logout } = useAuth();
    const location = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isPopoverOpen, onPopoverOpen, onPopoverClose } = usePopover();


    useEffect(() => {
        if (user) {
            getUserById(user.uid, setUser)
        }
    }, [user]);


    return (
       <header id="mobile-header">
         <Heading color='white' className="slideFromTop"  fontFamily='Lobster, cursive'>Heaven 07</Heading>

         <div id="mobile-header-social-media-container">
           <a href="https://www.instagram.com" target="_blank">
                <Image src={instagram} boxSize='30px'></Image>
           </a>
              <a href="https://www.facebook.com" target="_blank">
                <Image src={facebook} boxSize='30px'></Image>
                </a>
                <a href="https://www.youtube.com" target="_blank">
                <Image src={youtube} boxSize='30px'></Image>
                </a>

         </div>
            <Button className="fadeIn" colorScheme='blue' onClick={onOpen}>
                MENU
            </Button>
            <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent  bg='gray.800'>
                    <DrawerHeader borderBottomWidth='1px' color='white'>Menu</DrawerHeader>
                    <DrawerCloseButton color='white' _hover={{ color: 'blue.200', cursor: 'pointer' }}/>
                    <DrawerBody bg='gray.900' >
                        <Stack>
                            <Button bg={location.pathname === '/' ? 'blue.200' : 'gray.400'} _hover={{ color: 'blue.200', cursor: 'pointer' }} onClick={() => { navigate('/'); onClose() }}>Home</Button>
                            <Button bg={location.pathname === '/coaches' ? 'blue.200' : 'gray.400'} _hover={{ color: 'blue.200', cursor: 'pointer' }}  onClick={() => {navigate('/coaches'); onClose()}}>Coaches</Button>
                            <Button bg={location.pathname === '/about-us' ? 'blue.200' : 'gray.400'} _hover={{ color: 'blue.200', cursor: 'pointer' }} onClick={() => { navigate('/about-us'); onClose() }}>About us</Button>
                            <Button bg={location.pathname === '/contact' ? 'blue.200' : 'gray.400'} _hover={{ color: 'blue.200', cursor: 'pointer' }} onClick={() => { navigate('/contact'); onClose() }} >Contact us</Button>
                            <Popover  >
                            {({ isOpen }) => (
                                <>
                
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />

                                    <PopoverBody bg='gray.400' > <Flex justify='space-evenly'> 
                                        <a class='mobile-header-image' href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                            <image class='mobile-header-image' src={instagram} ></image>
                                        </a>
                                        <image class='mobile-header-image'src={youtube} ></image>  </Flex>
                                    </PopoverBody>
                                </PopoverContent> </>
                                 )}
                            </Popover>
                        </Stack>

                    </DrawerBody>
                    <DrawerFooter borderTopWidth='1px' color='white' >
                        {user ? <div id="mobile-header-log-in-info">
                            <p>Welcome, {userData?.username}!</p>
                           <Button _hover={{ color: 'blue.200', cursor: 'pointer' }} onClick={() => { navigate('/'); logout(); onClose() }} bg='gray.400'>Sign Out</Button> </div>: <> <Button _hover={{ color: 'blue.200', cursor: 'pointer' }}bg={location.pathname === '/auth/login' ? 'orange' : 'gray.400'} m={2} onClick={() => navigate('/auth/login')}>Sign In</Button> 
                            <Button _hover={{ color: 'blue.200', cursor: 'pointer' }} bg={location.pathname === '/auth/register' ? 'orange' : 'gray.400'} onClick={() => navigate('/auth/register')}>Sign Up</Button></>}

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
       </header>
           
       
    )


}

export default MobileHeader;