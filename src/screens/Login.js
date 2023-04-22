import Logo from "@assets/img/logo.png";
import AnimationImage from "@components/AnimationImage";
import Button from "@components/Button";
import TextInputForm from "@components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authLoginAction } from "@redux/actions/authActions";
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
      <View style={styles.containerLogo}>
        <AnimationImage
          source={Logo}
          style={{ borderRadius: 10, width: wp(30), height: hp(22) }}
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
        title="Contraseña"
        value={password}
        changeText={(v) => setPassword(v)}
        secureTextEntry={true}
      />

      <Button
        onPress={handleLogin}
        title={
          loading ? <ActivityIndicator color={"#fff"} /> : "Iniciar Sesion"
        }
        color={COLORS.BLUE}
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
  containerLogo: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(4),
  },
});
