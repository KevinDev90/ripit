import Button from "@components/Button";
import ListWords from "@components/FormAddPaquet/ListWords";
import ColorPicker from "@components/FormAddPaquet/colorPicker";
import TextInputForm, { TextInputIcon } from "@components/TextInput";
import { FontAwesome } from "@expo/vector-icons";
import { addPaquet, editPaquet } from "@redux/reducers/paquetSlice";
import { COLORS, ToastAlert } from "@utilities/contans";
import { packRef, packRefUpdate } from "@utilities/references";
import { addDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";

function FormNewPaquet({ onClose, fields, edit }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const id = Math.floor(Math.random() * 100) + 1;
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(null);
  const [words, setWords] = useState([]);

  const [newInputValue, setNewInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleColorChange = (color) => setColor(color);

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

  const saveCard = async () => {
    if (title && color && words.length > 0) {
      setLoading(true);
      const data = {
        id,
        userID: user.uid,
        title,
        color,
        words,
      };

      const docRef = await addDoc(packRef, data);

      if (docRef) {
        dispatch(addPaquet(data));
        onClose();
        setLoading(false);
        ToastAlert("Baraja creada");
      }
    }
  };

  const editCard = async () => {
    if (title && color && words.length > 0) {
      setLoading(true);
      let idDoc;

      const data = {
        id: fields.id,
        userID: user.uid,
        title,
        color,
        words,
      };

      const filter = query(
        packRef,
        where("userID", "==", data.userID),
        where("id", "==", data.id)
      );
      const docSnap = await getDocs(filter);
      docSnap.forEach((doc) => (idDoc = doc.id));

      if (!docSnap.empty) await updateDoc(packRefUpdate(idDoc), data);

      dispatch(editPaquet(data));
      setLoading(false);
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
          onPress={() => saveCard()}
          ownStyle={{ width: wp(50) }}
        />
      ) : (
        <Button
          title={
            loading ? (
              <ActivityIndicator size={32} color={COLORS.BLUE} />
            ) : (
              "Editar"
            )
          }
          color={COLORS.GREEN}
          onPress={() => editCard()}
          ownStyle={{ width: wp(50) }}
        />
      )}
    </View>
  );
}

export default FormNewPaquet;
