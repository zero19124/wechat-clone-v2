import {
  Button,
  PanResponderInstance,
  StyleSheet,
  View,
  Text,
  PanResponder,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useNavigation } from "expo-router";
import _ from "lodash";

import { useTranslation } from "react-i18next";
import { useTheme } from "@/theme/useTheme";
import { getSize } from "utils";
import { Audio } from "expo-av";
import { uploadImages } from "@/hooks/useImagePicker";
const debouncedHandleTextChange = _.debounce((handler) => {
  handler();
}, 200);
const AudioRecorder = () => {
  const elementsRef = useRef([]);
  const [tempUri, setTempUri] = useState();
  const [panResponderRef, setPanResponderRef] =
    useState<PanResponderInstance | null>(null);
  const [recording, setRecording] = useState(null);
  const isOnCancelBtn = useRef(false);
  const [isOnCheckBtn, setIsOnCheckBtn] = useState(false);
  const setIsOnCancelBtn = (val: boolean) => {
    isOnCancelBtn.current = val;
  };
  const cleanRecState = (cleanType: "normal" | "onCheck" = "normal") => {
    console.log("cleanRecState");
    if (cleanType === "normal") {
      setIsOnCheckBtn(false);
      setIsOnCancelBtn(false);
      setRecording(null);
    }
    if (cleanType === "onCheck") {
      setIsOnCancelBtn(false);
      setRecording(null);
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
        console.log("结束录音");
        const uri = recording.getURI();
        setTempUri(uri);
        if (onCheckState) {
          cleanRecState("onCheck");
          return;
        }
        if (uri) {
          cleanRecState();
          console.log("播放录音", uri);
          const { sound } = await Audio.Sound.createAsync({ uri });
          await sound.playAsync();
          // const uploadedphotos = await uploadImages([
          //   {
          //     uri: uri,
          //     name: "audio-" + Math.random() + ".m4a",
          //     type: "audio/mpeg",
          //   },
          // ]);
          // console.log(uploadedphotos, "uploadedphotos");
        }
      }
    },
    [isOnCheckBtn, isOnCancelBtn.current, recording]
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
    setRecording(recording);
    // console.log(recording, "setRecording");
  };
  useEffect(() => {
    setPanResponderRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
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
          if (touchIndex === 0) {
            onCheckState = true;
            setIsOnCheckBtn(true);
          } // 如果在第二个元素上
          if (touchIndex === 1) {
            setIsOnCancelBtn(true);
          }
          console.log(
            isOnCancelBtn.current,
            "isOnCancelBtn.current",
            isOnCheckBtn
          );
          console.log("onPanResponderRelease3", touchIndex);
          // 松开手指时结束录音并尝试播放
          //  if on the second ele than cancel the recording
          if (isOnCancelBtn.current && recording) {
            stopRecordingHandler("cancel");
            return;
          }
          if (recording) {
            stopRecordingHandler("stop", onCheckState);
          }
        },
      })
    );
  }, [recording, isOnCancelBtn.current, isOnCheckBtn]);

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
            console.log(e, "eeeeee");
          }
        }
      });

      // console.log("getTouchedElementIndex", touchedIndex);
    });
  };

  const playSound = async () => {
    // 创建一个新的音频对象

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
    <View style={{ position: "absolute", bottom: 0, right: 0, left: 0 }}>
      <Text>{tempUri}</Text>
      <View>
        {/* 点击按钮播放音频 */}
        {isOnCheckBtn && (
          <View>
            <Button title="播放录音" onPress={playSound} />
            <Button
              title="send"
              onPress={() => {
                setTempUri("");
                setIsOnCheckBtn(false);
              }}
            />
          </View>
        )}
      </View>
      {recording && (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {Array.from({ length: 2 }, (_, index) => (
            <View
              key={index}
              ref={(el) => (elementsRef.current[index] = el)}
              style={{
                width: 50,
                height: 50,
                margin: 10,
                backgroundColor: "gray",
              }}
            >
              <Text>{index ? "cancel" : "check it"}</Text>
            </View>
          ))}
        </View>
      )}

      <View
        {...panResponderRef?.panHandlers}
        style={{ backgroundColor: "red" }}
      >
        <TouchableOpacity
          style={{ backgroundColor: "blue", width: "100%", height: 59 }}
          onPress={() => {
            stopRecordingHandler();
            console.log("onPress");
          }}
          onPressIn={async () => {
            console.log("onPressIn");
            await startRecordingHandler();
          }}
        >
          <Text>startRecord {recording ? "true" : "false"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AudioRecorder;
