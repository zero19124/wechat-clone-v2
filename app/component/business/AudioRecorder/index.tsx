import {
  PanResponderInstance,
  View,
  Text,
  PanResponder,
  TouchableOpacity,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import _ from "lodash";

import { useTranslation } from "react-i18next";
import { useTheme } from "@/theme/useTheme";
import { getSize } from "utils";
import { Audio } from "expo-av";
import { uploadImages } from "@/hooks/useImagePicker";
import { PortalRef } from "app/_layout";
import { Portal } from "../Portal";
import Button from "@/component/base/Button/Button";
import Toast from "@/component/base/Toast";
import { RecordingObject } from "expo-av/build/Audio";
const debouncedHandleTextChange = _.debounce((handler) => {
  handler();
}, 200);
const AudioRecorder = ({ onVoiceEnd }) => {
  const { themeColor } = useTheme();
  const elementsRef = useRef([]);
  const [tempUri, setTempUri] = useState();
  const { t } = useTranslation();
  const [panResponderRef, setPanResponderRef] =
    useState<PanResponderInstance | null>(null);
  const [recording, setRecording] =
    useState<RecordingObject["recording"]>(null);
  const durationMillis = useRef(-1);
  const [isOnCancelBtn, setIsOnCancelBtn] = useState(false);
  const [isOnCheckBtn, setIsOnCheckBtn] = useState(false);
  useEffect(() => {
    console.log(tempUri, "tempUri");
  }, [tempUri]);
  const cleanRecState = (cleanType: "normal" | "onCheck" = "normal") => {
    console.log("cleanRecState");
    if (cleanType === "normal") {
      setIsOnCheckBtn(false);
      setIsOnCancelBtn(false);
      setRecording(null);
    }
    if (cleanType === "onCheck") {
      setIsOnCancelBtn(false);
    }
  };
  const stopRecordingHandler = useCallback(
    async (stopType: "stop" | "cancel" = "stop", onCheckState?: boolean) => {
      console.log(
        onCheckState,
        "Stopping recording..",
        recording ? "yes" : "false",
        stopType
      );
      // recording.setOnRecordingStatusUpdate(null);
      // if (durationMillis.current < 1500) {
      //   Toast.info(t("too short"));
      //   cleanRecState();
      //   return;
      // }
      // this line is critical for routing audio back through the speaker instead of the earpiece
      // await Audio.setAudioModeAsync({
      //   allowsRecordingIOS: false,
      // });
      if (!recording) {
        return;
      }
      console.log(isOnCheckBtn, "stopRecordingHandler-type=", stopType);
      await recording.stopAndUnloadAsync();

      if (stopType === "cancel") {
        console.log("取消录音");
        cleanRecState();
      } else {
        console.log("结束录音", isOnCheckBtn);
        const uri = recording.getURI();
        setTempUri(uri);
        // two way
        // 1 direct to send
        // 2 press send btn and send
        if (onCheckState) {
          cleanRecState("onCheck");
          return;
        }
        if (uri) {
          cleanRecState();
          console.log("播放录音", uri);
          // const { sound } = await Audio.Sound.createAsync({ uri });
          // await sound.playAsync();
          onVoiceEnd?.(uri);
        }
      }
    },
    [isOnCheckBtn, isOnCancelBtn, recording]
  );

  const startRecordingHandler = async (type = "press") => {
    console.log(type, "startRecordingHandler-type", recording);
    if (recording) {
      await stopRecordingHandler();
    }
    // reset
    setIsOnCheckBtn(false);
    console.log("开始录音");
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    // 设置状态更新回调函数
    recording.setOnRecordingStatusUpdate((status) => {
      if (!status.isRecording) return;
      // status.durationMillis 包含了当前录音的时长（毫秒）
      durationMillis.current = status.durationMillis;
      console.log("当前录音时长（毫秒）:", status.durationMillis);
    });
    setRecording(recording);
    // console.log(recording, "setRecording");
  };
  useEffect(() => {
    setPanResponderRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: async (evt, gestureState) => {
          console.log("onPanResponderMove");
          const touchIndex = await getTouchedElementIndex(
            evt.nativeEvent.pageX,
            evt.nativeEvent.pageY,
            "onPanResponderRelease"
          );
          if (touchIndex === 0) {
            setIsOnCheckBtn(true);
          } else {
            setIsOnCheckBtn(false);
          }
          // 如果在第二个元素上
          if (touchIndex === 1) {
            setIsOnCancelBtn(true);
          } else {
            setIsOnCancelBtn(false);
          }
        },
        onPanResponderRelease: async (evt, gestureState) => {
          console.log("onPanResponderRelease");
          // 检测手指移动过程中是否触碰到了元素5
          const touchIndex = await getTouchedElementIndex(
            evt.nativeEvent.pageX,
            evt.nativeEvent.pageY,
            "onPanResponderRelease"
          );
          console.log("onPanResponderRelease2", touchIndex);
          // 如果在第一个元素上
          let onCheckState;
          let onCancelState;
          if (touchIndex === 0) {
            onCheckState = true;
            setIsOnCheckBtn(true);
          } // 如果在第二个元素上
          if (touchIndex === 1) {
            onCancelState = true;
            setIsOnCancelBtn(true);
          }
          console.log(isOnCancelBtn, "isOnCancelBtn.current", isOnCheckBtn);
          console.log("onPanResponderRelease3", touchIndex);
          // 松开手指时结束录音并尝试播放
          //  if on the second ele than cancel the recording
          if (onCancelState && recording) {
            stopRecordingHandler("cancel");
            return;
          }
          if (recording) {
            stopRecordingHandler("stop", onCheckState);
          }
        },
      })
    );
  }, [recording, isOnCancelBtn, isOnCheckBtn]);

  // 功能函数：根据触摸位置判断触碰到的元素索引
  const getTouchedElementIndex = (pageX, pageY, type) => {
    console.log("getTouchedElementIndex");
    return new Promise((res, rej) => {
      // console.log(type, "type---------");
      let touchedIndex = -1;
      const lastIndex = elementsRef.current.length - 1;
      elementsRef.current.forEach(async (element, index) => {
        if (element) {
          console.log(element.measure, "element.measure");
          try {
            // console.log("element");
            await element.measure(
              (x, y, width, height, pageXElem, pageYElem) => {
                if (
                  pageX >= pageXElem &&
                  pageX <= pageXElem + width &&
                  pageY >= pageYElem &&
                  pageY <= pageYElem + height
                ) {
                  // debouncedHandleTextChange(() => {
                  //   console.log(
                  //     pageX,
                  //     pageY,
                  //     pageXElem,
                  //     pageYElem,
                  //     "debouncedHandleTextChange"
                  //   );
                  //   console.log(
                  //     `Element ${index} is touchedtouchedtouchedtouched`
                  //   );
                  // });

                  touchedIndex = index;
                  console.log("touchedIndex got" + touchedIndex);
                  res(touchedIndex);
                }
                if (index === lastIndex) {
                  res(touchedIndex);
                }
              }
            );
          } catch (e) {
            console.log(e, "audio-recorder-error");
          }
        }
      });

      // console.log("getTouchedElementIndex", touchedIndex);
    });
  };

  const playSound = async () => {
    Audio.setAudioModeAsync({ allowsRecordingIOS: false });
    const sound = new Audio.Sound();

    try {
      console.log(tempUri, "tempUri");
      // 卸载之前的音频，以防重复播放

      await sound.unloadAsync();
      // 加载音频文件，这里假设你有一个有效的音频文件URI
      await sound.loadAsync({ uri: tempUri + "" });
      // await sound.loadAsync({
      //   uri: "http://172.20.10.3:4000/files/1709474107144.caf" + "",
      // });
      // 播放音频
      await sound.playAsync();
    } catch (error) {
      // 错误处理
      console.error("播放音频时发生错误", error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View {...panResponderRef?.panHandlers}>
        {recording && (
          <Portal>
            <View
              style={{
                backgroundColor: themeColor.overlay4,
                position: "absolute",
                height: "100%",
                width: "100%",
                bottom: 0,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  bottom: getSize(100),
                  left: 0,
                  right: 0,
                  paddingHorizontal: getSize(32),
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* 点击按钮播放音频 */}
                {isOnCheckBtn && tempUri && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      position: "absolute",
                      width: getSize(375),
                      paddingHorizontal: 24,
                      bottom: getSize(110),
                    }}
                  >
                    {
                      <Button
                        type="primary"
                        style={{ marginBottom: 12 }}
                        onPress={() => {
                          console.log(tempUri + "播放录音");
                          playSound();

                          return;
                        }}
                      >
                        {t("播放录音")}
                      </Button>
                    }
                    <Button
                      type="primary"
                      onPress={() => {
                        setTempUri("");
                        cleanRecState();
                        onVoiceEnd?.(tempUri);
                      }}
                    >
                      {t("send")}
                    </Button>
                    <Button
                      type="primary"
                      onPress={() => {
                        setTempUri("");
                        cleanRecState();
                      }}
                    >
                      {t("cancel")}
                    </Button>
                  </View>
                )}
                <View
                  ref={(el) => (elementsRef.current[0] = el)}
                  style={{
                    borderRadius: getSize(75),
                    width: getSize(75),
                    height: getSize(75),
                    margin: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: isOnCheckBtn
                      ? themeColor.white
                      : themeColor.text3,
                  }}
                >
                  <Text>{t("check it")}</Text>
                </View>
                <View
                  ref={(el) => (elementsRef.current[1] = el)}
                  style={{
                    borderRadius: getSize(75),
                    width: getSize(75),
                    height: getSize(75),
                    margin: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: isOnCancelBtn
                      ? themeColor.white
                      : themeColor.text3,
                  }}
                >
                  <Text>{t("cancel")}</Text>
                </View>
              </View>
            </View>
          </Portal>
        )}
        <TouchableOpacity
          style={{
            borderRadius: 4,
            paddingVertical: 10,
            backgroundColor: themeColor.fill1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
          onPress={() => {
            stopRecordingHandler();
            console.log("onPress");
          }}
          onPressIn={async () => {
            console.log("onPressIn");
            await startRecordingHandler();
          }}
        >
          <Text style={{ fontSize: 16 }}>
            {recording ? t("Release to Send") : t("Hold to Talk")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AudioRecorder;
