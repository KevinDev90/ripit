import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { login } from "@redux/reducers/authSlice";
import { userRef } from "@utilities/references";
import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { LoginNavigator } from "./login";
import { MainTabNavigator } from "./main";

export default function Navigator() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) getUser();
  }, [token]);

  const getUser = async () => {
    const userStorage = await AsyncStorage.getItem("user");
    if (userStorage) {
      const userJSON = JSON.parse(userStorage);
      const docSnap = await getDoc(userRef(userJSON.uid));

      const data = {
        ...docSnap.data(),
        uid: docSnap.id,
      };

      if (docSnap.exists()) dispatch(login(data));
      else console.log("No such document!");
    }
    setLoading(false);
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
