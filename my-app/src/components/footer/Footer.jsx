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
import { Box, Container, Flex, Textarea, Text, Heading, Image, Spacer, HStack, Divider } from "@chakra-ui/react";
import location from "../../assets/location.png";
import phone from "../../assets/phone.png";
import letter from "../../assets/letter.png";
import './footer.css';


const Footer = () => {
    return (
        <div className="mobile-footer">
                <h6 className="heading">
                    SB Community is a full service sports agency, representing players and team staff.
                    As a full service sports agency, we offer our clients an array of services including contractual,
                    financial and personal consulting, thus enabling them to more fully focus on their craft.
                    We have connections with teams and players in every market around the world.
                    With a strong world-wide presence our unique business model has opened doors in every
                    major market for volleyball & awarded our clients lucrative playing contracts.
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
                 </div>
    );
}

export default Footer;