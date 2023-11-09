import { FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "@utilities/contans";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Popover from "react-native-popover-view";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

function PopoverCustom({ text, onPress, onClose, visible }) {
  return (
    <Popover
      isVisible={visible}
      onRequestClose={onClose}
      from={
        <TouchableOpacity onPress={onPress} style={styles.icon}>
          <FontAwesome5 name="info" size={22} color={"#fff"} />
        </TouchableOpacity>
      }
      placement="top"
      arrowStyle={styles.arrow}
      popoverStyle={styles.popover}
      offset={hp(1)}
    >
      <Text>{text}</Text>
    </Popover>
  );
}

const styles = StyleSheet.create({
  arrow: {
    borderTopColor: "#fff",
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderRightColor: "transparent",
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
  },
  popover: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    width: wp(90),
  },
  icon: {
    width: wp(10),
    height: hp(5),
    backgroundColor: COLORS.BLUE,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PopoverCustom;
