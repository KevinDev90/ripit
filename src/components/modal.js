import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { COLORS } from "@utilities/contans";

const ModernModal = ({ visible, onClose, title, children }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-outline" color="black" size={24} />
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
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: wp(80),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(3),
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    color: "#000",
  },
});

export default ModernModal;
