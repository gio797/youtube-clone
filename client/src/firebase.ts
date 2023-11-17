import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCiuMDfcZ-EqWUlLVFQ1QL6WrtpNsJUu_g",
  authDomain: "video-6f535.firebaseapp.com",
  projectId: "video-6f535",
  storageBucket: "video-6f535.appspot.com",
  messagingSenderId: "166695402487",
  appId: "1:166695402487:web:4b3c8c30f2ef87f66b0cf2"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider= new GoogleAuthProvider()
export default app