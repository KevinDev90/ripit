import Button from "@components/Button";
import TextInputForm from "@components/TextInput";
import { COLORS } from "@utilities/contans";
import { ValidateEmail } from "@utilities/formValidation";
import { useState } from "react";
import { ActivityIndicator } from "react-native";

function FormRegister({ onPress, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const validEmailF = (email) => setValidEmail(ValidateEmail(email));

  return (
    <>
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
        onPress={() =>
          onPress({ email, password, confirmPassword, validEmail })
        }
        title={loading ? <ActivityIndicator color="#fff" /> : "Registrarse"}
        color={COLORS.BLUE}
      />
    </>
  );
}

export default FormRegister;
