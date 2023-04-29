import Logo from "@assets/img/logo.png";
import AnimationImage from "@components/AnimationImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authLoginAction } from "@redux/actions/authActions";
import { login } from "@redux/reducers/authSlice";
import { COLORS, ToastAlert } from "@utilities/contans";
import { userRef } from "@utilities/references";
import { getDoc, setDoc } from "firebase/firestore";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import FormLogin from "./form";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback((data) => {
    const { email, password, validEmail } = data;

    if (email && password && validEmail) {
      setLoading(true);
      authLoginAction({ email, password }, dispatch).then(async (res) => {
        if (res && res.messageError) {
          setLoading(false);
          return ToastAlert("Usuario incorrecto", true);
        }
        if (res) {
          const docSnap = await getDoc(userRef(res.uid));
          if (!docSnap.exists()) {
            await setDoc(userRef(res.uid), {
              accessToken: res.accessToken,
              email: res.email,
              uid: res.uid,
            });
          } else {
            const data = {
              ...docSnap.data(),
              uid: docSnap.id,
            };
            dispatch(login(data));
            await AsyncStorage.setItem("user", JSON.stringify(res));
          }
        }
        setLoading(false);
      });
    }
  }, []);

  const memoizedFormLogin = useMemo(
    () => <FormLogin loading={loading} onPress={handleLogin} />,
    [loading, handleLogin]
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <AnimationImage source={Logo} style={styles.image} />
      </View>

      {memoizedFormLogin}

      <View style={{ width: wp(80), padding: 10 }}>
        <Text
          onPress={() => navigation.navigate("recover")}
          style={{ textAlign: "left", fontFamily: "Inter_300Light" }}
        >
          Recuperar contraseña
        </Text>
      </View>

      <View style={{ position: "absolute", bottom: 25 }}>
        <Text style={{ color: "#000", fontFamily: "Inter_300Light" }}>
          No tienes una cuenta?{" "}
          <Text
            style={styles.buttonRegister}
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
  buttonRegister: {
    fontWeight: "bold",
    color: COLORS.BLUE,
    fontFamily: "Inter_500Medium",
  },
  image: {
    borderRadius: 10,
    width: wp(30),
    height: hp(22),
  },
});
