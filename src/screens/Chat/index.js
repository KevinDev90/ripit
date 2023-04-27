import { COLORS } from "@utilities/contans";
import { fetchPostMessage } from "@utilities/urlsOpenAI";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import GiftedChatCustom from "./giftedChat";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    initialMessage();
  }, []);

  const initialMessage = () =>
    printMessage("Hi!, What would you like to talk about?");

  const onSend = async (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));

    setIsTyping(true);

    const { text } = newMessages[0];
    const message = await fetchPostMessage(text);

    setIsTyping(false);
    printMessage(message);
  };

  const printMessage = (text) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          _id: new Date().getTime(),
          text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "OpenAI",
            avatar:
              "https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png",
          },
        },
      ])
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={{ ...styles.text, backgroundColor: COLORS.BLUE }}>
          Charla y practica
        </Text>
        <View style={{ right: 5, position: "absolute" }}>
          <Text
            onPress={() => {
              setMessages([]);
              initialMessage();
            }}
            style={{ ...styles.text, backgroundColor: COLORS.RED }}
          >
            Limpiar
          </Text>
        </View>
      </View>

      <GiftedChatCustom
        messages={messages}
        onSend={onSend}
        isTyping={isTyping}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // paddingBottom: hp(10),
    paddingTop: hp(1),
  },
  containerText: {
    marginBottom: hp(2),
    width: wp(100),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontFamily: "Inter_300Light",
    padding: 10,
    borderRadius: 10,
    color: "#fff",
    fontStyle: "italic",
  },
});

export default Chat;
