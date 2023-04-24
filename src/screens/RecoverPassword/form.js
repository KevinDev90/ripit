import Button from "@components/Button";
import TextInputForm from "@components/TextInput";
import { COLORS } from "@utilities/contans";
import { ValidateEmail } from "@utilities/formValidation";
import { useState } from "react";
import { ActivityIndicator } from "react-native";

function FormRecover({ loading, onPress }) {
  const [email, setEmail] = useState("");
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
      <Button
        onPress={() => onPress({ email, validEmail })}
        title={loading ? <ActivityIndicator color="#fff" /> : "Recuperar"}
        color={COLORS.BLUE}
      />
    </>
  );
}

export default FormRecover;
