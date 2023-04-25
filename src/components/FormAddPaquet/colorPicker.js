import { COLORS } from "@utilities/contans";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const COLORSPICKER = [
  "#9b59b6",
  "#3498db",
  "#e67e22",
  "#f1c40f",
  "#34495e",
  "#C71585",
];

const ITEM_WIDTH = 65; // ancho de cada elemento
const MAX_ITEMS_PER_ROW = 4; // cantidad máxima de elementos por fila
const ITEM_MARGIN = 8; // margen horizontal entre los elementos

function ColorPicker({ onColorChange }) {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    onColorChange(color);
  };

  const renderColorItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={{
          backgroundColor: item,
          opacity: selectedColor === item && 0.2,
          ...styles.itemColor,
        }}
        onPress={() => handleColorSelect(item)}
      />
    </View>
  );

  return (
    <View>
      <Text style={{ fontFamily: "Inter_200ExtraLight" }}>
        Selecciona un color:
      </Text>
      <FlatList
        data={COLORSPICKER}
        horizontal={true}
        style={styles.list}
        renderItem={renderColorItem}
        keyExtractor={(item) => item}
        contentContainerStyle={{ alignItems: "center" }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
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
    width: ITEM_WIDTH,
    marginHorizontal: ITEM_MARGIN,
    marginVertical: ITEM_MARGIN / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  itemColor: {
    width: 50,
    height: 50,
    borderRadius: 5,
    margin: 5,
  },
});

export default ColorPicker;
