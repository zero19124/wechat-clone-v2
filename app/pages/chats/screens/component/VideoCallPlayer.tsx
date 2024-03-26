import VideoCallBtn from "@/component/complex/VideoCallBtn";
import { useTheme } from "@/theme/useTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Button, PanResponder, View, Text } from "react-native";
import { RTCView } from "react-native-webrtc";
import { getSize } from "utils";
import VideoCallIcon from "@/icons/keyboard-panel/video-call.svg";
import HangUpBtn from "@/component/complex/HangUpBtn";
import Loading from "@/component/base/Loading";
import { Audio } from "expo-av";

// 播放视频组件
const Player = ({
  type = "caller",
  preCall,
  hangUpHandler,
  awaiting = true,
  switchHandler,
  local_stream,
  remote_stream,
}) => {
  const { t } = useTranslation();
  const { themeColor } = useTheme();
  const [cameraOn, setCameraOn] = useState(true);
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        console.log(gestureState, "gestureState", pan);
        pan.y.setValue(gestureState.dy);
        pan.x.setValue(gestureState.dx);
      },
    })
  ).current;
  const soundRef = useRef<Audio.Sound | undefined>();
  useEffect(() => {
    playSound().then((soundRes) => {
      soundRef.current = soundRes;
    });
    return () => {
      (async () => {
        await soundRef.current?.unloadAsync();
      })();
    };
  }, []);
  const playSound = async (): Promise<Audio.Sound | undefined> => {
    Audio.setAudioModeAsync({ allowsRecordingIOS: false });
    const sound = new Audio.Sound();

    try {
      // 卸载之前的音频，以防重复播放

      await sound.unloadAsync();
      // 加载音频文件，这里假设你有一个有效的音频文件URI
      await sound.loadAsync(
        require("@/assets/mixkit-dial-phone-tone-2862.wav")
      );

      return sound;
    } catch (error) {
      // 错误处理
      console.error("播放音频时发生错误", error);
      return sound;
    }
  };
  if (!awaiting) {
    soundRef.current?.unloadAsync();
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "red",
        height: "100%",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <RTCView
          objectFit="cover"
          style={{ flex: 1 }}
          streamURL={local_stream?.toURL?.()}
        />
        <Animated.View
          style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          }}
          {...panResponder.panHandlers}
        >
          <RTCView
            style={{
              height: 300,
              width: 130,
              position: "absolute",
              top: 50,
              right: 16,
              zIndex: 100,
            }}
            streamURL={remote_stream?.toURL?.()}
          />
        </Animated.View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: getSize(48),
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {type === "caller" && awaiting && (
          <Button
            title="call"
            onPress={async () => {
              preCall?.();
              await soundRef.current?.playAsync();
            }}
          />
        )}

        {awaiting && (
          <View className="justify-center items-center flex-row">
            <Text
              style={{
                marginRight: 4,
                color: themeColor.text3,
                marginVertical: getSize(12),
                fontSize: getSize(16),
              }}
            >
              {t("Awaiting response")}
            </Text>
            <Loading size={getSize(16)} />
          </View>
        )}

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <VideoCallBtn
            IconFn={({ size }) => {
              return (
                <MaterialCommunityIcons
                  name="camera-flip"
                  size={size}
                  color={themeColor.white}
                />
              );
            }}
            text={t("Switch")}
          />
          <VideoCallBtn
            active={cameraOn}
            onPress={() => {
              switchHandler?.();
              setCameraOn(!cameraOn);
            }}
            IconFn={({ size }) => {
              return (
                <VideoCallIcon
                  width={size}
                  height={size}
                  fill={cameraOn ? themeColor.bg5 : themeColor.white}
                />
              );
            }}
            text={t("Camera On")}
          />
        </View>
        <HangUpBtn
          onPress={() => {
            hangUpHandler?.();
          }}
        />
      </View>
    </View>
  );
};
export default Player;
