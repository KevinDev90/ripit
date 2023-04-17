import { db } from "@services/firebaseConfig";
import { collection, doc, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";

export const userRef = () => {
  const user = useSelector((state) => state.auth.user);

  return doc(db, "users", user.uid);
};

export const packRef = collection(db, "pack");

export const packRefUpdate = (id) => doc(db, "pack", id);

export const filterPackDoc = (userID, id) =>
  query(packRef, where("userID", "==", userID), where("id", "==", id));
