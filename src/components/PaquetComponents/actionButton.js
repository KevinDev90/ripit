import MinimalAlert from "@components/Alert";
import { ButtonIcon } from "@components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@utilities/contans";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

function ActionsButton({ item }) {
  const [modalVisible, setModalVisible] = useState(false);

  const deleteCard = () => {
    // Fetch para borrar de la base de datos
    // devuelve las barajas que existe
    // cambio el estado con las nuevas barajas
    console.log(item.id);
  };

  return (
    <>
      <View style={styles.container}>
        <ButtonIcon
          onPress={() => {}}
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
