import { authLogoutAction } from "@redux/actions/authActions";
import { COLORS } from "@utilities/contans";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function Settings() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const user = data.user;

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "Inter_200ExtraLight",
          textTransform: "capitalize",
          fontSize: 15,
          marginBottom: 10,
        }}
      >
        {user.email}
      </Text>

      <View>
        <TouchableOpacity
          onPress={() => authLogoutAction(dispatch)}
          style={{
            backgroundColor: COLORS.RED,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            height: hp(6),
            width: wp(60),
          }}
        >
          <Text
            style={{
              color: "#FFF",
              fontSize: 18,
              fontFamily: "Inter_800ExtraBold",
            }}
          >
            Cerrar sesion
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
