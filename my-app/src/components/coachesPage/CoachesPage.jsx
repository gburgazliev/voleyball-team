import Header from "../header/Header";
import MobileHeader from "../mobileHeader/MobileHeader";
import { isMobileDevice } from "../../utils/utils";
import './coachesPage.css';

const CoachesPage = () => {
    return (
        <div class="coaches-page-container">
            <div id='header'>
                {  !isMobileDevice() ?
                <Header />
                : <MobileHeader />}
            </div>
           
            <h1>Coaches Page</h1>
        </div>
    );
}

export default CoachesPage;