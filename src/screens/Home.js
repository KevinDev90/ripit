import ComponentAddPaquet from "@components/addPaquet";
import ModernModal from "@components/modal";
import Paquet from "@components/paquet";
import SearchBarHome from "@components/searchBar";
import { COLORS } from "@utilities/contans";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function Home() {
  // const user = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [paquets, setPaquets] = useState([
    {
      id: 1,
      title: "tema 1",
      color: COLORS.PURPLE,
      words: [
        { id: 1, word: "men" },
        { id: 2, word: "women" },
      ],
    },
    {
      id: 2,
      title: "tema 2",
      color: COLORS.BLUE,
      words: [
        { id: 1, word: "rattled" },
        { id: 2, word: "flee" },
      ],
    },
  ]);

  const addPaquet = () => {
    // setPaquets([
    //   ...paquets,
    //   {
    //     id: Math.floor(Math.random() * 100) + 1,
    //     title: "otro",
    //     color: getRandomColor(),
    //     words: [],
    //   },
    // ]);
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
        title="Nueva baraja"
      >
        <Text>Form</Text>
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
