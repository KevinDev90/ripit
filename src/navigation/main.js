import Lab from "@screens/Lab";
import { HomeTabs } from "./home";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const MainTabNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeTabs"
      component={HomeTabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Lab" component={Lab} options={{ headerShown: false }} />
  </Stack.Navigator>
);
