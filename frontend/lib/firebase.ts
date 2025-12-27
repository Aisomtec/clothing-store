import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9Khud5Ctbv0LPhqnaQzuLl9AAVGZaHNA",
  authDomain: "clothing-brand-ba6a2.firebaseapp.com",
  projectId: "clothing-brand-ba6a2",
  storageBucket: "clothing-brand-ba6a2.firebasestorage.app",
  messagingSenderId: "340762734596",
  appId: "1:340762734596:web:95b9a9680420e2d4068551"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
