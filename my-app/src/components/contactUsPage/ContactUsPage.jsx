import {
  Flex, Box, Input, Textarea, Button, FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText, Alert, AlertIcon
} from "@chakra-ui/react"
import { auth } from "../../../firebase/firebase-config"
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { onAuthStateChanged } from "firebase/auth";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import axios from "axios";
import './contactUsPage.css';
import Header from "../header/Header";
import { isMobileDevice } from "../../utils/utils";
import MobileHeader from "../mobileHeader/MobileHeader";



const ContactUsPage = () => {
  const [user, setUser] = useState(null);
  const [captchaVal, setCaptchaVal] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [formError, setFormError] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nameLengthLimit = 20;
  const contentLengthLimit = 2000;
  const form = useRef();




  useEffect(() => {

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

  }, [])

  const handleContentChange = (e) => {
    if (e.target.value.length <= contentLengthLimit) {
      setContent(e.target.value)
    }
  }

  const handleNameChange = (e) => {
    if (e.target.value.length <= nameLengthLimit) {
      setName(e.target.value)
    }
  }
   
  const handleFormSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!captchaVal) {
      setCaptchaError(true);
      setTimeout(() => {
        setCaptchaError(false);
      }, 3000);
       setIsLoading(false);
      return;
    } else if (!name || !email || !content) {
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 3000);
      setIsLoading(false);
      return;
    } else if ( name.length < 3 || name.length > 20) {
      setIsValidName(true);
      setTimeout(() => {
        setIsValidName(false);
      }, 3000);
       setIsLoading(false);
      return;
    }

    emailjs
      .sendForm('service_b0qofo6', 'template_1ea313o', form.current, {
        publicKey: 'wGK_-wloZsCW6uwYk',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
   setIsLoading(false);
}

  
  return (
    <Flex direction='column' w='100%' h='100%' justify='space-evenly' align='center'>
     
            {!isMobileDevice() ?  <Header /> : <MobileHeader/>}
     
 
  
       <form className="form" ref={form}  onSubmit={handleFormSubmit}>
        <div className="nameContainer">
           <label id='nameLabel'>Name *</label>
         <label id='nameLabelCounter'>{name.length} / {nameLengthLimit}</label>
        </div>
        
        <input id="username" type="text" name="user_name" value={name} onChange={handleNameChange} />
  
       
         <div className="emailContainer">
            <label>Email *</label>
         </div>
        <input id='email' type="email" name="user_email" value={email} onChange={((e) => setEmail(e.target.value))} />
        <div className="contentContainer">
           <label>Message *  </label>
        </div>
       
        <textarea id="content"  name="message" value={content} onChange={handleContentChange} />
        <br />
        <label > {content.length} / {contentLengthLimit}</label>
       { !isLoading ? <button id='send' type="submit" value="Send" > Send</button> : <text id='send' type="submit" value="Send" disabled>Sending...</text>}
      </form>
      {captchaError && ( <div className="error"> 
           <Alert status='error' variant='solid' w={['50%', '50%', '15%' ,'15%']} h='100%' alignSelf={['center', 'center', 'flex-end' ,'flex-end']} >
          <AlertIcon />
          Captcha is required!
        </Alert>
      </div>
     
      )}
      {formError && ( <div className="error">
        <Alert status='error' variant='solid' w={['50%', '50%', '15%' ,'15%']} h='100%' alignSelf={['center', 'center', 'flex-end' ,'flex-end']} >
          <AlertIcon />
          All fields should be filled!
        </Alert> </div>
      )}


      <ReCAPTCHA
        alignSelf='flex-start'

        sitekey="6LcTDg0qAAAAAIBTo6i6tCEgpVdr6ZT9Rn0zDMEI"
        size="normal"
        onChange={setCaptchaVal}
      />


     
    </Flex>
  )
      
}
export default ContactUsPage;