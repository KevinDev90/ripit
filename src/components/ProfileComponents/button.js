import { authLogoutAction } from "@redux/actions/authActions";
import { COLORS } from "@utilities/contans";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";

export function ButtonLogout() {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => authLogoutAction(dispatch)}
        style={styles.button}
      >
        <Text style={styles.text}>Cerrar sesion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
  },
  button: {
    backgroundColor: COLORS.RED,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: hp(5),
    width: wp(50),
  },
  text: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Inter_800ExtraBold",
  },
});
