// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkNgPO5j7_SDpqt26yt6W9SAuVRs8pDL4",
  authDomain: "fyp-restaurant-recommendation.firebaseapp.com",
  projectId: "fyp-restaurant-recommendation",
  storageBucket: "fyp-restaurant-recommendation.appspot.com",
  messagingSenderId: "306108806861",
  appId: "1:306108806861:web:290ed1ebed605698bd5b84"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
