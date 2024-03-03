import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import ChatIcon from "@/icons/tabs/chats.svg";
import { themeColor } from "@/theme/light";
import Emoji from "@/icons/keyboard-panel/emoji-icon.svg";
import VoiceRecord from "@/icons/keyboard-panel/voice-record.svg";
import CirclePlus from "@/icons/circle-plus.svg";
import { getSize } from "utils";
import AudioRecorder from "@/component/business/AudioRecorder";
import { useState } from "react";

const ChatInput = ({
  value,
  onEndEditing,
  onVoiceEnd,
  onChangeText,
  chatPress,
  onFocus,
  emojiPress,
  plusPress,
}) => {
  const [voiceInput, setVoiceInput] = useState(false);
  return (
    <View
      style={{
        // shadowColor: "#000",
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.4,
        // shadowRadius: 3,
        // elevation: 5,

        borderTopColor: themeColor.fill5,
        borderTopWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 4,
        padding: 8,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          chatPress?.();
          setVoiceInput(!voiceInput);
        }}
      >
        <VoiceRecord style={{ marginRight: 4 }} width={28} height={28} />
      </TouchableOpacity>

      {voiceInput ? (
        <AudioRecorder onVoiceEnd={onVoiceEnd} />
      ) : (
        <TextInput
          value={value}
          selectionColor={themeColor.primary}
          onChangeText={onChangeText}
          onFocus={onFocus}
          autoFocus={!voiceInput}
          onSubmitEditing={onEndEditing}
          blurOnSubmit={false}
          returnKeyType="send"
          style={{
            borderRadius: 4,
            height: getSize(38),

            // position: "absolute",
            // bottom: -410,
            paddingLeft: 8,
            fontSize: 18,
            paddingVertical: 8,
            flex: 1,
            // fontSize: 22,
            backgroundColor: themeColor.white,
          }}
        ></TextInput>
      )}

      <TouchableOpacity
        onPress={() => {
          emojiPress?.();
        }}
      >
        <Emoji width={30} height={30} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          plusPress?.();
        }}
      >
        <CirclePlus width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
};
export default ChatInput;
