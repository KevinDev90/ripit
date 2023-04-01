import ComponentAddPaquet from "@components/PaquetComponents/addPaquet";
import FormNewPaquet from "@components/PaquetComponents/form";
import Paquet from "@components/PaquetComponents/paquet";
import ModernModal from "@components/modal";
import SearchBarHome from "@components/searchBar";
import { addPaquet } from "@redux/reducers/paquetSlice";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const paquets = useSelector((state) => state.paquet);
  const dispatch = useDispatch();

  const newPaquet = () => {
    const data = {
      id: Math.floor(Math.random() * 100) + 1,
      title: "otro",
      color: getRandomColor(),
      words: [],
    };
    dispatch(addPaquet(data));
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];

    return color;
  };

  return (
    <View style={styles.container}>
      {/* <Text>name {user.name}</Text>
      <Text>email {user.email}</Text> */}
      <SearchBarHome value={search} onChange={(text) => setSearch(text)} />
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <View style={styles.containerPaquets}>
          <ComponentAddPaquet onPress={() => setModalVisible(true)} />
          {paquets.map((paquet) => (
            <Paquet item={paquet} key={paquet.id} />
          ))}
        </View>
      </ScrollView>

      <ModernModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        // title="Nueva baraja"
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
    // justifyContent: "center",
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
