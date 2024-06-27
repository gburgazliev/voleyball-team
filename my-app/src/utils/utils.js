import { getDatabase, ref, set, get, child, onValue, update} from "firebase/database";
import { database, storage } from "../../firebase/firebase-config";
import { ref as storageRef, deleteObject as deleteStorageObject } from "firebase/storage";



export const getUserById = async (id, setCurrentUser) => {
    const usersRef = ref(database, `users`);
  const snapshot = await get(usersRef);
    const data = snapshot.val();
   Object.entries(data).forEach(([key, value]) => {
        if (value.uid === id) {
            setCurrentUser(value);
        }
    });
}

export const subscribeToAthleteById = (id, onAthleteUpdate) => {
    const athleteRef = ref(database, `homePageAthletes/${id}`);
    const unsubscribe = onValue(athleteRef, (snapshot) => {
        const athlete = snapshot.val();
        onAthleteUpdate(athlete);
    }, (error) => {
        console.error(error);
    });

    // Return the unsubscribe function so it can be called to stop listening for updates
    return unsubscribe;
};

export const getHomePageAthletes = async () => {
    const athletesRef = ref(database, `homePageAthletes`);
    const athletesSnapshot = await get(athletesRef);
    const athletes = athletesSnapshot.val();
    return athletes;
}

export const updateHomePageAthletes = async (athletes) => {
    const athletesRef = ref(database, `homePageAthletes`);
    await update(athletesRef, athletes);
}

export const deleteObject = async (url) => {
    const objectRef = ref(database, url);
    await set(objectRef, null);
};


export const handleDeleteAthlete = async (id) => {
    try {
    
          const athletesRef = ref(database, `homePageAthletes`);
    const athletesSnapshot = await get(athletesRef);
    const athletes = athletesSnapshot.val();
  const newAthletesArray = Object.entries(athletes).filter(([key, value]) => key !== id);
    const newAthletes = Object.fromEntries(newAthletesArray);
    await set(athletesRef, newAthletes);
 
    } catch (error) {
        console.error(error);
    }

    // const imageRef = storageRef(storage, `homepageAthletes/${id}`) || null;
    // console.log(imageRef)
    // if (imageRef) {
    //     await deleteStorageObject(imageRef);
    // }
   
}

export const updateAthlete = async (id, data) => {
    const athleteRef = ref(database, `homePageAthletes/${id}`);
    await update(athleteRef, data);
}

