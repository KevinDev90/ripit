import Button from "@components/Button";
import { COLORS } from "@utilities/contans";
import { StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ActionsButton from "./actionButton";

function Card({ cards, card, index, item }) {
  return (
    <View
      key={card.id}
      style={[
        styles.card,
        {
          zIndex: cards.length - index,
          marginLeft: index * 6,
          backgroundColor: card.color,
        },
      ]}
    >
      <ActionsButton item={item} />
      <Text style={styles.text}>{item.title}</Text>
      <Button
        title="Practicar"
        color={COLORS.GREEN}
        onPress={() => {}}
        ownStyle={{ width: wp(30), height: hp(5) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    top: 0,
    left: 0,
    width: wp(38),
    height: hp(30),
    borderRadius: 10,
    borderRightWidth: 0.5,
    borderColor: COLORS.GREYBLACK,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 8,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
    fontFamily: "Inter_800ExtraBold",
    textTransform: "uppercase",
  },
});

export default Card;
