import { NavigationContainer } from "@react-navigation/native";
import { login } from "@redux/reducers/authSlice";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { LoginNavigator } from "./login";
import { MainTabNavigator } from "./main";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Navigator() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    if (!token) getUser();
    else setLoading(false);
  }, [token]);

  const getUser = async () => {
    onAuthStateChanged(auth, (user) => {
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
      }
    });
    setLoading(false);

    // if (userStorage) {
    // const userStorage = await AsyncStorage.getItem("user");
    //   const userJSON = JSON.parse(userStorage);
    // console.log("🚀 ~ file: index.js:29 ~ getUser ~ userJSON:", userJSON.uid);
    // const docSnap = await getDoc(userRef(userJSON.uid));
    // const data = {
    //   ...docSnap.data(),
    //   uid: docSnap.id,
    // };
    // console.log("🚀 ~ file: index.js:34 ~ getUser ~ data:", data);
    // if (docSnap.exists())

    // const data = {
    //   uid: userJSON.uid,
    //   displayName: userJSON.providerData[0].displayName,
    //   email: userJSON.providerData[0].email,
    //   phoneNumber: userJSON.providerData[0].phoneNumber,
    //   photoURL: userJSON.providerData[0].photoURL,
    //   accessToken: userJSON.stsTokenManager.accessToken,
    // };

    // dispatch(login(data));
    // }
  };

  if (loading) return;

  return (
    <>
      <NavigationContainer>
        {token ? <MainTabNavigator /> : <LoginNavigator />}
      </NavigationContainer>
      <Toast />
    </>
  );
}
