import Button from "@components/Button";
import TextInputForm, { TextInputIcon } from "@components/TextInput";
import { FontAwesome } from "@expo/vector-icons";
import { addPaquet, editPaquet } from "@redux/reducers/paquetSlice";
import { db } from "@services/firebaseConfig";
import { COLORS, ToastAlert } from "@utilities/contans";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import ListWords from "../FormAddPaquet/ListWords";
import ColorPicker from "../FormAddPaquet/colorPicker";

function FormNewPaquet({ onClose, fields, edit }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const packDocRef = doc(db, "pack", user.uid);

  const id = Math.floor(Math.random() * 100) + 1;
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(null);
  const [words, setWords] = useState([]);

  const [newInputValue, setNewInputValue] = useState("");

  const handleColorChange = (color) => setColor(color);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (edit) fillFields();
  }, [edit]);

  const fillFields = () => {
    setTitle(fields.title);
    setColor(fields.color);
    setWords(fields.words);
  };

  const handleAddInput = () => {
    const word = {
      id: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
      word: newInputValue,
      pass: false,
    };
    setWords([...words, word]);
    setNewInputValue("");
  };

  const save = async () => {
    if (title && color && words.length > 0) {
      setLoading(true);
      const data = {
        id,
        userID: user.uid,
        title,
        color,
        words,
      };

      // const docRef = await addDoc(collection(db, "pack"), data);

      // if (docRef) {
      //   console.log("IDDD", docRef.id);
      //   dispatch(addPaquet(data));
      //   onClose();
      //   setLoading(false);
      //   ToastAlert("Usuario editado");
      // }

      // await setDoc(packDocRef, data)
      //   .then((res) => {
      //     setLoading(false);
      //     ToastAlert("Usuario editado");
      //     dispatch(addPaquet(data));
      //     onClose();
      //   })
      //   .catch((err) => {
      //     setLoading(false);
      //     ToastAlert("Error al editar el usuario");
      //   });
    }
  };

  const editCard = async () => {
    if (title && color && words.length > 0) {
      const data = {
        id: fields.id,
        title,
        color,
        words,
      };

      // await updateDoc(packDocRef, {
      //   capital: true
      // });

      dispatch(editPaquet(data));
      onClose();
    }
  };

  return (
    <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
      <Text style={{ fontFamily: "Inter_200ExtraLight", marginBottom: 10 }}>
        Ponle un titulo:
      </Text>

      <TextInputForm
        title="Titulo"
        value={title}
        changeText={(v) => setTitle(v)}
      />
      <ColorPicker onColorChange={handleColorChange} />

      <Text style={{ fontFamily: "Inter_200ExtraLight", marginTop: 15 }}>
        Agrega tus palabras:
      </Text>

      <View
        style={{
          marginTop: 10,
        }}
      >
        <TextInputIcon
          title="Palabra"
          value={newInputValue}
          changeText={(v) => setNewInputValue(v)}
          icon={<FontAwesome name="send" size={22} color={COLORS.GREYBLACK} />}
          onPress={() => handleAddInput()}
        />
      </View>

      <ListWords words={words} />

      {!edit ? (
        <Button
          title={
            loading ? (
              <ActivityIndicator size={32} color={COLORS.BLUE} />
            ) : (
              "Guardar"
            )
          }
          color={COLORS.GREEN}
          onPress={() => save()}
          ownStyle={{ width: wp(50) }}
        />
      ) : (
        <Button
          title={"Editar"}
          color={COLORS.GREEN}
          onPress={() => editCard()}
          ownStyle={{ width: wp(50) }}
        />
      )}
    </View>
  );
}

export default FormNewPaquet;
