import {
  Button,
  PanResponderInstance,
  StyleSheet,
  View,
  Text,
  PanResponder,
} from "react-native";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

  useEffect(() => {
    setPanResponderRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: async (evt, gestureState) => {
          // 检测是否按在了元素1上
          const touchIndex = await getTouchedElementIndex(
            evt.nativeEvent.pageX,
            evt.nativeEvent.pageY,
            "onPanResponderGrant"
          );
          console.log("onPanResponderGrant", touchIndex);
          if (touchIndex === 0) {
            // 假设元素1的索引为0
            console.log("开始录音");
            // const { status } = await Audio.requestPermissionsAsync();
            // if (status === "granted") {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: true,
              playsInSilentModeIOS: true,
            });
            // await Audio.setAudioModeAsync({
            //   allowsRecordingIOS: true,
            //   playsInSilentModeIOS: true,
            //   // playThroughEarpieceAndroid: false,
            // });
            const { recording } = await Audio.Recording.createAsync(
              Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            // const recording = new Audio.Recording();
            // await recording.prepareToRecordAsync(
            //   Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            // );
            // await recording.startAsync();
            // setRecording(recording);
            // }
          }
        },
        onPanResponderMove: async (evt, gestureState) => {
          // 检测手指移动过程中是否触碰到了元素5
          const touchIndex = await getTouchedElementIndex(
            evt.nativeEvent.pageX,
            evt.nativeEvent.pageY,
            "onPanResponderGrant"
          );
          console.log(isOnCancelBtn.current, "isOnCancelBtn.current");
          console.log("onPanResponderMove", touchIndex);

          if (touchIndex === 4) {
            // 假设元素5的索引为4
            isOnCancelBtn.current = true;
          } else {
            isOnCancelBtn.current = false;
          }
        },
        onPanResponderRelease: async (evt, gestureState) => {
          // 松开手指时结束录音并尝试播放
          if (isOnCancelBtn.current) {
            console.log("取消录音");
            if (recording) {
              recording.stopAndUnloadAsync();
              setRecording(null);
            }
            return;
          }
          if (recording) {
            console.log("Stopping recording..");
            // this line is critical for routing audio back through the speaker instead of the earpiece
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: false,
            });
            console.log("结束录音");
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            setRecording(null);
            if (uri) {
              console.log("播放录音", uri);
              setTempUri(uri);
              const { sound } = await Audio.Sound.createAsync({ uri });
              await sound.playAsync();
              const uploadedphotos = await uploadImages([
                {
                  uri: uri,
                  name: "audio-" + Math.random() + ".caf",
                  type: "audio/mpeg",
                },
              ]);
              console.log(uploadedphotos, "uploadedphotos");
            }
          }
        },
      })
    );
  }, [recording]);

  // 功能函数：根据触摸位置判断触碰到的元素索引
  const getTouchedElementIndex = (pageX, pageY, type) => {
    return new Promise((res, rej) => {
      console.log(type, "type---------");
      let touchedIndex = -1;
      elementsRef.current.forEach((element, index) => {
        if (element) {
          // console.log("element");
          element.measure((x, y, width, height, pageXElem, pageYElem) => {
            if (
              pageX >= pageXElem &&
              pageX <= pageXElem + width &&
              pageY >= pageYElem &&
              pageY <= pageYElem + height
            ) {
              debouncedHandleTextChange(() => {
                console.log(pageX, pageY, pageXElem, pageYElem);
                console.log(`Element ${index} is touchedtouchedtouchedtouched`);
              });

              touchedIndex = index;
              res(touchedIndex);
            }
          });
        }
      });
      console.log("getTouchedElementIndex", touchedIndex);
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
    <View style={styles.container}>
      <Text>操作说明</Text>
      <Text>{tempUri}</Text>
      <View>
        {/* 点击按钮播放音频 */}
        <Button title="播放录音" onPress={playSound} />
      </View>
      {panResponderRef?.panHandlers && (
        <View {...panResponderRef?.panHandlers} style={styles.container}>
          {Array.from({ length: 10 }, (_, index) => (
            <View
              key={index}
              ref={(el) => (elementsRef.current[index] = el)}
              style={styles.element}
            >
              <Text>{index}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// 样式定义
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  element: {
    width: 50,
    height: 50,
    margin: 10,
    backgroundColor: "gray",
  },
});
export default AudioRecorder;
