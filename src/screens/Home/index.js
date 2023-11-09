import ComponentAddPaquet from "@components/PaquetComponents/addPaquet";
import ModernModal from "@components/modal";
import SearchBarHome from "@components/searchBar";
import { addPaquet, editPaquet } from "@redux/reducers/paquetSlice";
import { cleanWords } from "@redux/reducers/wordsSlice";
import FormNewPaquet from "@screens/Home/formPaquet";
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
import Card from "./card";
import { SectionHelpHome } from "./help";

const Paquet = ({ item, complete }) => {
  const cards = [
    { id: 1, color: item.color || COLORS.PURPLE },
    { id: 2, color: COLORS.BLUE },
    { id: 3, color: COLORS.GREEN },
  ];

  return (
    <View style={styles.deckContainer}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          cards={cards}
          card={card}
          item={item}
          index={index}
          complete={complete}
        />
      ))}
    </View>
  );
};

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const paquets = useSelector((state) => state.paquet);
  const wordsValid = useSelector((state) => state.words);

  const [search, setSearch] = useState("");
  const [completeCards, setCompleteCards] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleHelp, setModalVisibleHelp] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (paquets.length === 0) getPacks();
  }, [paquets]);

  useEffect(() => {
    if (wordsValid.length > 0) validWords();
  }, [wordsValid]);

  const getPacks = async () => {
    setLoading(true);
    const filter = query(packRef, where("userID", "==", user.uid));
    const docSnap = await getDocs(filter);
    docSnap.forEach((doc) => dispatch(addPaquet(doc.data())));
    setLoading(false);
  };

  const validWords = async () => {
    let idDoc;
    let paquet;

    const filter = filterPackDoc(user.uid, wordsValid[0].idPaquet);
    const docSnap = await getDocs(filter);
    docSnap.forEach((doc) => {
      idDoc = doc.id;
      paquet = doc.data();
    });

    if (!docSnap.empty) validFalseWords(paquet, idDoc);
  };

  const validFalseWords = async (paquet, idDoc) => {
    const wordsFalse = paquet.words.filter((word) => !word.pass); //Buscamos que palabras quedan todavia en False

    if (wordsFalse.length === wordsValid.length) {
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
      createNewPaquet(paquet, wordsMix, idDoc);
    }
  };

  const createNewPaquet = async (paquet, wordsMix, idDoc) => {
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
  };

  const searchMyPaquet = () =>
    paquets.filter(
      (obj) =>
        obj.title.toLowerCase().includes(search.toLowerCase()) &&
        obj.words.some((value) => value.pass === false)
    );

  const searchMyPaquetComplete = () =>
    paquets.filter((obj) => obj.words.every((value) => value.pass === true));

  return (
    <View style={styles.container}>
      <SearchBarHome
        value={search}
        onChange={(text) => setSearch(text)}
        onPressComplete={() => setCompleteCards(!completeCards)}
        complete={completeCards}
      />

      {!loading ? (
        <ScrollView contentContainerStyle={styles.containerScroll}>
          <View style={styles.containerPaquets}>
            {!completeCards ? (
              <>
                <ComponentAddPaquet onPress={() => setModalVisible(true)} />
                {searchMyPaquet().map((paquet) => (
                  <Paquet item={paquet} key={paquet.id} />
                ))}
              </>
            ) : (
              searchMyPaquetComplete().map((paquet) => (
                <Paquet item={paquet} key={paquet.id} complete={true} />
              ))
            )}
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator color={COLORS.BLUE} size={22} />
      )}

      <ModernModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        color={COLORS.PURPLE}
      >
        <FormNewPaquet onClose={() => setModalVisible(false)} />
      </ModernModal>

      <SectionHelpHome
        visible={modalVisibleHelp}
        setVisible={setModalVisibleHelp}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingTop: hp(8),
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
  deckContainer: {
    flex: 1,
    width: wp(45),
    minWidth: wp(35),
    height: hp(30),
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 10,
    padding: 10,
    position: "relative",
  },
});
