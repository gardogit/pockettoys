//firebaseConfig.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDQrqMy0yb4LjsGO2cNtGagpOisDSsh-XE",
  authDomain: "pocket-toys.firebaseapp.com",
  projectId: "pocket-toys",
  storageBucket: "pocket-toys.appspot.com",
  messagingSenderId: "130490958304",
  appId: "1:130490958304:web:27ba41065df90c5546ab85",
  measurementId: "G-XP7P71XYV3"
};

const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics(app);

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };
