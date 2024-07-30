import Header from "../header/Header";
import MobileHeader from "../mobileHeader/MobileHeader";
import { isMobileDevice } from "../../utils/utils";
import Footer from "../footer/Footer";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import './coachesPage.css';

const CoachesPage = () => {
    const { user } = useAuth();
    
    useEffect(() => {
        console.log(user);
    }, [user]);
   

   
    
    return (
        <div class="coaches-page-container">
            <div id='header'>
                {  !isMobileDevice() ?
                <Header />
                : <MobileHeader />}
            </div>
           
            <div id='coaches-container'>
             <h1>asdadadadadad</h1>
             <h1>asdadsadadsadsad</h1>
                <h1>asdadadadadad</h1>
                <h1>asdadadadadad</h1>
             <h1>asdadsadadsadsad</h1>
                <h1>asdadadadadad</h1>
               
            </div>
        <button id='add-coach-button'>Add coach</button>
           <div id='footer'> 
            <Footer />
            </div>
        </div>
    );
}

export default CoachesPage;