import React, { useState } from "react";
import { View, Image, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ProfilePicture = ({ imageSource, onChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePress = () => {
    setModalVisible(true);
  };

  const handleImageChange = () => {
    // implementa aquí la lógica para cambiar la imagen
    // onChange(newImageSource);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={{ uri: imageSource }} style={styles.image} />
        <View style={styles.editIcon}>
          <Icon name="pencil" size={16} color="#fff" />
        </View>
      </TouchableOpacity>
      <Modal animationType="fade" transparent={false} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: imageSource }} style={styles.modalImage} />
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleImageChange}
          >
            <Icon name="checkmark" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalVisible(false)}
          >
            <Icon name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignSelf: "center",
    marginVertical: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#000",
    padding: 6,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  modalImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
    borderWidth: 2,
    borderColor: "#fff",
  },
  modalButton: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 30,
    marginVertical: 20,
  },
});

export default ProfilePicture;
