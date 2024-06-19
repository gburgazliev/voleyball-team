import { Box, Container, Flex, Heading, Input, InputGroup, InputRightElement, Button} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import React from 'react'
import voleyballBackground from '../../assets/registerBackground.jpg'
import { update } from 'firebase/database'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const navigate = useNavigate();
    const toast = useToast();
    const { login } = useAuth();
    const [loggedIn , setLoggedIn] = React.useState(false)
    const [form, setForm] = React.useState({
        email: '',
        password: '',
    })

    const updateForm = prop => e => {
        setForm({
            ...form,
            [prop]: e.target.value,
        });
    };


    const handleLogin = async () => {
        try {
           await login(form.email, form.password);

         
          
                navigate('/');
             
        } catch (error) {
            toast({
                title: 'Invalid email or password.',
                description: 'Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            console.error(error);
        }
    }
  
    return (
        <Flex w='100%' h='100%' justify='center'  backgroundImage={voleyballBackground} align='center' backgroundSize='cover'>
          <Flex w='30%' h='40%'  justify='center' align='center'>
             <Flex w='50%' h='50%' justify='space-evenly' direction='column'>
             <Input placeholder='Enter email' value={form.email}  onChange={ updateForm('email') }   bg='white' />
             <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        value={form.password}
        onChange={updateForm('password') }
        bg='white'
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
                <Button marginTop={10} onClick={handleLogin}>
                    Login
                </Button>
             </Flex>
          </Flex>
        </Flex>
    )
}

export default Login;