import { COLORS } from "@utilities/contans";
import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { FlatList } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const ITEM_WIDTH = 65; // ancho de cada elemento
const MAX_ITEMS_PER_ROW = 4; // cantidad máxima de elementos por fila
const ITEM_MARGIN = 8; // margen horizontal entre los elementos

function ListWords({ words }) {
  const renderColorItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={{
          width: "100%",
          height: "100%",
          borderColor: COLORS.GREYBLACK,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "#fff" }}>
          {item}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={words}
      horizontal={true}
      style={styles.list}
      renderItem={renderColorItem}
      keyExtractor={(item) => item}
      contentContainerStyle={{ alignItems: "center" }}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxHeight:
      ITEM_WIDTH * MAX_ITEMS_PER_ROW + ITEM_MARGIN * (MAX_ITEMS_PER_ROW - 1),
  },
  item: {
    width: wp(16),
    height: hp(4),
    borderRadius: 5,
    backgroundColor: COLORS.BLUE,
    marginHorizontal: ITEM_MARGIN,
    marginVertical: ITEM_MARGIN / 2,
  },
});

export default ListWords;
