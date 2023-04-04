import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { apiKey, urlCompetitions } from "@services/openIAapi";
import { COLORS } from "@utilities/contans";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { Base64 } from "js-base64";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

function RenderItemCard({ item }) {
  const prompt = `podrias darme una frase nivel intermedio en ingles que incluya esta palabra en cualquier posicion '${item.word}'`;
  const [phrase, setPhrase] = useState(null);

  useEffect(() => {
    fetch(urlCompetitions, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt,
        max_tokens: 150,
        temperature: 0,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const message = data.choices[0].text.trim();
        setPhrase(message);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (phrase) {
      const text = Base64.encode(phrase); // string to base64
    }
  }, [phrase]);

  return (
    <View style={styles.card}>
      <View
        style={{
          backgroundColor: COLORS.BLUE,
          width: wp(90),
          alignItems: "center",
          justifyContent: "center",
          height: hp(8),
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
        }}
      >
        <Text style={styles.title}>{item.word}</Text>
      </View>
      <View
        style={{
          width: wp(90),
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          height: hp(70),
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Inter_600SemiBold",
            lineHeight: hp(3.5),
            textAlign: "center",
          }}
        >
          {phrase}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: wp(26),
          height: hp(10),
        }}
      >
        <TouchableOpacity>
          <AntDesign name="checkcircle" size={42} color={COLORS.GREEN} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="cancel" size={50} color={COLORS.RED} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: wp(90),
    height: hp(95),
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: "center",
    marginTop: hp(4),
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter_800ExtraBold",
    color: "#fff",
    textTransform: "capitalize",
  },
});
export default RenderItemCard;
