import Button from "@components/Button";
import TextInputForm from "@components/TextInput";
import { COLORS } from "@utilities/contans";
import { ValidateEmail } from "@utilities/formValidation";
import { useState } from "react";
import { ActivityIndicator } from "react-native";

function FormLogin({ onPress, loading }) {
  const [email, setEmail] = useState("guzmankevin90@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [validEmail, setValidEmail] = useState(true);

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

      <Button
        onPress={() => onPress({ email, password, validEmail })}
        title={
          loading ? (
            <ActivityIndicator color={"#fff"} size={22} />
          ) : (
            "Iniciar Sesion"
          )
        }
        color={COLORS.BLUE}
      />
    </>
  );
}

export default FormLogin;
