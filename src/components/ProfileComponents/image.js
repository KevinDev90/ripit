import { COLORS } from "@utilities/contans";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ProfilePicture = ({ imageSource, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={
            typeof imageSource === "string" ? { uri: imageSource } : imageSource
          }
          style={styles.image}
        />
        <View style={styles.editIcon}>
          <Icon name="pencil" size={16} color="#fff" />
        </View>
      </TouchableOpacity>
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
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#fff",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.GREEN,
    padding: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

export default ProfilePicture;
