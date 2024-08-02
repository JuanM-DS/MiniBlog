import appFirebase from "./firebase";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(appFirebase);

export default db;
