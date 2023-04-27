import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { addWords } from "@redux/reducers/wordsSlice";
import { COLORS } from "@utilities/contans";
import { fetchPostText } from "@utilities/urlsOpenAI";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import HeaderCard from "./headerCard";

function RenderItemCard({ item, listRef, index, id, lastIndex }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);

  const [phrase, setPhrase] = useState(null);
  const [visibleText, setVisibleText] = useState(false);

  // Could you give me a phrase level ${user.level} that includes this word in any position '${item.word}'
  const prompt = `Podrias darme una frase en ingles nivel ${user.level} que tenga la siguiente palabra en cualquier posicion '${item.word}'`;

  useEffect(() => {
    getPhrases();
  }, []);

  const getPhrases = async () => {
    const message = await fetchPostText(prompt);
    setPhrase(message);
  };

  const textToSpeech = () => {
    if (phrase) Speech.speak(phrase);
  };

  const nextPage = () => {
    if (lastIndex !== index)
      listRef.current.scrollToIndex({ index: index + 1 });
    else navigation.navigate("HomeTabs", { screen: "Home" });
  };

  const answerWord = (state) => {
    const data = { idPaquet: id, id: item.id, pass: state, word: item.word };
    dispatch(addWords(data));
    nextPage();
  };

  const noAnswer = () => nextPage();

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
          <TouchableOpacity onPress={() => answerWord(true)}>
            <AntDesign name="checkcircle" size={42} color={COLORS.GREEN} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => noAnswer()}>
            <MaterialIcons name="watch-later" size={50} color={COLORS.BLUE} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => answerWord(false)}>
            <MaterialIcons name="cancel" size={50} color={COLORS.RED} />
          </TouchableOpacity>
        </View>
      )}

      <View style={{ width: wp(90), height: hp(8)}}>
        <Text
          style={{ textAlign: "center", fontStyle: "italic", fontSize: 14 }}
        >
          <AntDesign name="checkcircle" size={14} color={COLORS.GREEN} /> If you
          got it {"\n"}
          <MaterialIcons name="cancel" size={14} color={COLORS.RED} /> If you
          didn't got it {"\n"}
          <MaterialIcons
            name="watch-later"
            size={14}
            color={COLORS.BLUE}
          />{" "}
          Practice again later
        </Text>
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
    justifyContent: "center",
    alignItems: "center",
    width: wp(90),
    height: hp(10),
  },
});

export default RenderItemCard;
