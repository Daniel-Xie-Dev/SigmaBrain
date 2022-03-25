// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import config from "../config"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: config.api_key,
  authDomain: config.auth_domain,
  projectId: config.project_id,
  storageBucket: config.storage_bucket,
  messagingSenderId: config.messaging_sender_id,
  appId: config.app_id,
  measurementId: config.measurement_id
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);