import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "@redux/reducers/authSlice";
import { auth } from "@services/firebaseConfig";
import { ToastAlert } from "@utilities/contans";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const authLoginAction = async (value, dispatch) => {
  return await signInWithEmailAndPassword(auth, value.email, value.password)
    .then((userCredential) => {
      const user = userCredential.user;
      AsyncStorage.setItem("user", JSON.stringify(user));

      if (user.emailVerified) {
        const data = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          accessToken: user.stsTokenManager.accessToken,
        };
        return data;
      } else {
        sendEmailVerification(auth.currentUser).then(() => {
          return ToastAlert("Verifica tu correo para iniciar sesion", true);
        });
      }
    })
    .catch((error) => {
      return { messageError: error };
    });
};

export const authRegisterAction = async (value) => {
  return createUserWithEmailAndPassword(auth, value.email, value.password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      return error;
    });
};

export const authRecoverPasswordAction = async (value) => {
  return sendPasswordResetEmail(auth, value)
    .then(() => {
      return ToastAlert("Se te envio un correo de confirmación");
    })
    .catch((error) => {
      const errorMessage = error.message;
      return { messageError: errorMessage };
    });
};

export const authLogoutAction = async (dispatch) => {
  await AsyncStorage.removeItem("user");
  return dispatch(logout());
};
