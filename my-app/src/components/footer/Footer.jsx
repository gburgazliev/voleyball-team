/**
 * Footer component for the website.
 * Displays information about SB Community sports agency and staff contacts.
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 */
import { Divider } from "@chakra-ui/react";
import location from "../../assets/location.png";
import phone from "../../assets/phone.png";
import letter from "../../assets/letter.png";
import './footer.css';


const Footer = () => {
    return (
        <footer className="mobile-footer">
                <h6 className="heading">
                Heaven-07 was founded by a team of former professional volleyball activists , coaches, and industry experts who share a deep love for the game. Our diverse backgrounds and extensive experience in the world of volleyball give us a unique perspective and the ability to provide comprehensive support to our clients. Whether you are an athlete looking to take your career to the next level, a coach seeking innovative training methods, or an organization aiming to enhance your volleyball programs, Heaven-07 is here to help you succeed. Join us in our mission to elevate the game of volleyball and create a brighter future for the sport we love. Contact us today to learn more about how we can support you on your volleyball journey. Welcome to Heaven-07, where the sky is the limit!
                </h6>
                <div className="divider">
                    <Divider />
                </div>
                <div id='staff-info'>
                    <div>
                        <div className="staff-couple">
                        <div className="person-info"> <h1 className="heading">Vicho Kolev</h1>
                            <div className="couples">
                                <img src={phone} alt="phone" />
                                <p> +359 88 6676470</p>
                            </div>
                            <div className="couples">
                                <img src={location} alt="location" />
                                <p>Owner - Sofia, Bulgaria</p>
                            </div>
                            <div className="couples">
                                <img src={letter} alt="letter" />
                                <p>heaven07@abv.bg</p>
                            </div>
                        </div>
                      
                    </div> 
                    </div>
                       
                   
                    

                 
                   </div>
                 </footer>
    );
}

export default Footer;