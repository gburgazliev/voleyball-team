import { Box, Flex, Heading, Button, Input, useToast } from "@chakra-ui/react";
import registerBackground from '../../assets/registerBackground.jpg'
import { useState, useEffect } from "react";
import { reauthenticateWithPopup } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { database } from "../../../firebase/firebase-config";
import { update, ref, set, get } from 'firebase/database'


const Register = () => {
    const toast = useToast()
    const { register , user, login} = useAuth();
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
    })

    const updateForm = prop => e => {
        setForm({
            ...form,
            [prop]: e.target.value,
        });
    };


    const isValidPassword = password => {
        if (password.length < 8) {
            toast({
                title: 'Invalid Password.',
                description: "Password can't be less then 8 symbols.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return false;
        }
        return true;
    };

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

   const isValidUsername =( username) => {
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
        <Flex w='100%' h='100%' bgColor='black' zIndex={10} justify='center' align='center' backgroundImage={registerBackground} backgroundSize='cover'>
            <Flex w='30%' h='50%' justify='center' align='center' direction='column'>
                <Flex w='50%' h='60%' direction='column' justify='space-evenly'>
                    <Input placeholder="Email" value={form.email} onChange={updateForm('email')} bg='white' />
                    <Input placeholder="Username" bg='white' value={form.username} onChange={updateForm('username')} />
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