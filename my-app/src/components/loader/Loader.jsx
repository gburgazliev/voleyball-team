import { Spinner , Flex} from '@chakra-ui/react'

const Loader = () => {
    return (
        <div id='loader'>
   <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        />  

        </div>
         
     
      
    );
}

export default Loader;