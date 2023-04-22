import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import Navigator from "@navigation";
import store from "@redux/store";
import { Video } from "expo-av";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";

import Splash from "@assets/video/splash.mp4";

export default function App() {
  const [splashing, setSplashing] = useState(true);

  useEffect(() => {
    setTimeout(() => setSplashing(false), 2000);
  }, []);

  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) return null;

  return !splashing ? (
    <Provider store={store}>
      <Navigator />
    </Provider>
  ) : (
    <View style={styles.container}>
      <Video
        source={Splash}
        style={styles.video}
        resizeMode="cover"
        shouldPlay={true}
        isLooping={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
