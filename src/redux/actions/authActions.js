import { login, logout } from "@redux/reducers/authSlice";
import { auth } from "@services/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authLoginAction = async (value, dispatch) => {
  return await signInWithEmailAndPassword(auth, value.email, value.password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        const data = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          accessToken: user.stsTokenManager.accessToken,
        };
        dispatch(login(data));
        return data;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const authRegisterAction = async (value) => {
  return createUserWithEmailAndPassword(auth, value.email, value.password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const authLogoutAction = async (dispatch) => {
  await AsyncStorage.removeItem("user");
  return dispatch(logout());
};
