import ProfilePicture from "@components/ProfileComponents/image";
import { authLogoutAction } from "@redux/actions/authActions";
import { db } from "@services/firebaseConfig";
import { COLORS } from "@utilities/contans";
import { doc, setDoc } from "firebase/firestore/lite";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const user = data.user;

  const userDocRef = doc(db, "users", user.uid);

  const updateUser = () => {
    const data = {};

    setDoc(userDocRef, data);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: wp(100),
          backgroundColor: COLORS.PURPLE,
          height: hp(40),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{ color: "#fff", fontSize: 22, fontFamily: "Inter_900Black" }}
        >
          Editar Perfil
        </Text>
        <ProfilePicture
          imageSource={
            "https://lh3.googleusercontent.com/StND2cg3sSbR6l-AHr3VdxKziIhEP4kYHQiTppD-aKc6gwn7PVdht1YqzjWSmwf5JLWf=w200-rwa"
          }
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => authLogoutAction(dispatch)}
          style={{
            backgroundColor: COLORS.RED,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            height: hp(6),
            width: wp(60),
          }}
        >
          <Text
            style={{
              color: "#FFF",
              fontSize: 18,
              fontFamily: "Inter_800ExtraBold",
            }}
          >
            Cerrar sesion
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    // paddingBottom: 100,
    paddingVertical: 40,
  },
});
