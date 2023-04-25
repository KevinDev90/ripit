import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "@utilities/contans";
import * as Speech from "expo-speech";
import { Fragment } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

function GiftedChatCustom({ messages, onSend, isTyping }) {
  const BubbleCustom = (props) => {
    const { currentMessage } = props;

    if (currentMessage.user._id === 1)
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: COLORS.GREEN,
            },
            left: {
              backgroundColor: COLORS.PURPLE,
            },
          }}
          textStyle={{
            right: {
              color: "#fff",
            },
            left: {
              color: "#fff",
            },
          }}
        />
      );

    return (
      <Fragment>
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: COLORS.GREEN,
            },
            left: {
              backgroundColor: COLORS.PURPLE,
            },
          }}
          textStyle={{
            right: {
              color: "#fff",
            },
            left: {
              color: "#fff",
            },
          }}
        />
        <TouchableOpacity
          onPress={() => Speech.speak(props.currentMessage.text)}
          style={{
            padding: 10,
            margin: 5,
          }}
        >
          <FontAwesome name="volume-up" size={26} color={COLORS.BLUE} />
        </TouchableOpacity>
      </Fragment>
    );
  };

  const ComposerCustom = (props) => {
    return (
      <Composer
        {...props}
        textInputStyle={{
          padding: hp(1),
          backgroundColor: "#fff",
          borderRadius: 10,
          borderColor: COLORS.GREY,
          borderWidth: 1,
          marginLeft: 4,
          marginRight: 4,
          elevation: 1.5,
        }}
      />
    );
  };

  const SendCustom = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color={COLORS.BLUE}
          />
        </View>
      </Send>
    );
  };

  const InputToolbarCustom = (props) => (
    <InputToolbar
      {...props}
      containerStyle={{
        borderTopWidth: 1,
        borderTopColor: "transparent",
        marginHorizontal: 4,
      }}
      primaryStyle={{ alignItems: "center" }}
    />
  );

  const ChatFooterCustom = () =>
    isTyping ? (
      <Text
        style={{
          color: "#aaa",
          textAlign: "center",
          padding: 10,
          fontStyle: "italic",
        }}
      >
        Typing...
      </Text>
    ) : null;

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: 1,
        name: "Usuario",
      }}
      placeholder="Type your message here..."
      renderBubble={BubbleCustom}
      renderSend={SendCustom}
      renderInputToolbar={InputToolbarCustom}
      renderComposer={ComposerCustom}
      renderChatFooter={ChatFooterCustom}
      renderUsernameOnMessage
      scrollToBottom
      scrollToBottomStyle={{ backgroundColor: COLORS.GREEN }}
    />
  );
}

export default GiftedChatCustom;
