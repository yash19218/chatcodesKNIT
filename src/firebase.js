import {initializeApp} from 'firebase/app';//to use firebase
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAj28bE4NcWqasxFYBUqm2p_uIZBuV3ad4",
  authDomain: "chatcodes-63773.firebaseapp.com",
  projectId: "chatcodes-63773",
  storageBucket: "chatcodes-63773.appspot.com",
  messagingSenderId: "706301610016",
  appId: "1:706301610016:web:08ff51912cea6613d0d445",
  measurementId: "G-RDBKVCE6C2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);