import ProfilePicture from "@components/ProfileComponents/image";
import { db } from "@services/firebaseConfig";
import { COLORS } from "@utilities/contans";
import { doc, setDoc } from "firebase/firestore/lite";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";

import NoImage from "@assets/img/no-photo-available.png";
import { ButtonLogout } from "@components/ProfileComponents/button";
import { InputCustom } from "@components/ProfileComponents/input";
import ModalCamera from "@components/ProfileComponents/modalCamera";
import { pickImage, takePhoto } from "@utilities/expoUtility";

export default function Profile() {
  const data = useSelector((state) => state.auth);
  const user = data.user;
  const userDocRef = doc(db, "users", user.uid);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [imageForm, setImageForm] = useState(user.photoURL);

  const [modalVisible, setModalVisible] = useState(false);

  const updateUser = () => {
    const data = {};

    setDoc(userDocRef, data);
  };

  const image = async () => {
    await pickImage().then((res) => {
      setImageForm(res[0].uri);
      setModalVisible(false);
    });
  };

  const photo = async () => {
    await takePhoto().then((res) => {
      setImageForm(res.uri);
      setModalVisible(false);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text}>Editar Perfil</Text>

        <ProfilePicture
          imageSource={imageForm || NoImage}
          onPress={() => setModalVisible(true)}
        />

        <ModalCamera
          modalVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          image={() => image()}
          photo={() => photo()}
        />
      </View>

      <InputCustom
        title={"Nombre"}
        value={username}
        onChangeText={(v) => setUsername(v)}
      />

      <InputCustom
        title={"Email"}
        value={email}
        onChangeText={(v) => setEmail(v)}
      />

      <InputCustom
        title={"Biografia"}
        value={bio}
        onChangeText={(v) => setBio(v)}
      />

      <ButtonLogout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 40,
  },
  section: {
    width: wp(100),
    backgroundColor: COLORS.PURPLE,
    height: hp(35),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "Inter_900Black",
  },
});
