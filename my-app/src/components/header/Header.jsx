import { Box, Container, Flex, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Divider, Center, Icon, Image, Button } from "@chakra-ui/react"
import { HStack } from "@chakra-ui/react"
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'
import youtube from '../../assets/youtube.png'
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()
    return (
        <Box  minH='15vh' w='60%' bgColor='black'  textColor='white' marginRight='5%' marginLeft='5%'  zIndex={10}>
            <Flex w='90%' justify='flex-end' paddingTop={10}>
                <HStack spacing={5}>
                    <Button onClick={() =>navigate('/auth') }>Sign up/Sign in</Button>
                    <Image src={facebook} boxSize="35px" alt="Facebook" />
                    <Image src={instagram} boxSize="35px" alt="Instagram"  borderRadius="full" />
                    <Image src={youtube} boxSize="40px" alt="Youtube"  borderRadius="full"/>
                </HStack>
            </Flex>   

            <Box w='40%'  textColor='orange'  justify='flex-start' alignSelf='flex-start'  bgColor='black'>
                <Heading w='100%' _hover={{ color: 'blue', cursor: 'pointer' }} onClick={''}>  SB COMMUNITY</Heading>

            </Box>      
            
            <Flex maxW='100%' h='100%' justify='space-between' direction='row' align='center' bgColor='black' paddingTop={5} marginBottom={5}>
                <Heading paddingLeft={5} paddingRight={5} size='sm' _hover={{ color: 'red', cursor: 'pointer' }}>
                    HOME

                </Heading>

                <Divider orientation="vertical" height='20px' borderWidth='1px' >

                </Divider>

                <Heading paddingLeft={5} paddingRight={5} size='sm' _hover={{ color: 'red', cursor: 'pointer' }}>
                    ATHLETES
                </Heading>

                <Divider orientation="vertical" height='20px' borderWidth='1px'>

                </Divider>

                <Heading paddingLeft={5} paddingRight={5} size='sm' _hover={{ color: 'red', cursor: 'pointer' }} >
                    COACHES
                </Heading>

                <Divider orientation="vertical" height='20px' borderWidth='1px'>

                </Divider>

                <Heading paddingLeft={5} paddingRight={5} size='sm' _hover={{ color: 'red', cursor: 'pointer' }}>
                    HALL OF FAME
                </Heading>
                <Divider orientation="vertical" height='20px' borderWidth='1px' >

                </Divider>

                <Heading paddingLeft={5} paddingRight={5} size='sm' _hover={{ color: 'red', cursor: 'pointer' }}>
                    ABOUT US
                </Heading>

                <Divider orientation="vertical" height='20px' borderWidth='1px' >

                </Divider>

                <Heading paddingLeft={0} paddingRight={0} size='sm' _hover={{ color: 'red', cursor: 'pointer' }}>
                    CONTACT
                </Heading>




            </Flex>














        </Box>
    )
}

export default Header