import { HappyAlert } from "@components/Alert";
import Button from "@components/Button";
import ActionsButton from "@components/PaquetComponents/actionButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "@utilities/contans";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ActionsModal from "./actions";

function Card({ cards, card, index, item, complete }) {
  const navigation = useNavigation();
  const [modalVisibleOptions, setModalVisibleOptions] = useState(false);
  const [modalVisiblePractice, setModalVisiblePractice] = useState(false);

  const optionsButtonPractice = {
    text: "Vamos",
    color: COLORS.GREEN,
    press: () => {
      setModalVisiblePractice(false);
      navigation.navigate("Lab", { item });
    },
  };

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
      <ActionsButton
        item={item}
        icon1={<Ionicons name="options" size={18} color="#fff" />}
        onPressIcon1={() => setModalVisibleOptions(true)}
      />

      <Text style={styles.text}>{item.title}</Text>

      {!complete && (
        <Button
          title="Practicar"
          color={COLORS.GREEN}
          onPress={() => setModalVisiblePractice(true)}
          ownStyle={{ width: wp(30), height: hp(5) }}
        />
      )}

      <HappyAlert
        visible={modalVisiblePractice}
        onClose={() => setModalVisiblePractice(false)}
        title={"Estas listo?"}
        text={
          "A continuación verás una serie de frases y dentro de ellas las palabras que has decidido memorizar"
        }
        button={optionsButtonPractice}
      />

      <ActionsModal
        item={item}
        visibleOptions={modalVisibleOptions}
        setVisibleOptions={setModalVisibleOptions}
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
