import { Box, Container, Heading } from "@chakra-ui/react"


const Header = () => {
    return (
     <Box >
       <Box   textColor='orange' paddingLeft={50} paddingTop={10} maxW='15%' marginRight='5%'> 
           <Heading size='lg' _hover={{color:'blue', cursor: 'pointer'}} onClick={''}>  SB COMMUNITY</Heading>
         </Box>
        </Box>
    )
}

export default Header