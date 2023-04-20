import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@utilities/contans";
import { StyleSheet, TextInput, View } from "react-native";

function SearchBarHome({ value, onChange }) {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchIcon}>
        <Ionicons name="search" size={20} color="#A5A5A5" />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        placeholderTextColor="#A5A5A5"
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.GREY,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: "#333333",
  },
});

export default SearchBarHome;
