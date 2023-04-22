import Button from "@components/Button";
import TextInputForm from "@components/TextInput";
import { authRegisterAction } from "@redux/actions/authActions";
import { COLORS, ToastAlert } from "@utilities/contans";
import { ValidateEmail } from "@utilities/formValidation";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [loading, setLoading] = useState(false);

  const validEmailF = (email) => setValidEmail(ValidateEmail(email));

  const handleRegister = () => {
    if (
      validEmail &&
      email !== "" &&
      password !== "" &&
      confirmPassword === password
    ) {
      setLoading(true);
      authRegisterAction({ email, password }).then((res) => {
        setLoading(false);
        if (res.email) {
          ToastAlert("Usuario creado, ya puedes iniciar sesion");
          navigation.navigate("login");
        } else ToastAlert("Error al crear un usuario");
      });
    }
  };

  return (
    <View style={styles.container}>
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
      <TextInputForm
        title="Confirma tu contraseña"
        value={confirmPassword}
        changeText={(v) => setConfirmPassword(v)}
        secureTextEntry={true}
      />
      <Button
        onPress={handleRegister}
        title={loading ? <ActivityIndicator color="#fff" /> : "Registrarse"}
        color={COLORS.BLUE}
      />
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
});
