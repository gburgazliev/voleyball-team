import { Box, Container, Flex, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Divider, Center, Icon, Image } from "@chakra-ui/react"
import { HStack } from "@chakra-ui/react"
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'

const Header = () => {
    return (
        <Box h='100%' w='60%'bgColor='black'  textColor='white' marginRight='5%' marginLeft='5%' >
            <Flex w='90%' justify='flex-end' paddingTop={10}>
                <HStack spacing={5}>
                    <Image src={facebook} boxSize="35px" alt="Facebook" />
                    <Image src={instagram} boxSize="35px" alt="Facebook" />
                </HStack>
            </Flex>   

            <Box w='40%' h='5%' textColor='orange'  alignSelf='flex-start' paddingBottom={10}>
                <Heading w='100%' _hover={{ color: 'blue', cursor: 'pointer' }} onClick={''}>  SB COMMUNITY</Heading>

            </Box>      
            
            <Flex maxW='100%' h='100%' justify='space-between' direction='row' align='center' >
                <Heading paddingLeft={5} paddingRight={5} size='sm' _hover={{ color: 'red', cursor: 'pointer' }}>
                    HOME

                </Heading>

                <Divider orientation="vertical" height='30%'  >

                </Divider>

                <Heading paddingLeft={5} paddingRight={5} size='sm' _hover={{ color: 'red', cursor: 'pointer' }}>
                    ATHLETES
                </Heading>

                <Divider orientation="vertical" height='30%' >

                </Divider>

                <Heading paddingLeft={5} paddingRight={5} size='sm' _hover={{ color: 'red', cursor: 'pointer' }} >
                    COACHES
                </Heading>

                <Divider orientation="vertical" height='30%' >

                </Divider>

                <Heading paddingLeft={5} paddingRight={5} size='sm' _hover={{ color: 'red', cursor: 'pointer' }}>
                    HALL OF FAME
                </Heading>
                <Divider orientation="vertical" height='30%' >

                </Divider>

                <Heading paddingLeft={5} paddingRight={5} size='sm' _hover={{ color: 'red', cursor: 'pointer' }}>
                    ABOUT US
                </Heading>

                <Divider orientation="vertical" height='30%' >

                </Divider>

                <Heading paddingLeft={0} paddingRight={0} size='sm' _hover={{ color: 'red', cursor: 'pointer' }}>
                    CONTACT
                </Heading>




            </Flex>














        </Box>
    )
}

export default Header