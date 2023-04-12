import { ButtonIcon } from "@components/Button";
import { COLORS } from "@utilities/contans";
import { StyleSheet, View } from "react-native";

function ActionsButton({
  icon1,
  onPressIcon1,
  icon2,
  onPressIcon2,
  icon3,
  onPressIcon3,
  icon4,
  onPressIcon4,
}) {
  return (
    <>
      <View style={{ ...styles.container, top: 10 }}>
        {icon1 && (
          <ButtonIcon
            onPress={onPressIcon1}
            color={COLORS.GREEN}
            icon={icon1}
          />
        )}

        {icon2 && (
          <ButtonIcon onPress={onPressIcon2} color={COLORS.RED} icon={icon2} />
        )}
      </View>

      <View style={{ ...styles.container, bottom: 10 }}>
        {icon3 && (
          <ButtonIcon onPress={onPressIcon3} color={COLORS.BLUE} icon={icon3} />
        )}
        {icon4 && (
          <ButtonIcon
            onPress={onPressIcon4}
            color={COLORS.GREEN}
            icon={icon3}
          />
        )}
      </View>
    </>
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
