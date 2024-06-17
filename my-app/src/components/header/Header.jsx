import { Box, Container, Heading } from "@chakra-ui/react"


const Header = () => {
    return (
     <Box w='100%' h='30%'>
        <Container >
            <Box   textColor='orange' paddingTop={10}> 
           <Heading size='lg' _hover={{color:'blue', cursor: 'pointer'}} onClick={''}>  SB COMMUNITY</Heading>
         </Box>
        </Container>
       
        </Box>
    )
}

export default Header