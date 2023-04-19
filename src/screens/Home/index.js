import ComponentAddPaquet from "@components/PaquetComponents/addPaquet";
import ModernModal from "@components/modal";
import SearchBarHome from "@components/searchBar";
import { addPaquet, editPaquet } from "@redux/reducers/paquetSlice";
import { cleanWords } from "@redux/reducers/wordsSlice";
import FormNewPaquet from "@screens/Home/formPaquet";
import Paquet from "@screens/Home/paquet";
import { COLORS } from "@utilities/contans";
import { filterPackDoc, packRef, packRefUpdate } from "@utilities/references";
import { getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.auth.user);
  const paquets = useSelector((state) => state.paquet);
  const wordsValid = useSelector((state) => state.words);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // getUser();
    if (paquets.length === 0) getPacks();
  }, [paquets]);

  useEffect(() => {
    if (wordsValid.length > 0) validWords();
  }, [wordsValid]);

  const validWords = async () => {
    let idDoc;
    let paquet;

    const filter = filterPackDoc(user.uid, wordsValid[0].idPaquet);
    const docSnap = await getDocs(filter);
    docSnap.forEach((doc) => {
      idDoc = doc.id;
      paquet = doc.data();
    });

    if (!docSnap.empty) {
      const wordsFalse = paquet.words.filter((word) => !word.pass); //Buscamos que palabras quedan todavia en False

      if (wordsFalse.length === wordsValid.length) {
        console.log("Entramos a reemplazar");
        const data = wordsValid.map(({ idPaquet, ...another }) => another); // Eliminar campo idPaquet de las palabras guardardas en Redux

        // Mezclamos las palabras que validamos en redux, con las que ya habian en la base de datos
        const wordsMix = paquet.words.reduce(
          (result, producto1) => {
            const index = data.findIndex(
              (producto2) => producto2.id === producto1.id
            );
            if (index !== -1) result.push(data[index]);
            else result.push(producto1);
            return result;
          },
          data.filter(
            (producto2) =>
              !paquet.words.find((producto1) => producto1.id === producto2.id)
          )
        );

        // Creamos un objeto que es igual a la baraja editada
        const newPaquet = { ...paquet, words: wordsMix };

        // Actualizamos la base de datos; enviando las nuevas palabras
        await updateDoc(packRefUpdate(idDoc), {
          words: wordsMix,
        });
        // Limpiamos Redux
        dispatch(cleanWords());
        // Actualizamos la baraja en Redux
        dispatch(editPaquet(newPaquet));
      }
    }
  };

  const searchMyPaquet = () => {
    return paquets.filter((obj) =>
      obj.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  // const getUser = async () => {
  //   const docSnap = await getDoc(userRef);
  //   if (docSnap.exists()) dispatch(updateUser(docSnap.data()));
  //   else console.log("No such document!");
  // };

  const getPacks = async () => {
    setLoading(true);
    const filter = query(packRef, where("userID", "==", user.uid));
    const docSnap = await getDocs(filter);
    docSnap.forEach((doc) => dispatch(addPaquet(doc.data())));
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <SearchBarHome value={search} onChange={(text) => setSearch(text)} />

      {!loading ? (
        <ScrollView contentContainerStyle={styles.containerScroll}>
          <View style={styles.containerPaquets}>
            <ComponentAddPaquet onPress={() => setModalVisible(true)} />

            {searchMyPaquet().map((paquet) => (
              <Paquet item={paquet} key={paquet.id} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator color={COLORS.BLUE} size={30} />
      )}

      <ModernModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        color={COLORS.PURPLE}
      >
        <FormNewPaquet onClose={() => setModalVisible(false)} />
      </ModernModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingTop: hp(5),
  },
  containerScroll: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerPaquets: {
    flex: 1,
    width: wp(95),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
