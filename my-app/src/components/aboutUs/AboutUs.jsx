import { useEffect } from 'react';
import Footer from '../footer/Footer';
import './aboutUs.css';
import MobileHeader from '../mobileHeader/MobileHeader';
import Header from '../header/Header';
import { isMobileDevice } from '../../utils/utils';


const AboutUs = () => {
    return (
        <div id='about-us-container'>

            <h1 class='slideInFromBottom'>About Us</h1>
            <div id='textarea' class='slideInFromBottom'>


            </div>
            <div class='flex-start-container'>
                <p class='flex-start-p'>About Us - Heaven-07 Volleyball Agency</p>
                <div class="text-flex-start-container slideInLeft">

                    <text id="text1"> Welcome to Heaven-07 Volleyball Agency, where passion meets performance on the court! At Heaven-07, we are dedicated to elevating the game of volleyball by nurturing talent, fostering growth, and creating opportunities for players, coaches, and enthusiasts worldwide.</text>
                </div>
            </div>


            <div class='flex-end-container'> <p class='flex-end-p'>Our Mission</p>
                <div class="text-flex-end-container slideInRight">

                    <text id="text2">Our mission is simple: to be the premier agency for volleyball professionals and enthusiasts, providing unparalleled support, guidance, and opportunities. We believe in the power of volleyball to inspire, unite, and transform lives, and we are committed to helping our clients reach their full potential both on and off the court.</text>
                </div>
            </div>



            <div class="flex-start-container">
                <p class='flex-start-p'>Who We Are</p>
                <div class="text-flex-start-container slideInLeft">
                    <text id="text3">Heaven-07 was founded by a team of former professional volleyball players, coaches, and industry experts who share a deep love for the game. Our diverse backgrounds and extensive experience in the world of volleyball give us a unique perspective and the ability to provide comprehensive support to our clients.
                    </text>
                </div>

            </div>

            <div class="flex-end-container">
                <p class='flex-end-p'>What We Do</p>
                <div class="text-flex-end-container slideInRight">
                    <text id="text4">*Talent Management:* We represent a wide range of volleyball athletes, from emerging stars to established professionals. Our dedicated team works tirelessly to secure the best contracts, endorsements, and career opportunities for our players.

                        *Coaching and Development:* We offer personalized coaching and development programs designed to enhance skills, improve performance, and promote holistic growth. Our experienced coaches use the latest techniques and technologies to help athletes at all levels reach new heights.

                        *Event Management:* Heaven-07 organizes and manages top-tier volleyball events, including tournaments, training camps, and clinics. Our events are designed to provide competitive experiences, foster community, and promote the sport of volleyball.

                        *Consulting Services:* We provide expert consulting services to clubs, teams, and organizations looking to improve their operations, enhance their programs, and achieve their goals. Our insights and strategies are tailored to meet the unique needs of each client.</text>
                </div>
            </div>

            <div class="flex-start-container">
                <p class='flex-start-p'>Why Choose Heaven-07?</p>
                <div class="text-flex-start-container slideInLeft">
                <text id="text5">*Expertise and Experience:* Our team brings decades of experience in professional volleyball, offering unmatched knowledge and insights to our clients.

                    *Personalized Approach:* We understand that every athlete and organization is unique. We take the time to understand your goals and tailor our services to meet your specific needs.

                    *Passion for Volleyball:* At Heaven-07, volleyball isn't just a business—it's a passion. We are dedicated to the growth and success of the sport and everyone involved in it.

                    *Global Reach:* With a network that spans the globe, we provide our clients with access to international opportunities and connections within the volleyball community.</text>
            </div>

            </div>
             <div class="flex-end-container">
                <p class='flex-end-p'>Join Us</p>
               <div class="text-flex-end-container slideInRight">
                <text id="text6">Whether you are an athlete looking to take your career to the next level, a coach seeking innovative training methods, or an organization aiming to enhance your volleyball programs, Heaven-07 is here to help you succeed. Join us in our mission to elevate the game of volleyball and create a brighter future for the sport we love.

                    Contact us today to learn more about how we can support you on your volleyball journey. Welcome to Heaven-07, where the sky is the limit!

                    ---

                    For inquiries and more information, please reach out to us at [contact information].

                    Follow us on social media [links to social media profiles].

                    ---

                    Thank you for choosing Heaven-07 Volleyball Agency. Together, we will reach new heights!</text>
            </div>
 
             </div>
            
        </div>


    )
}

export default AboutUs;