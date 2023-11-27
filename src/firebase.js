import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_API_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

export const storage = getStorage();

export const db = getDatabase();

// export function createNewAdmin() {
//   console.log("firebase config", firebaseConfig);
//   const email = process.env.REACT_APP_ADMIN_EMAIL;
//   const password = process.env.REACT_APP_ADMIN_PASSWORD;
//   const newAdmin = createUserWithEmailAndPassword(
//     firebaseAuth,
//     email,
//     password
//   );

//   return newAdmin;
// }
