import ComponentAddPaquet from "@components/PaquetComponents/addPaquet";
import FormNewPaquet from "@components/PaquetComponents/form";
import Paquet from "@components/PaquetComponents/paquet";
import ModernModal from "@components/modal";
import SearchBarHome from "@components/searchBar";
import { COLORS } from "@utilities/contans";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";

export default function Home() {
  const paquets = useSelector((state) => state.paquet);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const searchMyPaquet = () => {
    return paquets.filter((obj) =>
      obj.title.toLowerCase().includes(search.toLowerCase())
    );
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
