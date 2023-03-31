import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

function Button({ onPress, title, color }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.buttonContainer, backgroundColor: color }}>
        <Text style={styles.buttonTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    height: hp(6),
    width: wp(80),
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  },
  buttonTitle: {
    fontFamily: "Inter_800ExtraBold",
    color: "#fff",
    fontSize: 16,
  },
});

export default Button;
