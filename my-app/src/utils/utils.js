import {
  ref,
  set,
  get,
  onValue,
  update,
  push,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import {
  database,
  storage,
  storageRef,
  deleteObject,
} from "../../firebase/firebase-config";

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

// /**
//  * Subscribes to updates for a specific athlete by ID.
//  *
//  * @param {string} id - The ID of the athlete.
//  * @param {function} onAthleteUpdate - The callback function to be called when the athlete is updated.
//  * @returns {function} - The unsubscribe function that can be called to stop listening for updates.
//  */
export const subscribeToAthleteById = async (id, onAthleteUpdate, gender) => {
  let athleteKey;
  try {
    athleteKey = await findAthleteKeyById(id, gender);
    athleteKey = athleteKey[0];
  } catch (error) {
    console.log(`Failed getting athlete key ${error.message}`);
  }

  if (athleteKey) {
    const athleteRef = ref(
      database,
      `homePageAthletes/${gender}/${athleteKey}`
    );
    const unsubscribe = onValue(
      athleteRef,
      (snapshot) => {
        const athlete = snapshot.val();
        onAthleteUpdate(athlete);
      },
      (error) => {
        console.error(error);
      }
    );

    // Return the unsubscribe function so it can be called to stop listening for updates
    return unsubscribe;
  }
};

/**
 * Retrieves the home page athletes from the database.
 * @returns {Promise<Object>} A promise that resolves to the athletes data.
 */
export const getHomePageAthletesByGender = async (gender) => {
  try {
    const athletesRef = ref(database, `homePageAthletes/${gender}`);
    const athletesSnapshot = await get(athletesRef);
    const athletes = athletesSnapshot.val();

    return athletes;
  } catch (error) {
    console.error(
      `Unable to retrieve athletes from database: ${error.message}`
    );
  }
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
  try {
    await set(newCoachRef, newCoach);
    return newCoachRef.key;
  } catch (error) {
    console.error(`Unable to add coach to database: ${error.message}`);
  }
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
export const handleDeleteAthlete = async (id, gender) => {
  try {
    const athletesArray = await getHomePageAthletesByGender(gender);
    const athleteIndex = await findAthleteKeyById(id, gender)[0];

    athletesArray.splice(athleteIndex, 1);
    await set(ref(database, `homePageAthletes/${gender}`), athletesArray);
  } catch (error) {
    console.error(error);
  }
  try {
    await deleteStorageObject(`homepageAthletes/${id}`);
  } catch (error) {
    console.log(`Couldn't delete storage object`);
  }
};

export async function findAthleteKeyById(id, gender) {
  const athletesArray = await getHomePageAthletesByGender(gender);

  const athleteIndex = Object.keys(athletesArray).find(
    (key) => athletesArray[key].uid === id
  );

  return [athleteIndex, gender];
}

/**
 * Updates an athlete in the database.
 * @param {string} id - The ID of the athlete.
 * @param {object} data - The updated data for the athlete.
 * @returns {Promise<void>} - A promise that resolves when the athlete is updated.
 */
export const updateAthlete = async (id, prop, gender) => {
  const atheleteKeyGenderArr = await findAthleteKeyById(id, gender);
  const athleteRef = ref(
    database,
    `homePageAthletes/${atheleteKeyGenderArr[1]}/${atheleteKeyGenderArr[0]}`
  );
  await update(athleteRef, prop);
};

export const setAthletesDB = async (athletes) => {
  try {
    if (athletes) {
      const gender = athletes[0] && athletes[0].gender;
      console.log(gender);
      const athletesRef = ref(database, `homePageAthletes/${gender}`);

      await set(athletesRef, athletes);
    }
  } catch (error) {
    console.log("Error setting athletes");
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

export const fetchUserByEmail = async (email) => {
  const usersRef = ref(database, "users");
  const emailQuery = query(usersRef, orderByChild("email"), equalTo(email));

  const snapshot = await get(emailQuery);
  return snapshot.val();
};

export const fetchUserByUsername = async (username) => {
  const usersRef = ref(database, "users");
  const usernameQuery = query(
    usersRef,
    orderByChild("username"),
    equalTo(username)
  );
  const snapshot = await get(usernameQuery);
  return snapshot.val();
};
