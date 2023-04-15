import Button, { ButtonIcon } from "@components/Button";
import ModalBlur from "@components/ModalBlur";
import FormNewPaquet from "@components/PaquetComponents/form";
import ModernModal from "@components/modal";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { deletePaquet } from "@redux/reducers/paquetSlice";
import { COLORS } from "@utilities/contans";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";

function ActionsModal({ visibleOptions, setVisibleOptions, item }) {
  const dispatch = useDispatch();

  const [modalVisibleDelete, setModalVisibleDelete] = useState(false);
  const [modalVisibleView, setModalVisibleView] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);

  const deleteCard = () => {
    // Fetch para borrar de la base de datos
    // devuelve las barajas que existe
    // cambio el estado con las nuevas barajas
    dispatch(deletePaquet(item.id));
    setModalVisibleDelete(false);
  };

  return (
    <>
      <ModalBlur
        visible={visibleOptions}
        onClose={() => {
          setVisibleOptions(false);
          setModalVisibleDelete(false);
          setModalVisibleView(false);
        }}
      >
        <View style={styles.modalContent}>
          <ButtonIcon
            onPress={() => {
              setVisibleOptions(false);
              setModalVisibleDelete(false);
              setModalVisibleView(false);
              setModalVisibleEdit(true);
            }}
            ownStyle={styles.icon}
            color={COLORS.GREEN}
            icon={<MaterialIcons name="edit" size={26} color="#fff" />}
          />
          <ButtonIcon
            onPress={() => {
              setModalVisibleView(false);
              setModalVisibleDelete(true);
            }}
            color={COLORS.RED}
            ownStyle={styles.icon}
            icon={<MaterialIcons name="delete" size={26} color="#fff" />}
          />
          <ButtonIcon
            onPress={() => {
              setModalVisibleDelete(false);
              setModalVisibleView(true);
            }}
            color={COLORS.BLUE}
            ownStyle={styles.icon}
            icon={<Entypo name="eye" size={26} color="#fff" />}
          />
        </View>

        {modalVisibleDelete && (
          <View style={{ marginTop: hp(2) }}>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 17,
              }}
            >
              Quieres eliminar tu baraja?
            </Text>
            <Button
              title={"Eliminar"}
              onPress={() => deleteCard()}
              color={COLORS.RED}
              ownStyle={styles.button}
            />
          </View>
        )}

        {modalVisibleView && (
          <View style={{ marginTop: hp(2) }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Inter_600SemiBold",
              }}
            >
              Tus Palabras
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                textAlign: "center",
                marginTop: hp(1),
              }}
            >
              {item.words.map((e, i) => `${i + 1}. ${e.word} \n`)}
            </Text>
          </View>
        )}
      </ModalBlur>
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
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: wp(12),
    height: hp(6),
    // borderRadius: 10,
  },
  button: {
    width: wp(40),
    borderRadius: 10,
    height: hp(5),
    elevation: 0,
    marginTop: hp(1),
  },
  modalContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});

export default ActionsModal;
