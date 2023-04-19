import { ListWords } from "@components/List";
import Popover from "@components/Popover";
import { Picker } from "@react-native-picker/picker";
import { COLORS } from "@utilities/contans";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export function InputCustom({
  title,
  value,
  onChangeText,
  numberOfLines,
  multiline,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        numberOfLines={numberOfLines}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
      />
    </View>
  );
}

export function InputSchedule({
  openPicker,
  visiblePopover,
  closePopover,
  openPopover,
  words,
}) {
  return (
    <View style={styles.containerSchedule}>
      <TouchableOpacity style={styles.buttonSchedule}>
        <Text
          onPress={openPicker}
          style={{
            color: "#fff",
            fontFamily: "Inter_700Bold",
            marginRight: 5,
          }}
        >
          Programa tu horario
        </Text>
        <Popover
          onClose={closePopover}
          onPress={openPopover}
          visible={visiblePopover}
          text={
            "Programa 4 diferentes horarios en que la aplicación te enviara una notificacion y puedas empezar a practicar"
          }
        />
      </TouchableOpacity>

      <ListWords words={words} />
    </View>
  );
}

export function InputPicker({ title, value, onChange, children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={styles.picker}
      >
        {children}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    flex: 1,
    marginRight: 10,
    marginBottom: 5,
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#333",
  },
  input: {
    flex: 2,
    fontSize: 16,
    color: "#666",
    fontFamily: "Inter_300Light",
  },
  containerSchedule: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    width: wp(90),
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  buttonSchedule: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.GREEN,
    borderRadius: 10,
    padding: 12,
    marginBottom: hp(1),
    flexDirection: "row",
  },
  picker: {
    width: wp(50),
    marginBottom: 10,
  },
});
