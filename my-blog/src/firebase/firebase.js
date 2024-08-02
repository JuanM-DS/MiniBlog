import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAEWJh7uYp1UzGQ16a41UMaQMMUWEXRGCM",
  authDomain: "myblog-bc136.firebaseapp.com",
  projectId: "myblog-bc136",
  storageBucket: "myblog-bc136.appspot.com",
  messagingSenderId: "609906600788",
  appId: "1:609906600788:web:844d57f0dde789c347b6c1"
};

const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;
