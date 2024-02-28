import VideoCallBtn from "@/component/complex/VideoCallBtn";
import { useTheme } from "@/theme/useTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Button, PanResponder, View, Text } from "react-native";
import { RTCView } from "react-native-webrtc";
import { getSize } from "utils";
import VideoCallIcon from "@/icons/keyboard-panel/video-call.svg";
import HangUpBtn from "@/component/complex/HangUpBtn";

// 播放视频组件
const Player = ({
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
              bottom: 0,
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
        <Button
          title="pre-call"
          onPress={() => {
            preCall?.();
          }}
        />

        {awaiting && (
          <Text
            style={{
              color: themeColor.text3,
              marginVertical: getSize(12),
              fontSize: getSize(14),
            }}
          >
            {t("Awaiting response...")}
          </Text>
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
