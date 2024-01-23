import { TextInput, TouchableOpacity, View } from "react-native";
import ChatIcon from "@/icons/tabs/chats.svg";
import { themeColor } from "@/theme/light";
import Emoji from "@/icons/keyboard-panel/emoji-icon.svg";
import VoiceRecord from "@/icons/keyboard-panel/voice-record.svg";
import CirclePlus from "@/icons/circle-plus.svg";
import { getSize } from "utils";
const ChatInput = ({
  value,
  onChangeText,
  chatPress,
  emojiPress,
  plusPress,
}) => {
  return (
    <View
      style={{
        // paddingTop: 20, // 适当调整以留出阴影空间
        // backgroundColor: "white",
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 3,
        // elevation: 5,

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 4,
        padding: 8,
        paddingBottom: 0,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          chatPress?.();
        }}
      >
        <VoiceRecord style={{ marginRight: 4 }} width={28} height={28} />
      </TouchableOpacity>
      <TextInput
        value={value}
        selectionColor={themeColor.primary}
        onChangeText={onChangeText}
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
