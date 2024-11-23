import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";



import {
    DialogRoot,
    
     DialogContent,
    DialogHeader,
    DialogFooter,
    DialogBody,
     DialogCloseTrigger,
} from '../ui/dialog'
import './coachesPage.css';
import { getDownloadURL } from "firebase/storage";
import { addCoachToDatabase, updateCoach} from "../../utils/utils";
import { database, storage, storageRef } from '../../../firebase/firebase-config';
import {onValue, ref } from "firebase/database";
import SingleCoachesPageCoach from "../singleCoachesPageCoach/SingleCoachesPageCoach";
import { uploadBytes } from "firebase/storage";
import { DialogBackdrop } from "@chakra-ui/react";


const CoachesPage = () => {
    const { isAdmin } = useAuth();
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
            await updateCoach(coachUID, { imageURL: downloadURL , uid: coachUID});

            setFirstName('');
            setLastName('');
            setImageURL('');
            setFile(null);
            setIsModalOpen(false);
        }
    }


    useEffect(() => {
        const coachesRef = ref(database, `coaches`);
       const unsubscribe =  onValue(coachesRef, (snapshot) => {
            const coachesOBJ = snapshot.val();
            const coachesARR = [];
            for (let coach in coachesOBJ) {
                coachesARR.push(coachesOBJ[coach]);
            }
            setCoaches(coachesARR);
        }, (error) => {
            console.error(error);
        });

        return () => unsubscribe();
    }, []);

    
    
    
    return (
        <div className="coaches-page-container">
            

            <div id='coaches-container'>
                {coaches.map((coach) => {
                    return (
                        <SingleCoachesPageCoach isAdmin={isAdmin} key={coach.uid} coach={coach} />
                    );
                })}

            </div>
          { isAdmin && <button id='add-coach-button' onClick={() => setIsModalOpen(true)}>Add coach</button>}
            <DialogRoot isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }}>
                <DialogBackdrop />
                <DialogContent>
                    <DialogHeader >Add coach</DialogHeader>
                    <DialogCloseTrigger />
                    <DialogBody >
                        <input id='first-name-input' type="text" placeholder="First name" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                        <input id="last-name-input" type="text" placeholder="Last name" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                        <input id="coach-file-input" type='file' onChange={handleFileChange} />
                        <img id='modal-image'src={imageURL} alt="" />
                    </DialogBody>
                    <DialogFooter >
                        <button onClick={addCoach}>Save</button>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
          
        </div>
    );
}

export default CoachesPage;