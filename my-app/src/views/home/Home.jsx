/**
 * Renders the home page of the volleyball team website.
 * @returns {JSX.Element} The rendered home page component.
 */
import {
    Flex
} from "@chakra-ui/react"
import logo from '../../assets/logo.jpg'
import banner2 from '../../assets/banner2.jpg'
import HomePageAthletes from "../../components/homePageAthletes/HomePageAthletes"
import './home.css'

const Home = () => {
 


 
    return (
    


        <Flex direction='column' justify='center'  align='center' w={['100%', '100%', '100%', '100%']} >
            
        
            
                <img id='banner' src={banner2}  alt='Volleyball Team' />

            

            <Flex justify='center' padding={2} gap='5%' align='center' w={['100%', '100%', '100%', '100%']}>
                <img id='logo' src={logo}  alt='Volleyball Team' />
                
                
                      <ul  
                    >
                        <li>Team searching</li>
                        <li>Contract Negotiations</li>
                        <li>Judicial Assistance</li>
                        <li>Medical Follow-up</li>
                        <li>Physical Conditioning</li>
                        <li>Education, individual trainings, sports management, volleyball</li>
                    </ul>
                
                  

             

            </Flex>

            <HomePageAthletes />


        
        </Flex>





    )
}

export default Home