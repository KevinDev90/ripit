import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "@screens/Home";
import Lab from "@screens/Lab";
import Login from "@screens/Login";
import Register from "@screens/Register";
import Settings from "@screens/Settings";
import { COLORS } from "@utilities/contans";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigator() {
  const token = useSelector((state) => state.user.token);
  return (
    <NavigationContainer>
      {!token ? <MainTabNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
}

const LoginNavigator = () => (
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

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Settings") iconName = "person-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.BLUE,
        tabBarInactiveTintColor: "#8b8b8b",
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: COLORS.GREY,
          elevation: 0,
          height: heightPercentageToDP(7),
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const MainTabNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeTabs"
      component={HomeTabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Lab" component={Lab} options={{ headerShown: false }} />
  </Stack.Navigator>
);
