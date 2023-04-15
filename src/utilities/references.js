import { db } from "@services/firebaseConfig";
import { collection } from "firebase/firestore";
import { useSelector } from "react-redux";

export const userRef = () => {
  const user = useSelector((state) => state.auth.user);
  return doc(db, "users", user.uid);
};

export const packRef = collection(db, "pack");
