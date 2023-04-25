import { updateUser } from "@redux/reducers/authSlice";
import { ToastAlert } from "@utilities/contans";
import { userRef } from "@utilities/references";
import { fetchCreateImages } from "@utilities/urlsOpenAI";
import { setDoc } from "firebase/firestore";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
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
      username: data.username,
      bio: data.bio,
      email: data.email,
      level: data.level,
      photoURL: imageForm,
      accessToken: user.accessToken,
      uid: user.uid,
    };

    await setDoc(userRef(user.uid), myData)
      .then(() => {
        setLoading(false);
        ToastAlert("Usuario editado");
        dispatch(updateUser(myData));
      })
      .catch(() => {
        setLoading(false);
        ToastAlert("Error al editar el usuario");
      });
  };

  const createImage = async (prompt) => {
    setLoadingImage(true);

    const uriImage = await fetchCreateImages(prompt);
    setLoadingImage(false);
    setImageForm(uriImage);
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
