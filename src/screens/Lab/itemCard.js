import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { addWords } from "@redux/reducers/wordsSlice";
import { apiKey, urlCompetitions } from "@services/openIAapi";
import { COLORS } from "@utilities/contans";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import HeaderCard from "./headerCard";

function RenderItemCard({ item, listRef, index, id, userID, lastIndex }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const prompt = `podrias darme una frase nivel ${user.level} en ingles que incluya esta palabra en cualquier posicion '${item.word}'`;
  const [phrase, setPhrase] = useState(null);
  const [visibleText, setVisibleText] = useState(false);

  useEffect(() => {
    getPhrases();
  }, []);

  const getPhrases = async () => {
    await fetch(urlCompetitions, {
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
  };

  const textToSpeech = () => {
    if (phrase) Speech.speak(phrase);
  };

  const wrongAnswer = () => {
    const data = { idPaquet: id, id: item.id, pass: false, word: item.word };

    dispatch(addWords(data));

    if (lastIndex !== index)
      listRef.current.scrollToIndex({ index: index + 1 });
    else navigation.navigate("HomeTabs", { screen: "Home" });
  };

  const goodAnswer = async () => {
    const data = { idPaquet: id, id: item.id, pass: true, word: item.word };
    dispatch(addWords(data));

    if (lastIndex !== index)
      listRef.current.scrollToIndex({ index: index + 1 });
    else navigation.navigate("HomeTabs", { screen: "Home" });
  };

  return (
    <View style={styles.card}>
      <View style={styles.contentTitle}>
        <Text style={styles.title}>{item.word}</Text>
      </View>

      <View style={styles.contentPhrase}>
        <HeaderCard
          visible={visibleText}
          unSeen={() => setVisibleText(!visibleText)}
          speach={() => textToSpeech()}
        />

        {phrase ? (
          <Text style={styles.text}>
            {visibleText ? phrase : "-----------------"}
          </Text>
        ) : (
          <Text style={styles.text}>-----------------</Text>
        )}
      </View>

      {!item.pass && (
        <View style={styles.contentButtonActions}>
          <TouchableOpacity onPress={() => goodAnswer()}>
            <AntDesign name="checkcircle" size={42} color={COLORS.GREEN} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => wrongAnswer()}>
            <MaterialIcons name="cancel" size={50} color={COLORS.RED} />
          </TouchableOpacity>
        </View>
      )}
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
  text: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    lineHeight: hp(3.5),
    textAlign: "center",
  },
  contentTitle: {
    backgroundColor: COLORS.BLUE,
    width: wp(90),
    alignItems: "center",
    justifyContent: "center",
    height: hp(8),
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  contentPhrase: {
    width: wp(90),
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: hp(70),
  },
  contentButtonActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp(26),
    height: hp(10),
  },
});

export default RenderItemCard;
