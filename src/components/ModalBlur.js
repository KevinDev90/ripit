import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

function ModalBlur({ visible, onClose, children, ownStyles }) {
  return (
    <Modal
      isVisible={visible}
      animationIn={"bounceIn"}
      animationOut={"bounceOut"}
      onBackdropPress={onClose}
      backdropOpacity={0.2}
      style={{ alignItems: "center" }}
    >
      <View style={{ ...styles.modalContainer, ...ownStyles }}>{children}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: wp(70),
    // height: hp(30),
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ModalBlur;
