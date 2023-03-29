import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import { collection, getDocs } from "firebase/firestore/lite";
// import { db } from "./firebaseConfig";

// async function getCities() {
//   const citiesCol = collection(db, "cities");
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map((doc) => doc.data());
//   return cityList;
// }

export default function App() {
  return (
    <View style={styles.container}>
      <Text>RIPIT</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
