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


const MobileHeader = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();






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
                    <DrawerBody >
                        <Text onClick={() => { navigate('/'); onClose() }} _hover={{ color: 'orange', cursor: 'pointer' }}>Home</Text>
                        <Text>Coaches</Text>
                        <Text>About us</Text>
                        <Text>Contact us</Text>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )


}

export default MobileHeader;