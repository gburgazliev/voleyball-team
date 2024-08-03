/**
 * Represents the Register component.
 * This component is responsible for handling user registration.
 * @returns {JSX.Element} The Register component.
 */
import { Box, Flex, Heading, Button, Input, useToast } from "@chakra-ui/react";
import registerBackground from '../../assets/registerBackground.jpg'
import { useState, useEffect } from "react";
import { reauthenticateWithPopup } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { database } from "../../../firebase/firebase-config";
import { update, ref, set, get } from 'firebase/database'
import MobileHeader from "../mobileHeader/MobileHeader";
import Footer from "../footer/Footer";


const Register = () => {
    const toast = useToast()
    const { register, user, login } = useAuth();
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
    })

    /**
     * Updates the form state with the provided property value.
     * @param {string} prop - The property to update in the form state.
     * @returns {Function} - The event handler function.
     */
    const updateForm = prop => e => {
        setForm({
            ...form,
            [prop]: e.target.value,
        });
    };


    /**
     * Checks if a password is valid.
     * @param {string} password - The password to be checked.
     * @returns {boolean} - Returns true if the password is valid, false otherwise.
     */
    const isValidPassword = password => {
        if (password.length < 8) {
            toast({
                title: 'Invalid Password.',
                description: "Password can't be less than 8 symbols.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return false;
        }
        return true;
    };

    /**
     * Checks if the given email is valid.
     * 
     * @param {string} email - The email to be validated.
     * @returns {boolean} - Returns true if the email is valid, false otherwise.
     */
    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            toast({
                title: 'Invalid email.',
                description: "This email doesn't exist.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return false;
        }
        return true;
    };

    /**
     * Checks if a username is valid.
     * @param {string} username - The username to be validated.
     * @returns {boolean} - Returns true if the username is valid, false otherwise.
     */
    const isValidUsername = (username) => {
        if (username && username.length < 3 || username.length > 20) {
            toast({
                title: 'Invalid username.',
                description: "Username must be between 3 and 20 symbols.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        }
        return true;
    };

    /**
     * Checks if a username is unique among a list of users.
     * @param {Object} users - The list of users.
     * @param {string} username - The username to check.
     * @returns {boolean} - Returns true if the username is unique, false otherwise.
     */
    const isUniqueUsername = (users, username) => {

        if (users) {
            const usernames = Object.keys(users);
            if (usernames.includes(username)) {
                toast({
                    title: 'Invalid username.',
                    description: "This username is already taken.",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return false;
            }
        }
        return true;
    };

    /**
     * Handles the registration process.
     * @returns {Promise<void>} A promise that resolves when the registration process is completed.
     */
    const handleRegister = async () => {
        try {
            const usersRef = ref(database, `users`);
            const usersSnapshot = await get(usersRef);
            const users = usersSnapshot.val();

            if (isValidEmail(form.email) && isValidPassword(form.password) && isUniqueUsername(users, form.username) && isValidUsername(form.username)) {

                const credentials = await register(form.email, form.password);
                const user = {
                    email: form.email,
                    username: form.username,
                    uid: credentials.user.uid,
                }

                console.log('Database reference:', usersRef);

                try {
                    await update(usersRef, { [form?.username]: user });
                    console.log('Database updated successfully');
                } catch (error) {
                    console.error('Failed to update database:', error);
                }

                toast({
                    title: 'Success.',
                    description: "You have successfully registered.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                await login(form.email, form.password);
                setTimeout(() => {
                    window.location.href = '/';
                }, 3000);

                setForm({
                    email: '',
                    username: '',
                    password: '',
                });

            }
        } catch (error) {
            toast({
                title: 'Error.',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }



    };
    return (
        <Flex w='100%' minH='100vh' bgColor='#1a202c'  display='flex' direction='column' justify='center' align='center'backgroundColor='#1a202c'>
          
            <Flex w={['100%', '100%', '30%', '30%']} h={['60%', '60%', '40%', '40%']}  marginBottom='10%' justify='center' align='center' direction='column'>
                <Flex w={['70%', '70%', '50%', '50%']} h='60%' direction='column' justify='space-evenly' >
                    <Input placeholder="Email" value={form.email} marginBottom={5} onChange={updateForm('email')} bg='white' />
                    <Input placeholder="Username" bg='white' marginBottom={5} value={form.username} onChange={updateForm('username')} />
                    <Input placeholder="Password" bg='white ' value={form.password} onChange={updateForm('password')} />
                </Flex>
                <Button marginTop={10} onClick={handleRegister}>
                    Register
                </Button>
            </Flex>
           
        </Flex>
    )
}

export default Register;