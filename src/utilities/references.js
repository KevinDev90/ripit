import { db } from "@services/firebaseConfig";
import { collection, doc, query, where } from "firebase/firestore";

export const userRef = (id) => doc(db, "users", id);

export const packRef = collection(db, "pack");

export const packRefUpdate = (id) => doc(db, "pack", id);

export const filterPackDoc = (userID, id) =>
  query(packRef, where("userID", "==", userID), where("id", "==", id));
