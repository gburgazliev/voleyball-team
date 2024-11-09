/**
 * ContactUsPage component for the volleyball site.
 * This component displays a contact form where users can send messages.
 * It includes form validation, captcha verification, and email sending functionality.
 */
import {
  Flex
} from "@chakra-ui/react"
import { useState } from "react";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import './contactUsPage.css';







const ContactUsPage = () => {
  const [captchaVal, setCaptchaVal] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const nameLengthLimit = 20;
  const contentLengthLimit = 2000;
  const form = useRef();
  


  /**
   * Handles the change event of the content input field.
   * Updates the content state if the length of the input value is within the contentLengthLimit.
   * @param {Object} e - The event object.
   */
  const handleContentChange = (e) => {
    if (e.target.value.length <= contentLengthLimit) {
      setContent(e.target.value)
    }
  }

  /**
   * Handles the change event for the name input field.
   * Updates the name state if the entered value is within the length limit.
   * @param {Object} e - The event object.
   */
  const handleNameChange = (e) => {
    if (e.target.value.length <= nameLengthLimit) {
      setName(e.target.value)
    }
  }

  /**
   * Handles the form submission.
   * @param {Event} e - The form submission event.
   * @returns {void}
   */
  const handleFormSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!captchaVal) {
      // toast({

      //   title: 'Captcha is required!',
      //   description: 'Please verify that you are not a robot!',
      //   status: 'error',
      //   duration: 3000,
      //   isClosable: true,
      // });
      setIsLoading(false);
      return;
    } else if (!name || !email || !content) {
      // toast({
      //   className: 'error',
      //   title: 'All fields should be filled!',
      //   description: 'Please fill all fields!',
      //   status: 'error',
      //   duration: 3000,
      //   isClosable: true,
      // });
      setIsLoading(false);
      return;
    } else if (name.length < 3 || name.length > 20) {
      // toast({
      //   className: 'error',
      //   title: 'Name should be between 3 and 20 characters!',
      //   description: 'Please enter a valid name!',
      //   status: 'error',
      //   duration: 3000,
      //   isClosable: true,
      // });
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
      )
      .finally(() => {
        setIsLoading(false);
      });

 

   
    setContent('');

    // toast({
    //   title: 'Message sent!',
    //   description: 'Thank you for contacting us!',
    //   status: 'success',
    //   duration: 3000,
    //   isClosable: true,
    // });
  }


  return (
    <Flex direction='column'  w='100%' minH='100%' justify='space-evenly' align='center' >

{/* 

      {isLoading ?   <Loader />  :  <form className="form" ref={form} onSubmit={handleFormSubmit}>
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
         <button id='send' type="submit" value="Send" > Send</button>

        <ReCAPTCHA


          sitekey="6LcTDg0qAAAAAIBTo6i6tCEgpVdr6ZT9Rn0zDMEI"
          size="normal"
          onChange={setCaptchaVal}
        />

      </form>}
      */}


  
    </Flex>
  )

}
export default ContactUsPage;