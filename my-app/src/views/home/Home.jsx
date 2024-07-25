/**
 * Renders the home page of the volleyball team website.
 * @returns {JSX.Element} The rendered home page component.
 */
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
import './home.css'

const Home = () => {
    return (
        <Flex direction='column' justify='center' bg='black' align='center' w={['100%', '100%', '100%', '100%']} >
            {!isMobileDevice() ?
                <Header />
                : <MobileHeader />}
            <Flex h='15%' justify='center' align='center' zIndex={0} paddingTop={20}>
                <img className="image" src={banner} boxSize='600px' w='100%' alt='Volleyball Team' />

            </Flex>

            <Flex justify='center' align='center' w={['50%', '50%', '100%', '100%']}>
                <img id='logo' src={logo} boxSize='400px' alt='Volleyball Team' />
                <Flex direction='column' align='flex-start'>
                    <Heading textColor='white' fontSize='3xl' paddingBottom={2}>Heaven07</Heading>
                    <UnorderedList color='white'>
                        <ListItem>Team searching</ListItem>
                        <ListItem>Contract Negotiations</ListItem>
                        <ListItem>Judicial Assistance</ListItem>
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