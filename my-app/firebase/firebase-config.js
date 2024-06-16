// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getAnalytics} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvPMbe4TW9fEYcLYw3O42yTF5zgOVjrDU",
  authDomain: "voleyball-team.firebaseapp.com",
  projectId: "voleyball-team",
  storageBucket: "voleyball-team.appspot.com",
  messagingSenderId: "350177838327",
  appId: "1:350177838327:web:2f9119281d1dd7f4fc3ff2",
  measurementId: "G-525H0G45F7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

export {database, app, auth, analytics}