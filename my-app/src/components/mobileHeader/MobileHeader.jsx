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





const MobileHeader = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const location = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isPopoverOpen, onPopoverOpen, onPopoverClose } = usePopover();


    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;

    }, []);


    return (
        <>
            <Heading color='orange'>SB COMMUNITY</Heading>
            <Button colorScheme='blue' onClick={onOpen}>
                MENU
            </Button>
            <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Menu</DrawerHeader>
                    <DrawerCloseButton />
                    <DrawerBody >
                        <Stack>
                            <Button bg={location.pathname === '/' ? 'orange' : 'gray.100'} _hover={{ color: 'orange', cursor: 'pointer' }} onClick={() => { navigate('/') }}>Home</Button>
                            <Button _hover={{ color: 'orange', cursor: 'pointer' }}>Coaches</Button>
                            <Button bg={location.pathname === '/about-us' ? 'orange' : 'gray.100'} _hover={{ color: 'orange', cursor: 'pointer' }} onClick={() => { navigate('/about-us') }}>About us</Button>
                            <Button bg={location.pathname === '/contact' ? 'orange' : 'gray.100'} _hover={{ color: 'orange', cursor: 'pointer' }} onClick={() => { navigate('/contact') }} >Contact us</Button>
                            <Popover  >
                                <PopoverTrigger>
                                    <Button >Media</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />

                                    <PopoverBody > <Flex justify='space-evenly'> <Image src={facebook} boxSize='50px'></Image>
                                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                            <Image src={instagram} boxSize='50px'></Image>
                                        </a>
                                        <Image src={youtube} boxSize='50px'></Image>  </Flex>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </Stack>

                    </DrawerBody>
                    <DrawerFooter >
                        {user ? <Button onClick={() => { navigate('/'); logout(); onClose() }}>Sign Out</Button> : <> <Button bg={location.pathname === '/auth/login' ? 'orange' : 'gray.100'} m={2} onClick={() => navigate('/auth/login')}>Sign In</Button>
                            <Button bg={location.pathname === '/auth/register' ? 'orange' : 'gray.100'} onClick={() => navigate('/auth/register')}>Sign Up</Button></>}

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )


}

export default MobileHeader;