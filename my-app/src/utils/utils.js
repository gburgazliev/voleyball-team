import { ref, set, get, onValue, update, push } from "firebase/database";
import {
  database,
  storage,
  storageRef,
  deleteObject,
} from "../../firebase/firebase-config";
import { updateEmail } from "firebase/auth";

/**
 * Retrieves a user from the database by their ID and sets it as the current user.
 * @param {string} id - The ID of the user to retrieve.
 * @param {function} setCurrentUser - The function to set the retrieved user as the current user.
 * @returns {Promise<void>} - A promise that resolves when the user is retrieved and set as the current user.
 */
export const getUserById = async (id, setCurrentUser) => {
  try {
    const usersRef = ref(database, `users`);
    const snapshot = await get(usersRef);
    const data = snapshot.val();
    // eslint-disable-next-line no-unused-vars
    Object.entries(data).forEach(([key, value]) => {
      if (value.uid === id) {
        setCurrentUser(value);
      }
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchUserData = async (uid, setUserData) => {
  try {
    await getUserById(uid, setUserData);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Subscribes to updates for a specific athlete by ID.
 *
 * @param {string} id - The ID of the athlete.
 * @param {function} onAthleteUpdate - The callback function to be called when the athlete is updated.
 * @returns {function} - The unsubscribe function that can be called to stop listening for updates.
 */
export const subscribeToAthleteById = (id, onAthleteUpdate, setIsLoading) => {
  const athleteRef = ref(database, `homePageAthletes/${id}`);
  const unsubscribe = onValue(
    athleteRef,
    (snapshot) => {
      const athlete = snapshot.val();
      onAthleteUpdate(athlete);
      setIsLoading(false);
    },
    (error) => {
      console.error(error);
    }
  );

  // Return the unsubscribe function so it can be called to stop listening for updates
  return unsubscribe;
};

/**
 * Retrieves the home page athletes from the database.
 * @returns {Promise<Object>} A promise that resolves to the athletes data.
 */
export const getHomePageAthletes = async () => {
  const athletesRef = ref(database, `homePageAthletes`);
  const athletesSnapshot = await get(athletesRef);
  const athletes = athletesSnapshot.val();
  return athletes;
};

/**
 * Updates the home page athletes in the database.
 *
 * @param {Array} athletes - The array of athletes to update.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
export const updateHomePageAthletes = async (athletes) => {
  const athletesRef = ref(database, `homePageAthletes`);
  await update(athletesRef, athletes);
};

export const addCoachToDatabase = async (firstName, lastName, imageURL) => {
  const newCoach = {
    firstName,
    lastName,
    imageURL,
  };
  const coachesRef = ref(database, `coaches`);
  const newCoachRef = push(coachesRef);
  await set(newCoachRef, newCoach);
  return newCoachRef.key;
};

export const updateCoach = async (id, data) => {
  const coachRef = ref(database, `coaches/${id}`);
  await update(coachRef, data);
};

export const subscribeToCoachById = (id, onCoachUpdate) => {
  const coachRef = ref(database, `coaches/${id}`);
  const unsubscribe = onValue(
    coachRef,
    (snapshot) => {
      const coach = snapshot.val();
      onCoachUpdate(coach);
    },
    (error) => {
      console.error(error);
    }
  );
  return unsubscribe;
};

/**
 * Deletes an object from the database.
 * @param {string} url - The URL of the object to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the object is successfully deleted.
 */
export const deleteDatabaseObject = async (url) => {
  const objectRef = ref(database, url);
  await set(objectRef, null);
};

export const deleteStorageObject = async (url) => {
  const storageRefObject = storageRef(storage, url);
  storageRefObject && (await deleteObject(storageRefObject));
};

/**
 * Deletes an athlete from the home page athletes list.
 * @param {string} id - The ID of the athlete to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the athlete is successfully deleted.
 */
export const handleDeleteAthlete = async (id) => {
  try {
    const athletesRef = ref(database, `homePageAthletes`);
    const athletesSnapshot = await get(athletesRef);
    const athletesArray = athletesSnapshot.val();
    const athleteIndex = await findAthleteKeyById(id)
    athletesArray.splice(athleteIndex, 1);
    await set(athletesRef , athletesArray);
  } catch (error) {
    console.error(error);
  }
  try {
    await deleteStorageObject(`homepageAthletes/${id}`);
  } catch (error) {
    console.log(`Couldn't delete storage object`);
  }
};

export async function findAthleteKeyById(id) {
  const athletesRef = ref(database, `homePageAthletes`);
  const athletesSnapshot = await get(athletesRef);
  const athletesArray = athletesSnapshot.val();
  const athleteIndex = Object.keys(athletesArray).find(
    (key) => athletesArray[key].uid === id
  );
  return athleteIndex;
}

/**
 * Updates an athlete in the database.
 * @param {string} id - The ID of the athlete.
 * @param {object} data - The updated data for the athlete.
 * @returns {Promise<void>} - A promise that resolves when the athlete is updated.
 */
export const updateAthlete = async (id, data) => {
  const atheleteKey = await findAthleteKeyById(id);
  const athleteRef = ref(database, `homePageAthletes/${atheleteKey}`)
  await update(athleteRef, data);
};

export const setAthletesDB = async (athletes) => {
  try {
    const athletesRef = ref(database, "homePageAthletes");

    await set(athletesRef, athletes);
    console.log("ok");
  } catch (error) {
    console.log("Error settings athletes");
    throw error;
  }
};

/**
 * Checks if the current device is a mobile device.
 * @returns {boolean} Returns true if the device is a mobile device, otherwise returns false.
 */
export function isMobileDevice() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
}

export const usersListener = (setUsers) => {
  const usersRef = ref(database, "users");
  const unsubscribe = onValue(
    usersRef,
    (snapshot) => {
      const usersSnapshot = snapshot.val();
      setUsers(usersSnapshot);
    },
    (error) => console.log(`Subscription to user canceled: ${error}`)
  );

  return unsubscribe;
};
