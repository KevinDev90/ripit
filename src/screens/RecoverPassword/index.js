import { authRecoverPasswordAction } from "@redux/actions/authActions";
import { ToastAlert } from "@utilities/contans";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import FormRecover from "./form";
import HeaderRow from "@components/headerRow";

export default function RecoverPassword({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleRecoverPassword = async (data) => {
    const { email, validEmail } = data;

    if (email && validEmail) {
      setLoading(true);
      authRecoverPasswordAction(email).then((res) => {
        setLoading(false);
        if (res && res.messageError) ToastAlert(res.messageError, true);
      });
    }
  };

  return (
    <View style={styles.container}>
      <HeaderRow navigation={navigation} />
      <FormRecover
        loading={loading}
        onPress={(data) => handleRecoverPassword(data)}
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
