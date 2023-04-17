import ComponentAddPaquet from "@components/PaquetComponents/addPaquet";
import ModernModal from "@components/modal";
import SearchBarHome from "@components/searchBar";
import { updateUser } from "@redux/reducers/authSlice";
import { addPaquet } from "@redux/reducers/paquetSlice";
import FormNewPaquet from "@screens/Home/formPaquet";
import Paquet from "@screens/Home/paquet";
import { COLORS } from "@utilities/contans";
import { packRef, userRef } from "@utilities/references";
import { getDoc, getDocs, query, where } from "firebase/firestore";
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
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
    if (paquets.length === 0) getPacks();
  }, []);

  const searchMyPaquet = () => {
    return paquets.filter((obj) =>
      obj.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  const getUser = async () => {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) dispatch(updateUser(docSnap.data()));
    else console.log("No such document!");
  };

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
