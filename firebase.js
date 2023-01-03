import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeegIdbACg5G1aoI4Ldl7Rma8Y6Ce8nVg",
  authDomain: "react-app-2e1c0.firebaseapp.com",
  projectId: "react-app-2e1c0",
  storageBucket: "react-app-2e1c0.appspot.com",
  messagingSenderId: "715251491692",
  appId: "1:715251491692:web:40483d7f4113eb2f750949",
  measurementId: "G-NBD5D9V0H4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);