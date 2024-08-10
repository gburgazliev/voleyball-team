import { Spinner , Flex} from '@chakra-ui/react'
import './loader.css'
import loading from '../../assets/loading.png'
const Loader = () => {
    return (
        <div id='loader'>
           <div id="cloud-container">
             <img src={loading} class='spin' alt="cloud" />
            <img src={loading}  class='spinDelayHalfSec' alt="cloud" />
            <img src={loading} class='spinDelay1sec'alt="cloud" />
           </div>
           


        </div>
         
     
      
    );
}

export default Loader;