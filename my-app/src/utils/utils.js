import { getDatabase, ref, set, get, child } from "firebase/database";
import { database } from "../../firebase/firebase-config";


export const getUserById = async (id) => {
    const usersRef = ref(database, `users`);
    const usersSnapshot = await get(usersRef);
    const users = usersSnapshot.val();
     const objectArray = Object.entries(users);
    const user = objectArray.find(([key, value]) => value.uid === id);
    return user[1];
}