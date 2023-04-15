import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";
import Popover from "react-native-popover-view";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

function PopoverCustom({ text, onPress, onClose, visible }) {
  return (
    <Popover
      isVisible={visible}
      onRequestClose={onClose}
      from={
        <Entypo
          onPress={onPress}
          name="info-with-circle"
          size={20}
          color="#fff"
          style={{ marginLeft: 5 }}
        />
      }
      placement="bottom"
      arrowStyle={styles.arrow}
      popoverStyle={styles.popover}
      offset={-50}
    >
      <Text style={styles.text}>{text}</Text>
    </Popover>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: "Inter_300Light",
  },
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
    width: wp(60),
  },
});

export default PopoverCustom;
