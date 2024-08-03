import { useEffect, useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'


import './App.css'
import { auth } from '../firebase/firebase-config'
import { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, UNSAFE_ViewTransitionContext } from 'react-router-dom';
import Home from './views/home/Home'
import { useAuth } from './context/AuthContext'
import Header from './components/header/Header'
import { Flex } from '@chakra-ui/react'
import Footer from './components/footer/Footer'
import AboutUs from './components/aboutUs/AboutUs'

import { Box, Container } from '@chakra-ui/react'
import AuthPage from './components/authPage/AuthPage'
import Register from './components/register/Register'
import Login from './components/login/Login'
import DetailedAthletePage from './components/detailedAthletePage/DetailedAthletePage'
import ContactUsPage from './components/contactUsPage/ContactUsPage'
import Loader from './components/loader/Loader'
import CoachesPage from './components/coachesPage/CoachesPage'
import DetailedCoach from './components/detailedCoach/DetailedCoach'

import MobileHeader from './components/mobileHeader/MobileHeader'
import { isMobileDevice } from './utils/utils'

function App() {


  return (

    <div class='app'>
       {!isMobileDevice() ? <Header /> : <MobileHeader />}
      <div class="main">
        <Routes>
        <Route path='/detailed-athlete-view/:id' element={<DetailedAthletePage />} />
        <Route path='/coaches' element={<CoachesPage />} />
        <Route path='/contact' element={<ContactUsPage/>} />
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='*' element={'Not found'} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/detailed-coach/:id' element={<DetailedCoach />} />

      </Routes>
      </div>

      <Footer />

    </div>

      
    



  )
}

export default App
