import {
  Flex
} from "@chakra-ui/react"
import { auth } from "../../../firebase/firebase-config"
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { onAuthStateChanged } from "firebase/auth";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import './contactUsPage.css';
import Header from "../header/Header";
import { isMobileDevice } from "../../utils/utils";
import MobileHeader from "../mobileHeader/MobileHeader";
import { useToast } from '@chakra-ui/react'
import Footer from "../footer/Footer";



const ContactUsPage = () => {
  const [captchaVal, setCaptchaVal] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const nameLengthLimit = 20;
  const contentLengthLimit = 2000;
  const form = useRef();
  const toast = useToast();


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
      toast({

        title: 'Captcha is required!',
        description: 'Please verify that you are not a robot!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    } else if (!name || !email || !content) {
      toast({
        className: 'error',
        title: 'All fields should be filled!',
        description: 'Please fill all fields!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    } else if (name.length < 3 || name.length > 20) {
      toast({
        className: 'error',
        title: 'Name should be between 3 and 20 characters!',
        description: 'Please enter a valid name!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
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
    <Flex direction='column' w='100%' minH='100%' justify='space-evenly' align='center' bgColor='black'>

      {!isMobileDevice() ? <Header /> : <MobileHeader />}



      <form className="form" ref={form} onSubmit={handleFormSubmit}>
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

        <textarea id="content" name="message" value={content} onChange={handleContentChange} />
        <br />
        <label > {content.length} / {contentLengthLimit}</label>
        {!isLoading ? <button id='send' type="submit" value="Send" > Send</button> : <text id='send' type="submit" value="Send" disabled>Sending...</text>}
        
      <ReCAPTCHA
       

        sitekey="6LcTDg0qAAAAAIBTo6i6tCEgpVdr6ZT9Rn0zDMEI"
        size="normal"
        onChange={setCaptchaVal}
      />

      </form>
  

      <Footer />
    </Flex>
  )

}
export default ContactUsPage;