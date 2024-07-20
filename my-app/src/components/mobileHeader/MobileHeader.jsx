import {
    Heading, Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box,
    Text
} from "@chakra-ui/react";
import { Button, Radio, RadioGroup, Stack, useDisclosure } from "@chakra-ui/react"
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../../firebase/firebase-config"
import { useAuth } from "../../context/AuthContext";
import { color } from "framer-motion";
import { useLocation } from 'react-router-dom';




const MobileHeader = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const location = useLocation();


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
                              <Button bg={location.pathname === '/' ? 'orange' : 'gray.100'}  _hover={{ color: 'orange', cursor: 'pointer' }} _active={{ backgroundColor: 'orange', color: 'white' }} onClick={() => { navigate('/') }}>Home</Button>
                        <Button  _hover={{ color: 'orange', cursor: 'pointer' }} _active={{ backgroundColor: 'orange', color: 'white' }}>Coaches</Button>
                        <Button bg={location.pathname === '/about-us' ? 'orange' : 'gray.100'}  _hover={{ color: 'orange', cursor: 'pointer' }}_active={{ backgroundColor: 'orange', color: 'white' }} onClick={() => { navigate('/about-us') }}>About us</Button>
                        <Button  bg={location.pathname === '/contact' ? 'orange' : 'gray.100'}_hover={{ color: 'orange', cursor: 'pointer' }} _active={{ backgroundColor: 'orange', color: 'white' }} onClick={() => { navigate('/contact')}} >Contact us</Button>
                        <Button>Media</Button>
                        </Stack>
                      
                    </DrawerBody>
                    <DrawerFooter >
                        {user ? <Button onClick={() => { navigate('/'); logout(); onClose()}}>Sign Out</Button> : <> <Button m={2} onClick={() => navigate('/auth/login')}>Sign In</Button>
                            <Button onClick={() => navigate('/auth/register')}>Sign Up</Button></>}

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )


}

export default MobileHeader;