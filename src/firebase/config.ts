import { initializeApp } from "firebase/app";
import "firebase/firestore";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MESSAGING_SENDDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from "@env";

// react-native-first-app
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDDER_ID,
  appId: APP_ID,
};

const app = initializeApp(firebaseConfig, "my-app-name");

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
