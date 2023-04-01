import Button from "@components/Button";
import TextInputForm from "@components/TextInput";
import { COLORS } from "@utilities/contans";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // handle login logic
  };

  return (
    <View style={styles.container}>
      <TextInputForm
        title="Correo"
        value={email}
        changeText={(v) => setEmail(v)}
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
        title="Registrarse"
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
