import { updateUser } from "@redux/reducers/authSlice";
import { apiKey, urlImages } from "@services/openIAapi";
import { ToastAlert } from "@utilities/contans";
import { userRef } from "@utilities/references";
import { setDoc } from "firebase/firestore";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import FormProfile from "./form";
import SectionImage from "./sectionImage";

export default function Profile() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const user = data.user;

  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageForm, setImageForm] = useState(user.photoURL || "");

  const save = async (data) => {
    setLoading(true);
    const myData = {
      ...data,
      ...user,
      photoURL: imageForm,
    };

    await setDoc(userRef(user.uid), myData)
      .then((res) => {
        setLoading(false);
        ToastAlert("Usuario editado");
        dispatch(updateUser(myData));
      })
      .catch((err) => {
        setLoading(false);
        ToastAlert("Error al editar el usuario");
      });
  };

  const createImage = async (prompt) => {
    setLoadingImage(true);
    const response = await fetch(urlImages, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        n: 2,
        size: "1024x1024",
      }),
    });
    const data = await response.json();

    setLoadingImage(false);
    setImageForm(data.data[0].url);
  };

  return (
    <View style={styles.container}>
      <SectionImage
        createImage={(prompt) => createImage(prompt)}
        loadingImage={loadingImage}
        imageForm={imageForm}
        setImageForm={setImageForm}
      />
      <FormProfile user={user} loading={loading} save={(data) => save(data)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 40,
    paddingBottom: hp(10),
  },
});
