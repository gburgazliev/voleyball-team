import {
    Box, Flex, Image, Text, Heading, List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList, Divider, AbsoluteCenter
} from "@chakra-ui/react"
import banner from '../../assets/banner.jpg'
import logo from '../../assets/logo.jpg'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import HomePageAthletes from "../../components/homePageAthletes/HomePageAthletes"
import { isMobileDevice } from "../../utils/utils"
import MobileHeader from "../../components/mobileHeader/MobileHeader"
import location from "../../assets/location.png";
import phone from "../../assets/phone.png";
import letter from "../../assets/letter.png";

const Home = () => {
    return (
        <Flex direction='column' justify='center' bg='black' align='center' w={['100%', '100%', '100%', '100%']} >
            {!isMobileDevice() ?
                <Header />
                : <MobileHeader />}
            <Flex h='15%' justify='center' align='center' zIndex={0} paddingTop={20}>
                <img className="image" src={banner} boxSize='600px' w='100%' alt='Voleyball Team' />

            </Flex>

            <Flex justify='center' align='center' w={['50%', '50%', '100%', '100%']}>
                <Image src={logo} boxSize='300px' alt='Voleyball Team' />
                <Flex direction='column' align='flex-start'>
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

            <HomePageAthletes />


            <Footer />
           
           



        </Flex>
    )
}

export default Home