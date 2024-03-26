import { useTheme } from "@/theme/useTheme";
import { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import UserAvatar from "../UserAvatar";
import HangUpBtn from "../HangUpBtn";
import AcceptBtn from "../AcceptBtn";
import { PortalRef } from "app/_layout";
import axios from "axios";
import config from "@/config/index";
import { getSize } from "utils";
import { Audio } from "expo-av";

export const portalKey = "PhoneCalling";
const PhoneCalling = (props: {
  callUserId: string;
  rejectHandler: () => void;
  answerHandler: () => void;
}) => {
  const { callUserId, answerHandler, rejectHandler } = props;
  const translateY = useRef(new Animated.Value(0)).current;
  const { themeColor } = useTheme();
  const [callingUser, setCallingUser] = useState({ act: "", image: "" });
  useEffect(() => {
    if (!callUserId) {
      console.log("callUserId null");
      return;
    }
    axios
      .get(config.apiDomain + `/api/user/getUserById?userId=${callUserId}`)
      .then((user) => {
        console.log(user.data.data, "user-calling");
        setCallingUser(user.data.data);
      });
  }, []);
  useEffect(() => {
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 5,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -5,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    floatingAnimation.start();

    return () => {
      floatingAnimation.stop();
    };
  }, [translateY]);
  useEffect(() => {
    const playSound = async (): Promise<Audio.Sound> => {
      Audio.setAudioModeAsync({ allowsRecordingIOS: false });
      const sound = new Audio.Sound();

      try {
        // 卸载之前的音频，以防重复播放

        await sound.unloadAsync();
        // 加载音频文件，这里假设你有一个有效的音频文件URI
        await sound.loadAsync(
          require("@/assets/mixkit-marimba-ringtone-1359.wav")
        );
        // await sound.loadAsync({
        //   uri: "http://172.20.10.3:4000/files/1709474107144.caf" + "",
        // });
        // 播放音频
        await sound.playAsync();
        return sound;
      } catch (error) {
        // 错误处理
        console.error("播放音频时发生错误", error);
        return sound;
      }
    };
    const sound = playSound();
    return () => {
      sound.then(async (res) => await res.unloadAsync());
    };
  }, []);
  return (
    <Animated.View
      style={[
        {
          borderRadius: 8,
          right: 0,
          left: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 12,
          padding: 8,
          paddingHorizontal: 16,
          alignItems: "center",
          backgroundColor: themeColor.overlay4,
          position: "absolute",
          top: "15%",
        },
        {
          transform: [{ translateY: translateY }],
        },
      ]}
      key={portalKey}
    >
      <UserAvatar rounded source={{ uri: callingUser.image }} />
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          marginHorizontal: 8,
        }}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            maxWidth: getSize(100),
            color: themeColor.white,
            fontSize: 18,
          }}
        >
          {callingUser?.nickname || callingUser.act}
        </Text>
        <Text
          style={{
            color: themeColor.white,
            fontSize: 18,
            marginLeft: 4,
          }}
        >
          is calling
        </Text>
      </View>

      <View
        className="justify-center items-center flex-row gap-4 "
        style={{ height: 1 }}
      >
        <HangUpBtn
          width={38}
          height={38}
          sizeOut={26}
          onPress={() => {
            PortalRef.current?.removePortal(portalKey);
            rejectHandler();
          }}
        />
        <AcceptBtn
          width={38}
          height={38}
          sizeOut={26}
          onPress={() => {
            answerHandler();
            PortalRef.current?.removePortal(portalKey);
          }}
        />
      </View>
    </Animated.View>
  );
};
export default PhoneCalling;
