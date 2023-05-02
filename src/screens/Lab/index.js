import RenderItemCard from "@screens/Lab/itemCard";
import { COLORS } from "@utilities/contans";
import { useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

function Lab({ navigation, route }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const listRef = useRef(null);
  const paquet = route.params.item;
  const words = paquet.words;

  const filteredData = words.filter((item) => item.pass === false);

  const lastIndex = filteredData.length - 1;

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const CARD_WIDTH = words.length * 150;
    const index = Math.round(scrollPosition / CARD_WIDTH);
    setCurrentIndex(index);
  };

  const Row = ({ item, index }) => (
    <RenderItemCard
      key={index}
      item={item}
      listRef={listRef}
      index={index}
      id={paquet.id}
      userID={paquet.userID}
      lastIndex={lastIndex}
    />
  );

  return (
    <View style={styles.container}>
      {filteredData.length > 0 ? (
        <>
          <FlatList
            ref={listRef}
            horizontal
            data={filteredData}
            renderItem={Row}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            pagingEnabled
            // scrollEnabled={false}
          />
          <View style={styles.pagination}>
            {filteredData.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.paginationDot,
                  index === currentIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </>
      ) : (
        <View style={styles.contentAlert}>
          <View style={{ ...styles.alert, ...styles.shadow }}>
            <Text style={stylesText.text1}>Felicitaciones!!!</Text>
            <Text style={stylesText.text2}>Completaste todas tus palabras</Text>
            <View style={{ ...styles.contentMessage, ...styles.shadow }}>
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={stylesText.text3}>
                  Crea una nueva baraja {"\n"} Edita y agrega mas palabras
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const stylesText = StyleSheet.create({
  text1: {
    fontSize: 22,
    fontFamily: "Inter_900Black",
    color: "#fff",
  },
  text2: {
    fontSize: 16,
    fontFamily: "Inter_800ExtraBold",
    color: "#fff",
    marginTop: hp(2),
  },
  text3: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Inter_700Bold",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(2),
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  paginationDot: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: COLORS.PURPLE,
  },
  contentAlert: {
    width: wp(95),
    height: hp(100),
    justifyContent: "center",
    alignItems: "center",
  },
  alert: {
    backgroundColor: COLORS.GREEN,
    width: wp(80),
    height: hp(45),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  },
  contentMessage: {
    backgroundColor: COLORS.PURPLE,
    width: "85%",
    borderRadius: 10,
    justifyContent: "center",
    marginTop: hp(2),
    padding: 15,
  },
});

export default Lab;
