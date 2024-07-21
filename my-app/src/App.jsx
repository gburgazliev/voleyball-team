import { useEffect, useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'


import styles from './App.module.css'
import { auth } from '../firebase/firebase-config'
import { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, UNSAFE_ViewTransitionContext } from 'react-router-dom';
import Home from './views/home/Home'
import { useAuth } from './context/AuthContext'
import Header from './components/header/Header'
import { Flex } from '@chakra-ui/react'
import Footer from './components/footer/Footer'
import AboutUs from './components/aboutUs/AboutUs'
import NavBar from './components/navBar/NavBar'
import { Box, Container } from '@chakra-ui/react'
import AuthPage from './components/authPage/AuthPage'
import Register from './components/register/Register'
import Login from './components/login/Login'
import DetailedAthletePage from './components/detailedAthletePage/DetailedAthletePage'
import ContactUsPage from './components/contactUsPage/ContactUsPage'

function App() {

  return (

    

      <Routes>
        <Route path='/detailed-athlete-view/:id' element={<DetailedAthletePage />} />
        <Route path='/contact' element={<ContactUsPage/>} />
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='*' element={'Not found'} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/login' element={<Login />} />

      </Routes>
    



  )
}

export default App
