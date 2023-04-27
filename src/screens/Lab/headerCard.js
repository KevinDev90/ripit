import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "@utilities/contans";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function HeaderCard({ visible, unSeen, speach }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={unSeen}>
        <FontAwesome
          name={visible ? "eye-slash" : "eye"}
          size={36}
          color={COLORS.BLUE}
        />
      </TouchableOpacity>

      <View style={{ width: "60%" }}>
        <Text style={styles.text}>
          First <Text style={styles.text2}>Listen</Text>{" "}
          <FontAwesome name="volume-up" size={14} color={COLORS.BLUE} />
          {" \n"}
          Then <Text style={styles.text2}>Read</Text>{" "}
          <FontAwesome name="eye" size={14} color={COLORS.BLUE} />
        </Text>
      </View>

      <TouchableOpacity onPress={speach}>
        <FontAwesome name="volume-up" size={36} color={COLORS.BLUE} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(90),
    height: hp(10),
    padding: 15,
  },
  text: {
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 14,
  },
  text2: {
    fontWeight: "500",
    fontStyle: "italic",
  },
});

export default HeaderCard;
