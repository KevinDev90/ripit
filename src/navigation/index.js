import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { login } from "@redux/reducers/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginNavigator } from "./login";
import { MainTabNavigator } from "./main";

export default function Navigator() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) getUser();
  }, []);

  const getUser = async () => {
    const userStorage = await AsyncStorage.getItem("user");
    if (userStorage) dispatch(login(JSON.parse(userStorage)));
  };

  return (
    <NavigationContainer>
      {token ? <MainTabNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
}
