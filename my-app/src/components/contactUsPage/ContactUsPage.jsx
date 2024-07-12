import { Flex, Box, Input, Textarea, Button, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, } from "@chakra-ui/react"
import { auth } from "../../../firebase/firebase-config"
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import axios from "axios";
import './contactUsPage.css';




const ContactUsPage = () => {
    const [user, setUser] = useState(null);
    const {captchaVal ,setCaptchaVal} = useState(null);
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
     const form = useRef();

   

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
           <form className="form" ref={form} disabled={!captchaVal} onSubmit={handleFormSubmit}>
      <label>Name</label>
      <input id="username" type="text" name="user_name" />
      <label>Email</label>
      <input id='email' type="email" name="user_email" />
      <label>Message</label>
      <textarea id="content" name="message" />
      <button id='send' type="submit" value="Send" > Send</button>
    </form>
            <ReCAPTCHA
           alignSelf='flex-start'
           
            sitekey="6LcTDg0qAAAAAIBTo6i6tCEgpVdr6ZT9Rn0zDMEI"
            size="normal"
            onChange={(token) => { setCaptchaVal(token)}}
        />
            
        </Flex>
    )
}

export default ContactUsPage;