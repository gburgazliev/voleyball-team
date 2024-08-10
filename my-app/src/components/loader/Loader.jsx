import './loader.css'
import loading from '../../assets/loading.png'
const Loader = () => {
    return (
        <div id='loader'>
           <div id="cloud-container">
             <img src={loading} class='upDown' alt="cloud" />
            <img src={loading}  class='upDownDelayHalfSec' alt="cloud" />
            <img src={loading} class='upDownDelayOneSec'alt="cloud" />
           </div>
           


        </div>
         
     
      
    );
}

export default Loader;