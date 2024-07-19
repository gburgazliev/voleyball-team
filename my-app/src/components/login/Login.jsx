import { Box, Container, Flex, Heading, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import React from 'react'
import voleyballBackground from '../../assets/registerBackground.jpg'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Footer from '../footer/Footer'
import MobileHeader from '../mobileHeader/MobileHeader'


const Login = () => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuth();
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
    <Flex w='100%' minH='100vh' display='flex' direction='column' justify='space-between'  align='center' backgroundColor='black'>
      <MobileHeader />
      <Flex w={['100%', '100%', '30%', '30%']} h={['60%', '60%', '40%', '40%']} marginTop='15%' marginBottom='10%' justify='center' align='center'>
        <Flex w={['60%', '60%', '50%', '50%']} h='50%' justify='space-evenly' direction='column'>
          <Input placeholder='Enter email' value={form.email} onChange={updateForm('email')} bg='white' />
          <InputGroup size='lg'>
            <Input
              w='100%'

              type={show ? 'text' : 'password'}
              placeholder='Enter password'
              value={form.password}
              onChange={updateForm('password')}
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
      <Footer/>
    </Flex>
  )
}

export default Login;