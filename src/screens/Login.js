import Button from "@components/Button";
import TextInputForm from "@components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authLoginAction } from "@redux/actions/authActions";
import { Image } from "@rneui/themed";
import { COLORS, ToastAlert } from "@utilities/contans";
import { ValidateEmail } from "@utilities/formValidation";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const dispatch = useDispatch();

  const validEmailF = (email) => setValidEmail(ValidateEmail(email));

  const handleLogin = () => {
    if (email && password && validEmail) {
      setLoading(true);
      authLoginAction({ email, password }, dispatch).then(async (res) => {
        if (!res.email) return ToastAlert("Usuario incorrecto");
        await AsyncStorage.setItem("user", JSON.stringify(res));
        setLoading(false);
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: hp(10) }}>
        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/StND2cg3sSbR6l-AHr3VdxKziIhEP4kYHQiTppD-aKc6gwn7PVdht1YqzjWSmwf5JLWf=w200-rwa",
          }}
          containerStyle={styles.item}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <TextInputForm
        title="Email"
        value={email}
        changeText={(v) => {
          setEmail(v);
          validEmailF(v);
        }}
      />
      <TextInputForm
        title="Password"
        value={password}
        changeText={(v) => setPassword(v)}
        secureTextEntry={true}
      />
      <Button
        onPress={handleLogin}
        title={
          loading ? <ActivityIndicator color={"#fff"} /> : "Iniciar Sesion"
        }
        color={COLORS.PURPLE}
      />
      <View style={{ position: "absolute", bottom: 25 }}>
        <Text style={{ color: "#000", fontFamily: "Inter_300Light" }}>
          No tienes una cuenta?{" "}
          <Text
            style={{
              fontWeight: "bold",
              color: COLORS.BLUE,
              fontFamily: "Inter_500Medium",
            }}
            onPress={() => navigation.navigate("register")}
          >
            Registrate
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    aspectRatio: 1,
    width: wp(20),
  },
});
