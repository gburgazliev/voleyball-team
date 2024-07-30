/**
 * Renders the home page athletes component.
 * 
 * @returns {JSX.Element} The home page athletes component.
 */

import { Box, Flex, Text, Button, Popover, PopoverTrigger, PopoverContent, Avatar, PopoverBody, PopoverHeader, PopoverArrow, PopoverCloseButton, Input, Wrap, WrapItem } from "@chakra-ui/react"
import { getHomePageAthletes } from "../../utils/utils";
import { useEffect, useState } from "react";
import SingleHomePageAthlete from "../singleHomePageAthlete/SingleHomePageAthlete";
import { useAuth } from "../../context/AuthContext";
import { getUserById } from "../../utils/utils";
import { get, onValue, set, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { ref, push } from "firebase/database";
import { auth, database } from "../../../firebase/firebase-config";
import { uploadBytesResumable, getDownloadURL, ref as storageRef } from "firebase/storage";
import { storage } from '../../../firebase/firebase-config'





const HomePageAthletes = ({ onLoaded }) => {
    const [athletes, setAthletes] = useState({});
    const { user } = useAuth();
    const [userData, setUserData] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [profilePicUploadProgress, setProfilePicUploadProgress] = useState(0);
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        picture: '',
    });



    useEffect(() => {
        const fetchAthletes = async () => {
           

            onValue(ref(database, 'homePageAthletes'),(snapshot) => {
                    const data = snapshot.val();
                    setAthletes(data || {});
                    
               
                });
        };
        fetchAthletes();



    }, []);

    



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUserData(currentUser);
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    useEffect(() => {
        getUserById(userData?.uid, setCurrentUser)

    }, [userData]);


    /**
     * Updates the form state with the provided property value.
     * @param {string} prop - The property to update in the form state.
     * @returns {Function} - The event handler function.
     */
    const updateForm = prop => e => {
        setForm({
            ...form,
            [prop]: e.target.value,
        });
    }

    /**
     * Checks if the current user has the role of admin.
     * @returns {boolean} True if the current user is an admin, false otherwise.
     */
    const isAdmin = () => {
        return currentUser?.role === 'admin';
    }



    /**
     * Handles the change event of the file input element.
     * @param {Object} e - The event object.
     */
    const handleChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setProfilePic(URL.createObjectURL(file));
    }

    /**
     * Handles the upload of a picture for a new athlete.
     * 
     * @param {File} file - The file to be uploaded.
     * @param {Object} newAthlete - The new athlete object.
     * @returns {Promise<string>} - A promise that resolves with the download URL of the uploaded picture.
     */
    const handleUploadPicture = async (file, newAthlete) => {
        return new Promise((resolve, reject) => {
            const fileRef = storageRef(storage, `homepageAthletes/${newAthlete.uid}`)

            const uploadTask = uploadBytesResumable(fileRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProfilePicUploadProgress(progress);
                },
                (error) => {
                    console.error(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setAthletes({
                            ...athletes,
                            [newAthlete.uid]: newAthlete,
                        });
                        setProfilePicUrl(downloadURL);
                        resolve(downloadURL);
                    })
                        .catch((error) => {
                            console.error(error);
                            reject(error);
                        }
                        );
                }
            );
        });
    }

    /**
     * Handles the addition of a new athlete.
     * @returns {Promise<void>} A promise that resolves when the athlete is added successfully.
     */

    const handleAddAthlete = async () => {
        try {
            const newAthleteRef = push(ref(database, 'homePageAthletes'));
            const newAthlete = {
                uid: newAthleteRef.key,
                firstname: form.firstname,
                lastname: form.lastname,
                picture: profilePicUrl,
            };
            newAthlete.picture = await handleUploadPicture(file, newAthlete);
            await update(newAthleteRef, newAthlete)
            setForm({
                firstname: '',
                lastname: '',
                picture: '',
            });
            setFile('');
            setProfilePicUrl('');
            setProfilePic('');

        } catch (error) {
            console.error(error);
        }

    }
    return (
        <Flex w='100%' minH='30vh' direction='column' justify='center' align='center' zIndex={10}>
            <Text color='white'>OUR ATHLETES</Text>
            <Wrap spacing="20px" justify="space-evenly" paddingTop={2} paddingRight={1} paddingLeft={1} paddingBottom={2} w={['100%', '90%', '50%', '50%']}>
                {Object.entries(athletes).map(([key, value]) => (
                    <WrapItem key={key}>
                        <SingleHomePageAthlete athlete={value} isAdmin={isAdmin} />
                    </WrapItem>
                ))}
            </Wrap>

            <Popover onClose={() => setFile('')} >
                <PopoverTrigger>
                    {isAdmin() ? <Button>Add new athlete</Button> : <span></span>}
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Add new athlete</PopoverHeader>
                    <PopoverBody justify='center' align='center'><Input placeholder="Firstname" value={form.firstname} onChange={updateForm('firstname')} />
                        <Input placeholder="Lastname" value={form.lastname} onChange={updateForm('lastname')} />
                        <Avatar size='2xl' name={form.firstname + ' ' + form.lastname} src={profilePic} />
                        <Input type='file' onChange={handleChange}></Input>
                        <Button justifySelf='center' onClick={handleAddAthlete} >
                            Add
                        </Button>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    )
}

export default HomePageAthletes