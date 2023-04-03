import ComponentAddPaquet from "@components/PaquetComponents/addPaquet";
import FormNewPaquet from "@components/PaquetComponents/form";
import Paquet from "@components/PaquetComponents/paquet";
import ModernModal from "@components/modal";
import SearchBarHome from "@components/searchBar";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";

export default function Home() {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const paquets = useSelector((state) => state.paquet);

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
