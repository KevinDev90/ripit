import { apiKey, urlChat } from "@services/openIAapi";
import { COLORS } from "@utilities/contans";
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

  const getMessageAPI = async (text) => {
    const response = await fetch(urlChat, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: text }],
        temperature: 0.5,
        max_tokens: 100,
      }),
    });
    const data = await response.json();

    return data.choices[0].message.content;
  };

  const onSend = async (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));

    setIsTyping(true);

    const { text } = newMessages[0];
    const message = await getMessageAPI(text);

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
          Escribe y practica
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
    paddingBottom: hp(10),
  },
  containerText: {
    marginTop: hp(5),
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
