import Button from "@components/Button";
import TextInputForm from "@components/TextInput";
import { Image } from "@rneui/themed";
import { COLORS } from "@utilities/contans";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // handle login logic
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
        changeText={(v) => setEmail(v)}
      />
      <TextInputForm
        title="Password"
        value={password}
        changeText={(v) => setPassword(v)}
        secureTextEntry={true}
      />
      <Button
        onPress={handleLogin}
        title="Iniciar Sesion"
        color={COLORS.PURPLE}
      />
      <View style={{ position: "absolute", bottom: 25 }}>
        <Text style={{ color: "black", fontFamily: "Inter_300Light" }}>
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
