import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBI0JmJBZ_DfItyavo-8XrmuREm5_-Mc7U",
    authDomain: "react-contact-1800b.firebaseapp.com",
    projectId: "react-contact-1800b",
    storageBucket: "react-contact-1800b.appspot.com",
    messagingSenderId: "1047207731733",
    appId: "1:1047207731733:web:e6bf37bee6861001ade41c"
  };

  const app = initializeApp(firebaseConfig);
  export const fireDb = getFirestore(app);