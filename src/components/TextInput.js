import { COLORS } from "@utilities/contans";
import { TouchableOpacity } from "react-native";
import { StyleSheet, TextInput, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

function TextInputForm({
  title,
  value,
  changeText,
  secureTextEntry,
  ownStyles,
}) {
  return (
    <View style={styles.inputView}>
      <TextInput
        style={{ ...styles.inputText, ...ownStyles }}
        value={value}
        placeholder={title}
        placeholderTextColor="#003f5c"
        onChangeText={changeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

export const TextInputIcon = ({
  title,
  value,
  changeText,
  secureTextEntry,
  icon,
  ownStyles,
  onPress,
}) => {
  return (
    <View style={{ ...styles.inputView, ...styles.inputIcon }}>
      <TextInput
        style={{ ...styles.inputText, ...ownStyles }}
        value={value}
        placeholder={title}
        placeholderTextColor="#003f5c"
        onChangeText={changeText}
        secureTextEntry={secureTextEntry}
      />
      <View style={{ height: hp(3) }}>
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={onPress}
        >
          {icon}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    width: wp(80),
    backgroundColor: COLORS.GREY,
    borderRadius: 25,
    height: hp(6),
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputText: {
    height: hp(5),
    color: "black",
    fontFamily: "Inter_200ExtraLight",
  },
});

export default TextInputForm;
