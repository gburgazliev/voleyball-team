import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import MobileHeader from './components/mobileHeader/MobileHeader'
import { isMobileDevice } from './utils/utils'
import React from 'react'
import Loader from './components/loader/Loader'
const LazyHome = React.lazy(() => import('./views/home/Home'))
const LazyAboutUs = React.lazy(() => import('./components/aboutUs/AboutUs'))
const LazyRegister = React.lazy(() => import('./components/register/Register'))
const LazyLogin = React.lazy(() => import('./components/login/Login'))
const LazyDetailedAthletePage = React.lazy(() => import('./components/detailedAthletePage/DetailedAthletePage'))
const LazyCoachesPage = React.lazy(() => import('./components/coachesPage/CoachesPage'))
const LazyDetailedCoach = React.lazy(() => import('./components/detailedCoach/DetailedCoach'))
const LazyContactUsPage = React.lazy(() => import('./components/contactUsPage/ContactUsPage'))


function App() {


  return (

    <div class='app'>
      {!isMobileDevice() ? <Header /> : <MobileHeader />}
      <div class="main">

        <Routes>
          <Route path='/detailed-athlete-view/:id' element={< React.Suspense fallback={<Loader />} >
            <LazyDetailedAthletePage />
          </React.Suspense>
          } />
          <Route path='/coaches' element={< React.Suspense fallback={<Loader />} >
            <LazyCoachesPage />
          </React.Suspense>} />
          <Route path='/contact' element={< React.Suspense fallback={<Loader />} >
            <LazyContactUsPage />
          </React.Suspense>} />

          <Route path='/about-us' element={< React.Suspense fallback={<Loader />} >
            <LazyAboutUs />
          </React.Suspense>} />

          <Route path='/auth/register' element={< React.Suspense fallback={<Loader />} >
            <LazyRegister />
          </React.Suspense>} />
          <Route path='/auth/login' element={< React.Suspense fallback={<Loader />} >
            <LazyLogin />
          </React.Suspense>} />
          <Route path='/detailed-coach/:id' element={< React.Suspense fallback={<Loader />} >
            <LazyDetailedCoach />
          </React.Suspense>} />
          <Route path='/' element={< React.Suspense fallback={<Loader />} >
            <LazyHome />
          </React.Suspense>} /> <Route path='*' element={'Not found'} />
        </Routes>





      </div>

      <Footer />

    </div>






  )
}

export default App
