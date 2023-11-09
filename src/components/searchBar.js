import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@utilities/contans";
import { Text } from "react-native";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

function SearchBarHome({ value, onChange, onPressComplete, complete }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {!complete ? (
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
      ) : (
        <View style={styles.containerTitle}>
          <Text
            style={{
              fontFamily: "Inter_800ExtraBold",
              fontSize: 20,
            }}
          >
            Barajas completadas
          </Text>
        </View>
      )}
      <View style={styles.containerCheck}>
        <TouchableOpacity onPress={onPressComplete}>
          <Ionicons
            name={!complete ? "checkmark" : "list"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    flex: 0.9,
    flexDirection: "row",
    height: hp(4),
    alignItems: "center",
    backgroundColor: COLORS.GREY,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 2,
  },
  containerTitle: {
    flex: 0.9,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  containerCheck: {
    backgroundColor: COLORS.GREEN,
    borderRadius: 10,
    flex: 0.1,
    padding: 2,
    marginRight: wp(2),
    height: hp(4),
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
