import { authRegisterAction } from "@redux/actions/authActions";
import { ToastAlert } from "@utilities/contans";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import FormRegister from "./form";

export default function Register({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleRegister = (data) => {
    const { email, password, confirmPassword, validEmail } = data;

    if (validEmail && email && password && confirmPassword === password) {
      setLoading(true);
      authRegisterAction({ email, password }).then((res) => {
        setLoading(false);
        if (res.email) {
          ToastAlert("Usuario creado");
          navigation.navigate("login");
        } else ToastAlert("Error al crear un usuario");
      });
    }
  };

  return (
    <View style={styles.container}>
      <FormRegister
        loading={loading}
        onPress={(data) => handleRegister(data)}
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
