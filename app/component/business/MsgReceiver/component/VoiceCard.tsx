import { Text, TouchableOpacity } from "react-native";
import { getSize } from "utils";
import { useTranslation } from "react-i18next";
import { Audio } from "expo-av";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const VoiceCard = ({ popover, text }) => {
  const sound = new Audio.Sound();
  const [durationMillis, setDurationMillis] = useState(0);
  const { t } = useTranslation();

  const getSta = async () => {
    await sound.unloadAsync();
    // 加载音频文件，这里假设你有一个有效的音频文件URI
    await sound.loadAsync({ uri: text + "" });
    // 获取音频状态
    sound.getStatusAsync().then((status) => {
      // console.log(status, "status11");
      if (status.isLoaded) {
        const tempDurationMillis = status.durationMillis; // 音频总时长，以毫秒为单位
        setDurationMillis(Number(tempDurationMillis) / 1000);
        console.log(`音频时长：${durationMillis} 毫秒`);
      } else {
        console.log("音频文件未成功加载");
      }
    });
  };
  getSta();
  return (
    <TouchableOpacity
      style={{
        width:
          Number(durationMillis).toFixed() < 6
            ? getSize(100) + Number(durationMillis).toFixed() * 10
            : getSize(230),
        flexDirection: "row",
        padding: 12,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
      onLongPress={() => {
        popover?.current?.show();
      }}
      onPress={async () => {
        try {
          console.log(text, "tempUri");
          // 卸载之前的音频，以防重复播放

          // 播放音频
          await sound.playAsync();
        } catch (error) {
          // 错误处理
          console.error("播放音频时发生错误", error);
        }
      }}
    >
      <Text>
        {t("voice")} {Number(durationMillis).toFixed()}"
      </Text>
      <MaterialCommunityIcons
        style={{ transform: [{ rotate: "85deg" }], marginLeft: 8 }}
        name="wifi"
        size={16}
        color="black"
      />
    </TouchableOpacity>
  );
};
export default VoiceCard;
