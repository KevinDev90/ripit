import { ButtonIcon } from "@components/Button";
import { COLORS } from "@utilities/contans";
import { StyleSheet, View } from "react-native";

function ActionsButton({ icon1, onPressIcon1 }) {
  return (
    <View style={{ ...styles.container, top: 10 }}>
      <ButtonIcon onPress={onPressIcon1} color={COLORS.BLUE} icon={icon1} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    width: "85%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ActionsButton;
