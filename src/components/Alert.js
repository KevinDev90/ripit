import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Button from "./Button";

export function MinimalAlert({ message, modalVisible, onClose, button }) {
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

export function HappyAlert({ title, text, modalVisible, onClose, button }) {
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, width: wp(90) }}>
            <Text style={styles.modalText2}>{title}</Text>
            <Text style={{ fontFamily: "Inter_500Medium" }}>{text}</Text>

            <View style={styles.containerButtons2}>
              <Button
                title={button.text}
                onPress={button.press}
                color={button.color}
                ownStyle={styles.button2}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: "#fff",
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
  modalText2: {
    marginBottom: 12,
    fontSize: 20,
    textAlign: "center",
    textTransform: "capitalize",
    fontFamily: "Inter_700Bold",
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    padding: 12,
    elevation: 2,
  },
  openButtonText: {
    color: "#fff",
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
  containerButtons2: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    width: wp(22),
    borderRadius: 10,
    height: hp(4),
    elevation: 0,
  },
  button2: {
    width: wp(50),
    borderRadius: 10,
    height: hp(5),
    elevation: 0,
  },
});
