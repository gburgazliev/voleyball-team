import { Box, Flex, Image, Text, Heading, List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList, } from "@chakra-ui/react"
import banner from '../assets/banner.jpg'
import logo from '../assets/logo.jpg'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import HomePageAthletes from "../components/homePageAthletes/HomePageAthletes"

  
 const Home = () => {
    return (
        <Flex  direction='column'justify='center'  bg='black'  align='center' w={['200%', '100%', '100%']} >
            <Flex position='absolute' w={['200%', '100%', '100%']}   top={0} justify='center' align='flex-start' bg='black' zIndex={10} bgColor='black'>
      <Header />  
      </Flex>
            <Flex h='15%' justify='center' align='center'  zIndex={1} paddingTop={20}>
                <Image src={banner} boxSize='600px'    w='100%' alt='Voleyball Team' />
            </Flex>

            <Flex justify='center' align='center' w='100%'>
                <Image src={logo} boxSize='400px' alt='Voleyball Team' />
                <Flex direction='column'  align='flex-start'>
                    <Heading textColor='white' fontSize='3xl' paddingBottom={2}>SB Community</Heading>
                    <UnorderedList color='white'>
  <ListItem>Team searching</ListItem>
  <ListItem>Contract Negotiations</ListItem>
  <ListItem>Judical Assistance</ListItem>
  <ListItem>Medical Follow-up</ListItem>
  <ListItem>Physical Conditioning</ListItem>
  <ListItem>Education, individual trainings, sports management, volleyball</ListItem>
</UnorderedList>

                </Flex>
                
            </Flex>

       
        
            <HomePageAthletes/>
    

   
            
    <Flex h='60%' w='100%'>
      <Footer />
    </Flex>
        </Flex>
    )   
}

export default Home