import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chat from "@screens/Chat";
import Home from "@screens/Home";
import Profile from "@screens/Profile";
import Zone from "@screens/Zone";
import { COLORS } from "@utilities/contans";
import { StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  const renderIconTab = (iconName, size, color) => (
    <View style={{ ...styles.containerIcons, backgroundColor: color }}>
      <Ionicons name={iconName} size={size} color={"#fff"} />
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          if (route.name === "Chat") iconName = "chatbox-outline";
          if (route.name === "Zone") iconName = "flask-outline";
          else if (route.name === "Profile") iconName = "person-outline";

          return renderIconTab(iconName, size, color);
        },
        tabBarActiveTintColor: COLORS.BLUE,
        tabBarInactiveTintColor: COLORS.GREEN,
        tabBarShowLabel: false,
        tabBarStyle: styles.containerTab,
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

const styles = StyleSheet.create({
  containerIcons: {
    width: wp(12),
    height: hp(6),
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTab: {
    elevation: 0,
    height: hp(8),
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 5,
    borderTopWidth: 0,
  },
});
