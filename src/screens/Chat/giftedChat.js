import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "@utilities/contans";
import { Text, View } from "react-native";
import {
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

function GiftedChatCustom({ messages, onSend, isTyping }) {
  const BubbleCustom = (props) => (
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
        // backgroundColor: COLORS.GREY,
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
      // showAvatarForEveryMessage
      // renderAvatarOnTop
      scrollToBottom
      scrollToBottomStyle={{ backgroundColor: COLORS.GREEN }}
    />
  );
}

export default GiftedChatCustom;
