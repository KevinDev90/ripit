import { Ionicons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const ModernModal = ({ modalVisible, onClose, title, children, color }) => {
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={{ ...styles.headerContainer, backgroundColor: color }}>
            <Text style={styles.headerText}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-outline" color="#fff" size={24} />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    width: wp(90),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(3),
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Inter_900Black",
    color: "#FFF",
  },
});

export default ModernModal;
