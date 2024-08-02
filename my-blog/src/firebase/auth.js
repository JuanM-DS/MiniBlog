import appFirebase from "./firebase.js"
import {getAuth } from "firebase/auth"

const auth = getAuth(appFirebase);
export default auth;