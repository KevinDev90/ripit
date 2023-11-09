import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { addWords } from "@redux/reducers/wordsSlice";
import { COLORS } from "@utilities/contans";
import { fetchPostText } from "@utilities/urlsOpenAI";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import HeaderCard from "./headerCard";
import Chat from "@screens/Chat";

function RenderItemCard({ item, listRef, index, id, lastIndex }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);

  const [phrase, setPhrase] = useState(null);
  const [visibleText, setVisibleText] = useState(false);

  const [chatVisible, setChatVisible] = useState(false);

  // Could you give me a phrase level ${user.level} that includes this word in any position '${item.word}'
  const prompt = `Podrias darme una frase en ingles nivel ${user.level} que tenga la siguiente palabra en cualquier posicion: '${item.word}'`;

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
        <TouchableOpacity
          onPress={() => setChatVisible(true)}
          style={{ position: "absolute", right: 10 }}
        >
          <View
            style={{
              backgroundColor: COLORS.GREEN,
              padding: 8,
              borderRadius: 10,
            }}
          >
            <Ionicons name={"chatbox-outline"} size={24} color={"#fff"} />
          </View>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={chatVisible}
          onRequestClose={() => {
            setChatVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View
              style={{
                height: hp(55),
                width: wp(90),
                backgroundColor: "#fff",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <Chat />
              <TouchableOpacity
                onPress={() => {
                  setChatVisible(false);
                }}
              >
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <HeaderCard
        visible={visibleText}
        unSeen={() => setVisibleText(!visibleText)}
        speach={() => textToSpeech()}
      />

      <View style={styles.contentPhrase}>
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

      <View style={{ width: wp(90), height: hp(10) }}>
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
    marginHorizontal: 12,
    alignItems: "center",
    marginTop: hp(6),
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    marginTop: 20,
    color: "#fff",
    backgroundColor: COLORS.GREEN,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    minWidth: 100,
    fontFamily: "Inter_500Medium",
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
    height: hp(10),
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    flexDirection: "row",
  },
  contentPhrase: {
    width: wp(90),
    height: hp(52),
    alignItems: "center",
    justifyContent: "center",
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
