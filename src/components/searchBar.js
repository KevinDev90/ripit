import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@utilities/contans";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

function SearchBarHome({ value, onChange }) {
  return (
    <View style={{ flexDirection: "row" }}>
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
      <View style={styles.containerCheck}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="checkmark" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    flex: 0.9,
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
  containerCheck: {
    backgroundColor: COLORS.GREEN,
    borderRadius: 10,
    flex: 0.1,
    padding: 2,
    marginRight: wp(2),
    height: hp(5),
    justifyContent: "center",
    alignItems: "center",
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
