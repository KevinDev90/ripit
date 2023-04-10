import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { login } from "@redux/reducers/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginNavigator } from "./login";
import { MainTabNavigator } from "./main";
import { scheduleHourlyNotification } from "@utilities/expoUtility";

export default function Navigator() {
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    // if (user && user.hours)
    //   user.hours.map((e) => scheduleHourlyNotification(e));

    if (!token) getUser();
  }, [user, token]);

  const getUser = async () => {
    const userStorage = await AsyncStorage.getItem("user");
    if (userStorage) {
      dispatch(login(JSON.parse(userStorage)));
      setLoading(false);
    }
  };

  if (loading) return;

  return (
    <NavigationContainer>
      {token ? <MainTabNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
}
