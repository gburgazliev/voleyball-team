import { Flex, Box, Input, Textarea, Button } from "@chakra-ui/react"
import { auth } from "../../../firebase/firebase-config"
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import axios from "axios";




const ContactUsPage = () => {
    const [user, setUser] = useState(null);
    const {captchaVal ,setCaptchaVal} = useState(null);
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


 

    useEffect(() => {

        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

    }, [])


    const handleFormSubmit = async () => {

     console.log(email, title, content, captchaVal);    

    }
    return (
        <Flex direction='column' w='100%' h='100%' justify='space-evenly' align='center'>
            {!user && <Input w='50%' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />}
            <Input w='50%' placeholder="Title" />
            <Textarea w='60%' h='50%' placeholder="Content" />
            <ReCAPTCHA
           alignSelf='flex-start'
           
            sitekey="6LcTDg0qAAAAAIBTo6i6tCEgpVdr6ZT9Rn0zDMEI"
            size="normal"
            onChange={(token) => { setCaptchaVal(token)}}
        />
            <Button disabled={!captchaVal} onClick={handleFormSubmit}>Submit</Button>
        </Flex>
    )
}

export default ContactUsPage;