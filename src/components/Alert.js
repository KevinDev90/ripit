import { COLORS } from "@utilities/contans";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./Button";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function MinimalAlert({
  message,
  modalVisible,
  onClose,
  onPressAction,
  button,
}) {
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <View style={styles.containerButtons}>
              <Button
                title={button.text}
                onPress={button.press}
                color={button.color}
                ownStyle={styles.button}
              />
              <TouchableOpacity style={{ marginTop: 12 }} onPress={onClose}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    marginBottom: 12,
    fontSize: 18,
    textAlign: "center",
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    padding: 12,
    elevation: 2,
  },
  openButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButtonText: {
    color: "#2196F3",
    fontSize: 15,
    fontFamily: "Inter_400Regular",
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(40),
  },
  button: {
    width: wp(22),
    borderRadius: 10,
    height: hp(4),
    elevation: 0,
  },
});
