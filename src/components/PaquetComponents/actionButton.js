import MinimalAlert from "@components/Alert";
import { ButtonIcon } from "@components/Button";
import ModernModal from "@components/modal";
import { MaterialIcons } from "@expo/vector-icons";
import { deletePaquet } from "@redux/reducers/paquetSlice";
import { COLORS } from "@utilities/contans";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import FormNewPaquet from "./form";

function ActionsButton({ item }) {
  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);

  const dispatch = useDispatch();

  const deleteCard = () => {
    // Fetch para borrar de la base de datos
    // devuelve las barajas que existe
    // cambio el estado con las nuevas barajas
    dispatch(deletePaquet(item.id));
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <ButtonIcon
          onPress={() => setModalVisibleEdit(true)}
          color={COLORS.GREEN}
          icon={<MaterialIcons name="edit" size={18} color="#fff" />}
        />
        <ButtonIcon
          onPress={() => setModalVisible(true)}
          color={COLORS.RED}
          icon={<MaterialIcons name="delete" size={18} color="#fff" />}
        />
      </View>
      {modalVisible && (
        <MinimalAlert
          modalVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          message={"Estas seguro de eliminar tu baraja?"}
          button={{
            text: "Eliminar",
            color: COLORS.RED,
            press: () => deleteCard(),
          }}
        />
      )}

      <ModernModal
        visible={modalVisibleEdit}
        onClose={() => setModalVisibleEdit(false)}
        // title="Nueva baraja"
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
  container: {
    flexDirection: "row",
    position: "absolute",
    top: 10,
    width: "85%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ActionsButton;
