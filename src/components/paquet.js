import { COLORS } from "@utilities/contans";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Button from "./Button";

function Paquet({ item }) {
  const cards = [
    { id: 1, color: item.color || COLORS.PURPLE },
    { id: 2, color: COLORS.BLUE },
    { id: 3, color: COLORS.GREEN },
  ];

  return (
    <View style={styles.deckContainer}>
      {cards.map((card, index) => (
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
          <Text style={styles.text}>{item.title}</Text>
          <Button
            title="Practicar"
            color={COLORS.GREEN}
            onPress={() => {}}
            ownStyle={{ width: wp(30), height: hp(5) }}
          />
        </View>
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

export default Paquet;
