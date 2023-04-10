//firebaseUtils.js
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";

export const initializeFirebaseApp = () => {

};

const auth = getAuth();
const db = getFirestore();

export const subscribeToAuthChanges = (callback) => {
  const auth = getAuth();
  return onAuthStateChanged(auth, callback);
};

export async function saveUserData(user) {
  const userRef = doc(db, "users", user.uid);

  const userData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    phoneNumber: "",
    addresses: [],
    paymentMethods: [],
    purchaseHistory: [],
  };

  await setDoc(userRef, userData, { merge: true });
}