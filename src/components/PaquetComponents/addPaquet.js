import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@utilities/contans";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

function ComponentAddPaquet({ onPress }) {
  return (
    <View style={styles.deckContainer}>
      <View style={styles.newContainer}>
        <TouchableOpacity onPress={onPress} style={{ alignItems: "center" }}>
          <Ionicons name="add" size={30} color={COLORS.GREYBLACK} />
          <Text style={styles.text}>Nueva Baraja</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  deckContainer: {
    flex: 1,
    width: wp(45),
    minWidth: wp(35),
    height: hp(30),
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 10,
    padding: 10,
    position: "relative",
  },
  newContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.GREYBLACK,
  },
  text: {
    color: COLORS.GREYBLACK,
    fontFamily: "Inter_600SemiBold",
  },
});
export default ComponentAddPaquet;
