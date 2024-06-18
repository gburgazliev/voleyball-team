import { Box, Flex, Heading } from "@chakra-ui/react"
import Register from "../register/Register";

const AuthPage = () => {
    return (
     <Flex  w='100%' h='100%' justify='center' align='center' bgColor='black'>
          
             <Register />
     </Flex>
    )
}

export default AuthPage;