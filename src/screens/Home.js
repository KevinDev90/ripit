import ComponentAddPaquet from "@components/PaquetComponents/addPaquet";
import FormNewPaquet from "@components/PaquetComponents/form";
import Paquet from "@components/PaquetComponents/paquet";
import ModernModal from "@components/modal";
import SearchBarHome from "@components/searchBar";
import { updateUser } from "@redux/reducers/authSlice";
import { db } from "@services/firebaseConfig";
import { COLORS } from "@utilities/contans";
import { doc, getDoc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const auth = useSelector((state) => state.auth);
  const paquets = useSelector((state) => state.paquet);
  const dispatch = useDispatch();

  const docRef = doc(db, "users", auth.user.uid);

  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const searchMyPaquet = () => {
    return paquets.filter((obj) =>
      obj.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  const getUser = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) dispatch(updateUser(docSnap.data()));
    else console.log("No such document!");
  };

  return (
    <View style={styles.container}>
      <SearchBarHome value={search} onChange={(text) => setSearch(text)} />

      <ScrollView contentContainerStyle={styles.containerScroll}>
        <View style={styles.containerPaquets}>
          <ComponentAddPaquet onPress={() => setModalVisible(true)} />

          {searchMyPaquet().map((paquet) => (
            <Paquet item={paquet} key={paquet.id} />
          ))}
        </View>
      </ScrollView>

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
