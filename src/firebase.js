import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAY9nW6ExRL3zd6_YHaNO0QrCTM08WcHfE",
  authDomain: "alfaweb-9a676.firebaseapp.com",
  projectId: "alfaweb-9a676",
  storageBucket: "alfaweb-9a676.appspot.com",
  messagingSenderId: "779780274897",
  appId: "1:779780274897:web:31d37ac42e51dfb85363f0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const currentUserPromise = () =>
  new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        resolve(user);
      },
      (e) => reject(e)
    );
  });

export { auth, currentUserPromise, db };