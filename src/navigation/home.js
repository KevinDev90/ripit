import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chat from "@screens/Chat";
import Home from "@screens/Home";
import Profile from "@screens/Profile";
import Zone from "@screens/Zone";
import { COLORS } from "@utilities/contans";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          if (route.name === "Chat") iconName = "chatbox-outline";
          if (route.name === "Zone") iconName = "flask-outline";
          else if (route.name === "Profile") iconName = "person-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.BLUE,
        tabBarInactiveTintColor: "#8b8b8b",
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: COLORS.GREY,
          elevation: 0,
          height: hp(7),
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Zone"
        component={Zone}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
