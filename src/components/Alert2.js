import { Modal, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Button from "./Button";

export default function HappyAlert({
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
            <Text style={{ fontFamily: "Inter_500Medium" }}>
              A continuacion veras una serie de frases y dentro de ellas las
              palabras que has decidido memorizar
            </Text>

            <View style={styles.containerButtons}>
              <Button
                title={button.text}
                onPress={button.press}
                color={button.color}
                ownStyle={styles.button}
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
    borderRadius: 10,
    width: wp(90),

    padding: 24,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    marginBottom: 12,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Inter_700Bold",
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
    justifyContent: "center",
    width: wp(40),
  },
  button: {
    width: wp(50),
    borderRadius: 10,
    height: hp(5),
    elevation: 0,
  },
});