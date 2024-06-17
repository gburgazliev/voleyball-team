import { useEffect, useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import styles from './App.module.css'
import { auth } from '../firebase/firebase-config'
import { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, UNSAFE_ViewTransitionContext } from 'react-router-dom';
import Home from './views/Home'
import { useAuth } from './context/AuthContext'
import Header from './components/header/Header'
import { Flex } from '@chakra-ui/react'
import Footer from './components/footer/Footer'

import NavBar from './components/navBar/NavBar'
import { Box, Container } from '@chakra-ui/react'

function App() {

  const { user, loading, error, register, login, logout } = useAuth();
  const { appContainer, container } = styles

  const navData = [
    { title: 'Home', router: '/' },
  ]


  return (

    <Box w='100%' minH='100vh'>   
    <Flex  w="100%" h='8%' justify='center' align='center' bg='black'>
      <Header />  
      </Flex> 
    

    
     <Box w='100%' h='100vh'>


      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='*' element={'Not found'} />
      </Routes>
    </Box>
    <Flex h='60%' w='100%'>
      <Footer />
    </Flex>
    
    </Box>














  )
}

export default App
