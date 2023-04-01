import { COLORS } from "@utilities/contans";
import { StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Card from "./card";

function Paquet({ item }) {
  const cards = [
    { id: 1, color: item.color || COLORS.PURPLE },
    { id: 2, color: COLORS.BLUE },
    { id: 3, color: COLORS.GREEN },
  ];

  return (
    <View style={styles.deckContainer}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          cards={cards}
          card={card}
          item={item}
          index={index}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  deckContainer: {
    flex: 1,
    width: wp(45),
    minWidth: wp(35),
    height: hp(30),
    borderRadius: 10,
    // backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: "#ccc",
    marginVertical: 15,
    marginHorizontal: 10,
    padding: 10,
    position: "relative",
  },
});

export default Paquet;
