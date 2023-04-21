import { Entypo } from "@expo/vector-icons";
import { COLORS } from "@utilities/contans";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Popover from "react-native-popover-view";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

function PopoverCustom({ text, onPress, onClose, visible }) {
  return (
    <Popover
      isVisible={visible}
      onRequestClose={onClose}
      from={
        <TouchableOpacity onPress={onPress}>
          <Entypo
            name="info-with-circle"
            size={36}
            color={COLORS.BLUE}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      }
      placement="top"
      arrowStyle={styles.arrow}
      popoverStyle={styles.popover}
      offset={50}
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
});

export default PopoverCustom;
