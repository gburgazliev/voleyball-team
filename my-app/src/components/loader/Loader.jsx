import './loader.css'
import loading from '../../assets/loading.png'
const Loader = () => {
    return (
        <div id='loader'>
           <div id="cloud-container">
             <img src={loading} className='upDown' alt="cloud" />
            <img src={loading}  className='upDown' alt="cloud" />
            <img src={loading} className='upDown'alt="cloud" />
           </div>
           


        </div>
         
     
      
    );
}

export default Loader;