import { createStackNavigator } from "@react-navigation/stack";
import Login from "@screens/Login";
import Register from "@screens/Register";

const Stack = createStackNavigator();

export const LoginNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerMode: false,
    }}
  >
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="register" component={Register} />
  </Stack.Navigator>
);
