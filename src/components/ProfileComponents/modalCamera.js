import ModernModal from "@components/modal";
import { COLORS } from "@utilities/contans";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

function ModalCamera({ modalVisible, onClose, image, photo }) {
  return (
    <ModernModal
      visible={modalVisible}
      onClose={onClose}
      color={COLORS.GREEN}
      title={"Cambia tu foto de perfil"}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={image}
          style={{ ...styles.button, backgroundColor: COLORS.BLUE }}
        >
          <Text style={styles.text}>Desde tu galeria</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={photo}
          style={{ ...styles.button, backgroundColor: COLORS.PURPLE }}
        >
          <Text style={styles.text}>Toma una foto</Text>
        </TouchableOpacity>
      </View>
    </ModernModal>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(4),
  },
  button: {
    width: "50%",
    height: hp(4),
    borderRadius: 10,
    marginTop: hp(1),
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Inter_800ExtraBold",
  },
});
export default ModalCamera;
