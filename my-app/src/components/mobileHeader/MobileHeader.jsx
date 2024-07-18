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




const MobileHeader = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { logout } = useAuth();


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
                        <Text onClick={() => { navigate('/'); onClose() }} _hover={{ color: 'orange', cursor: 'pointer' }}>Home</Text>
                        <Text>Coaches</Text>
                        <Text onClick={() => { navigate('/about-us'); onClose() }}>About us</Text>
                        <Text onClick={() => { navigate('/contact'); onClose() }} _hover={{ color: 'orange', cursor: 'pointer' }}>Contact us</Text>
                        <Text>Media</Text>
                    </DrawerBody>
                    <DrawerFooter >
                        {user ? <Button onClick={() => { navigate('/'); logout(); onClose() }}>Sign Out</Button> : <> <Button m={2} onClick={() => navigate('/auth/login')}>Sign In</Button>
                            <Button onClick={() => navigate('/auth/register')}>Sign Up</Button></>}

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )


}

export default MobileHeader;