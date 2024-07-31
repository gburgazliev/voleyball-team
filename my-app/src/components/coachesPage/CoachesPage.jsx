import Header from "../header/Header";
import MobileHeader from "../mobileHeader/MobileHeader";
import { isMobileDevice } from "../../utils/utils";
import Footer from "../footer/Footer";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";



import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import './coachesPage.css';
import { getDownloadURL } from "firebase/storage";
import { addCoachToDatabase, updateCoach, getCoaches } from "../../utils/utils";
import { database, storage, storageRef } from '../../../firebase/firebase-config';
import { set, onValue, ref } from "firebase/database";


import { uploadBytes } from "firebase/storage";
const CoachesPage = () => {
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [file, setFile] = useState(null);
    const [coaches, setCoaches] = useState([]);






    const handleFileChange = (e) => {
        setImageURL(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    };

    const addCoach = async () => {
        if (firstName && lastName) {
            let downloadURL = '';
            const coachUID = await addCoachToDatabase(firstName, lastName, imageURL);
            if (file) {

                const storageRefImage = storageRef(storage, `coaches/${coachUID}`);
                await uploadBytes(storageRefImage, file);
                downloadURL = await getDownloadURL(storageRefImage);
            }
            await updateCoach(coachUID, { imageURL: downloadURL });

            setFirstName('');
            setLastName('');
            setImageURL('');
            setFile(null);
            setIsModalOpen(false);
        }
    }


    useEffect(() => {
        const coachesRef = ref(database, `coaches`);
        onValue(coachesRef, (snapshot) => {
            const coachesOBJ = snapshot.val();
            const coachesARR = [];
            for (let coach in coachesOBJ) {
                coachesARR.push(coachesOBJ[coach]);
            }
            setCoaches(coachesARR);
        }, (error) => {
            console.error(error);
        });
    }, []);
    
    return (
        <div class="coaches-page-container">
            <div id='header'>
                {!isMobileDevice() ?
                    <Header />
                    : <MobileHeader />}
            </div>

            <div id='coaches-container'>
                <h1>asdadadadadad</h1>
                <h1>asdadsadadsadsad</h1>
                <h1>asdadadadadad</h1>
                <h1>asdadadadadad</h1>
                <h1>asdadsadadsadsad</h1>
                <h1>asdadadadadad</h1>

            </div>
            <button id='add-coach-button' onClick={() => setIsModalOpen(true)}>Add coach</button>
            <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader >Add coach</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <input type="text" placeholder="First name" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                        <input type="text" placeholder="Last name" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                        <input type='file' onChange={handleFileChange} />
                        <img src={imageURL} alt="" />
                    </ModalBody>
                    <ModalFooter >
                        <button onClick={addCoach}>Save</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <div id='footer'>
                <Footer />
            </div>
        </div>
    );
}

export default CoachesPage;