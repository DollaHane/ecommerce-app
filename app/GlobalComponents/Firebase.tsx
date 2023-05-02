// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjArIC1hDSSGGrPGe2ev3Q0ez4nmcm0Tc",
  authDomain: "e-commerce-792f0.firebaseapp.com",
  projectId: "e-commerce-792f0",
  storageBucket: "e-commerce-792f0.appspot.com",
  messagingSenderId: "949509539167",
  appId: "1:949509539167:web:2fdfe94885afdd4c5c22ea",
  measurementId: "G-2K8ZH5JE4S"
};

const firebase = initializeApp(firebaseConfig);

const auth = getAuth(firebase);

const db = getFirestore(firebase);

export { db, auth }
export default firebase 