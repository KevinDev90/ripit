import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

function MyNotes() {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "Inter_300Light" }}>
        Aqui podrás anotar todo lo que has aprendido
      </Text>
      <Text style={{ fontFamily: "Inter_600SemiBold" }}>Comming soon...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: hp(1),
  },
});
export default MyNotes;
