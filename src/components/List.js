import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@utilities/contans";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const ITEM_WIDTH = 65; // ancho de cada elemento
const MAX_ITEMS_PER_ROW = 4; // cantidad máxima de elementos por fila
const ITEM_MARGIN = 8; // margen horizontal entre los elementos

export const ListWords = ({ words, onPress }) => {
  const renderColorItem = ({ item }) => (
    <View style={styles.containerItem}>
      <View style={styles.item}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "#fff" }}>
          {item.word ? item.word : item}
        </Text>
      </View>

      <TouchableOpacity style={styles.icon} onPress={() => onPress(item.id)}>
        <MaterialIcons name="delete" size={10} color={"#fff"} />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={words}
      horizontal={true}
      style={styles.list}
      renderItem={renderColorItem}
      keyExtractor={(item) => (item.id ? item.id : item)}
      contentContainerStyle={{ alignItems: "center" }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export const ListImages = ({ images, onPress }) => {
  const renderImageItem = ({ item }) => (
    <View style={{ marginVertical: ITEM_MARGIN / 2 }}>
      <TouchableOpacity onPress={() => onPress(item.uri)}>
        <Image
          source={{ uri: item.uri }}
          resizeMode="contain"
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={images}
      horizontal={true}
      style={styles.listImage}
      renderItem={renderImageItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ alignItems: "center" }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxHeight:
      ITEM_WIDTH * MAX_ITEMS_PER_ROW + ITEM_MARGIN * (MAX_ITEMS_PER_ROW - 1),
  },
  listImage: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  containerItem: {
    width: wp(16),
    height: hp(4),
    borderRadius: 5,
    backgroundColor: COLORS.BLUE,
    marginHorizontal: ITEM_MARGIN,
    marginVertical: ITEM_MARGIN / 2,
  },
  item: {
    width: "100%",
    height: "100%",
    borderColor: COLORS.GREYBLACK,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    right: -5,
    top: -4,
    backgroundColor: COLORS.RED,
    borderRadius: 50,
    padding: 3,
  },
  image: {
    width: wp(24),
    height: hp(12),
    marginHorizontal: 5,
    borderRadius: 50,
  },
});
