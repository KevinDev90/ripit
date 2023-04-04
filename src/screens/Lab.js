import RenderItemCard from "@components/LabComponents/RenderItemCard";
import { COLORS } from "@utilities/contans";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
const CARD_WIDTH = 300;

function Lab({ navigation, route }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const paquet = route.params.item;
  const words = paquet.words;

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CARD_WIDTH);
    setCurrentIndex(index);
  };

  const Row = ({ item, index }) => <RenderItemCard key={index} item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={words}
        renderItem={Row}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        pagingEnabled
      />
      <View style={styles.pagination}>
        {words.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
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
});

export default Lab;
