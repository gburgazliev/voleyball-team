/**
 * Renders the home page of the volleyball team website.
 * @returns {JSX.Element} The rendered home page component.
 */
import {
    Flex, Grid, GridItem, Image
} from "@chakra-ui/react"
import logo from '../../assets/logo.jpg'
import banner2 from '../../assets/banner2.jpg'
import HomePageAthletes from "../../components/homePageAthletes/HomePageAthletes"
import './home.css'

const Home = () => {
 


 
    return (
    


        <Flex direction='column' justify='center'  align='center' w={['100%', '100%', '100%', '100%']} >
            
{/*         
             <div class='banner-container'>
                 <img id='banner' src={banner2}  alt='Volleyball Team' />
             </div>
                */}

            

            <Grid  padding={5}  gap={['0%', '0%' , '5%' ,'5%']} align='center' w='100%' templateColumns={['1fr' , '1fr', '1fr 1fr', '1fr 1fr']}>
                <GridItem display='flex' justifyContent={['center', 'center', 'end' ,'end']} >
                     <Image width={['90%', '70%', '90%', '70%']} height='auto' src={logo}  alt='Volleyball Team' objectFit='contain' />
                </GridItem>
               
                
                <GridItem display="flex" justifyContent={["center" , 'center' , 'start' ,'start']} alignItems="center">
                      <ul  
                    >
                        <li>Team searching</li>
                        <li>Contract Negotiations</li>
                        <li>Judicial Assistance</li>
                        <li>Medical Follow-up</li>
                        <li>Physical Conditioning</li>
                        <li>Education, individual trainings, sports management, volleyball</li>
                    </ul>
                </GridItem>
                    
                
                  

             

            </Grid>

            <HomePageAthletes />


        
        </Flex>





    )
}

export default Home