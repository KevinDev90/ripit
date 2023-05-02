import { MaterialIcons } from "@expo/vector-icons";
import { addNote } from "@redux/reducers/notesSlice";
import { SectionHelpNotes } from "@screens/Home/help";
import { COLORS, ToastAlert } from "@utilities/contans";
import { filterNoteDoc, noteRef, noteRefUpdate } from "@utilities/references";
import { addDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";

export default function NoteScreen() {
  const dispatch = useDispatch();

  const id = Math.floor(Math.random() * 10000) + 1;
  const user = useSelector((state) => state.auth.user);
  const notes = useSelector((state) => state.notes);

  const [noteText, setNoteText] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loadingNotes, setLoadingNotes] = useState(false);

  useEffect(() => {
    if (!notes.note) getNotes();
    else setNoteText(notes.note);
  }, [notes]);

  const saveNote = async () => {
    if (noteText) {
      setLoading(true);

      let idDoc;

      const data = {
        id: notes.id ?? id,
        userID: user.uid,
        note: noteText,
      };

      const filter = filterNoteDoc(data.userID, data.id);
      const docSnap = await getDocs(filter);
      docSnap.forEach((doc) => (idDoc = doc.id));

      if (!docSnap.empty) await updateDoc(noteRefUpdate(idDoc), data);
      else await addDoc(noteRef, data);

      dispatch(addNote(data));
      setLoading(false);
      ToastAlert("Guardado");
    }
  };

  const getNotes = async () => {
    setLoadingNotes(true);
    const filter = query(noteRef, where("userID", "==", user.uid));
    const docSnap = await getDocs(filter);
    docSnap.forEach((doc) => {
      dispatch(addNote(doc.data()));
    });
    setLoadingNotes(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={{ fontSize: 17, fontFamily: "Inter_400Regular" }}>
          Toma nota de lo que has aprendido...
        </Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => saveNote()}>
            {loading ? (
              <ActivityIndicator size={22} color="#fff" />
            ) : (
              <MaterialIcons name="save-alt" size={22} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {!loadingNotes ? (
        <ScrollView>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={10}
            placeholder="Take a note..."
            value={noteText}
            onChangeText={setNoteText}
          />
        </ScrollView>
      ) : (
        <View>
          <ActivityIndicator color={COLORS.BLUE} size={30} />
        </View>
      )}

      <SectionHelpNotes visible={visible} setVisible={setVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter_300Light",
    textAlignVertical: "top",
  },
  containerTitle: {
    backgroundColor: COLORS.GREY,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    margin: 5,
    marginBottom: hp(2),
  },
  button: {
    borderRadius: 10,
    backgroundColor: COLORS.GREEN,
    padding: 6,
  },
});
