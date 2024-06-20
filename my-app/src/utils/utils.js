import { getDatabase, ref, set, get, child, onValue, update} from "firebase/database";
import { database } from "../../firebase/firebase-config";


export const getUserById = async (id, setCurrentUser) => {
    const usersRef = ref(database, `users`);
   onValue(usersRef, (snapshot) => {
    const data = snapshot.val();
   Object.entries(data).forEach(([key, value]) => {
        if (value.uid === id) {
            setCurrentUser(value);
        }
    });

  
});
}

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