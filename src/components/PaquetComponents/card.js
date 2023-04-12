import HappyAlert from "@components/Alert2";
import Button from "@components/Button";
import ModernModal from "@components/modal";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { deletePaquet } from "@redux/reducers/paquetSlice";
import { COLORS } from "@utilities/contans";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import ActionsButton from "./actionButton";
import FormNewPaquet from "./form";
import MinimalAlert from "@components/Alert";

function Card({ cards, card, index, item }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [modalVisiblePractice, setModalVisiblePractice] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [modalVisibleDelete, setModalVisibleDelete] = useState(false);
  const [modalVisibleView, setModalVisibleView] = useState(false);

  const deleteCard = () => {
    // Fetch para borrar de la base de datos
    // devuelve las barajas que existe
    // cambio el estado con las nuevas barajas
    dispatch(deletePaquet(item.id));
    setModalVisibleDelete(false);
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
        icon1={<MaterialIcons name="edit" size={18} color="#fff" />}
        onPressIcon1={() => setModalVisibleEdit(true)}
        icon2={<MaterialIcons name="delete" size={18} color="#fff" />}
        onPressIcon2={() => setModalVisibleDelete(true)}
        icon3={<Entypo name="eye" size={18} color="#fff" />}
        onPressIcon3={() => setModalVisibleView(true)}
      />

      <Text style={styles.text}>{item.title}</Text>

      <Button
        title="Practicar"
        color={COLORS.GREEN}
        onPress={() => setModalVisiblePractice(true)}
        ownStyle={{ width: wp(30), height: hp(5) }}
      />

      {modalVisiblePractice && (
        <HappyAlert
          modalVisible={modalVisiblePractice}
          onClose={() => setModalVisiblePractice(false)}
          message={"Estas listo?"}
          button={{
            text: "Vamos",
            color: COLORS.GREEN,
            press: () => {
              setModalVisiblePractice(false);
              navigation.navigate("Lab", { item });
            },
          }}
        />
      )}

      {modalVisibleDelete && (
        <MinimalAlert
          modalVisible={modalVisibleDelete}
          onClose={() => setModalVisibleDelete(false)}
          message={"Estas seguro de eliminar tu baraja?"}
          button={{
            text: "Eliminar",
            color: COLORS.RED,
            press: () => deleteCard(),
          }}
        />
      )}

      {modalVisibleView && (
        <MinimalAlert
          modalVisible={modalVisibleView}
          onClose={() => setModalVisibleView(false)}
          message={item.words.map((e, i) => `${i + 1}. ${e.word} \n`)}
          button={{
            text: "Listo",
            color: COLORS.BLUE,
            press: () => setModalVisibleView(false),
          }}
        />
      )}

      <ModernModal
        visible={modalVisibleEdit}
        onClose={() => setModalVisibleEdit(false)}
        color={COLORS.PURPLE}
      >
        <FormNewPaquet
          onClose={() => setModalVisibleEdit(false)}
          edit={true}
          fields={item}
        />
      </ModernModal>
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
