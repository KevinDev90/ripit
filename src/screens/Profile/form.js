import { HappyAlert } from "@components/Alert";
import Button from "@components/Button";
import { InputCustom, InputPicker } from "@components/ProfileComponents/input";
import { Picker } from "@react-native-picker/picker";
import { authLogoutAction } from "@redux/actions/authActions";
import { auth } from "@services/firebaseConfig";
import { COLORS } from "@utilities/contans";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";

function FormProfile({ user, loading, save }) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");
  const [level, setLevel] = useState(user.level || "basico");

  const [modalVisibleLogout, setModalVisibleLogout] = useState(false);

  const logoutButton = () => {
    setModalVisibleLogout(false);
    authLogoutAction(dispatch);

    // signOut(auth)
    //   .then(() => {
    //     authLogoutAction(dispatch);
    //   })
    //   .catch((error) => {
    //     // An error happened.
    //   });
  };

  const saveButton = () => {
    const data = {
      username,
      email,
      bio,
      level,
    };
    if (email) save(data);
  };

  return (
    <>
      <ScrollView
        style={{
          width: wp(90),
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(15) }}
      >
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
          numberOfLines={3}
          multiline={true}
        />

        <InputPicker
          title={"Nivel de ingles"}
          value={level}
          onChange={(v) => setLevel(v)}
        >
          <Picker.Item label="Basico" value="basico" />
          <Picker.Item label="Intermedio" value="intermedio" />
          <Picker.Item label="Avanzado" value="avanzado" />
        </InputPicker>

        <View
          style={{
            marginTop: hp(8),
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            title={
              loading ? (
                <ActivityIndicator color={"#fff"} size={22} />
              ) : (
                "Guardar"
              )
            }
            color={COLORS.BLUE}
            ownStyle={styles.button}
            onPress={() => saveButton()}
          />
          <Button
            title={"Cerrar sesion"}
            color={COLORS.RED}
            ownStyle={styles.button}
            onPress={() => setModalVisibleLogout(true)}
          />
        </View>
      </ScrollView>
      <HappyAlert
        visible={modalVisibleLogout}
        onClose={() => setModalVisibleLogout(false)}
        title={"Saliendo..."}
        text={"Seguro quieres salir?"}
        button={{
          text: "SI",
          press: () => logoutButton(),
          color: COLORS.RED,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: wp(40),
    borderRadius: 10,
    elevation: 0,
  },
});

export default FormProfile;
