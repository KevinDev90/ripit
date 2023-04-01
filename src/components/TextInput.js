import { COLORS } from "@utilities/contans";
import { StyleSheet, TextInput, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

function TextInputForm({ title, changeText, secureTextEntry }) {
  return (
    <View style={styles.inputView}>
      <TextInput
        style={styles.inputText}
        placeholder={title}
        placeholderTextColor="#003f5c"
        onChangeText={changeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

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
  inputText: {
    height: hp(5),
    color: "black",
    fontFamily: "Inter_200ExtraLight",
  },
});

export default TextInputForm;
