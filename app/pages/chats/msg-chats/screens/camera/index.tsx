import { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import CloseIcon from "@/icons/common/close.svg";
import CutFilledIcon from "@/icons/chats/cut-filled.svg";
import BgBlurFilledIcon from "@/icons/chats/bg-blur-filled.svg";
import EmojiFilledIcon from "@/icons/chats/emoji-filled.svg";
import TextFilledIcon from "@/icons/chats/text-filled.svg";
import { Camera, CameraCapturedPicture } from "expo-camera";
import { uploadImages } from "@/hooks/useImagePicker";
import { ResizeMode, Video } from "expo-av";
import useSendMsg from "@/hooks/useSendMsg";
import { useUser } from "app/store/user";
import { useChatList } from "app/store/chatList";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { getSize } from "utils";
import { useTheme } from "@/theme/useTheme";
import Fade from "@/component/base/Transitions/Fade";
import { useTranslation } from "react-i18next";
import Button from "@/component/base/Button/Button";
import { FontAwesome5 } from "@expo/vector-icons";
import Toast from "@/component/base/Toast";
export default () => {
  const cameraRef = useRef<Camera>(null);
  const videoRef = useRef<Video>(null);
  const params = useLocalSearchParams<{ useType: string }>();
  console.log(params, "params,params");
  const { themeColor } = useTheme();
  const router = useRouter();
  const [recordingSecond, setRecordingSecond] = useState(0);
  const { sendMsgHandler } = useSendMsg();
  const intervalId = useRef(-1);
  const { t } = useTranslation();
  const navigator = useNavigation();
  const { userInfo } = useUser().userStore;
  const [animationState, setAnimationState] = useState(true);
  const { chatListStore } = useChatList();
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const [video, setVideo] = useState("");
  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("Photo taken:", photo);
      setPhoto(photo);
      // uploadImages([{ uri: photo.uri }]);
      // 将照片上传至服务器
      // uploadFile(photo.uri);
    }
  };
  const cleanRecodingTime = (cb: () => void) => {
    clearInterval(intervalId.current);
    cb?.();

    setTimeout(() => {
      setRecordingSecond(0);
    }, 200);
  };
  const startRecording = async () => {
    if (intervalId.current) {
      intervalId.current = -1;
    }
    intervalId.current = setInterval(() => {
      setRecordingSecond((val) => {
        console.log(val, "val");
        return (val += 1);
      });
    }, 1000) as unknown as number;
    setTimeout(() => {
      cleanRecodingTime(stopRecording);
    }, 5100);
    if (cameraRef.current) {
      const recorded = await cameraRef.current.recordAsync();
      setVideo(recorded.uri);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimationState(false);
    }, 3300);
  }, []);
  const stopRecording = async () => {
    if (cameraRef.current) {
      cleanRecodingTime(stopRecording);
      try {
        await cameraRef.current.stopRecording();
        console.log("Video recorded:", video);

        setTimeout(() => {
          videoRef.current?.playAsync();
        }, 200); // 将视频上传至服务器
        // uploadFile(video.uri);
      } catch (e) {
        console.log("error:" + e);
      }
    }
  };

  const ImgAndVideoWrapper = ({ children, sendHandler }) => {
    const iconSize = 36;
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ position: "absolute", top: getSize(90), zIndex: 1 }}
          onPress={() => {
            setPhoto(null);
            setVideo("");
          }}
        >
          <Text
            style={{ color: themeColor.white, fontSize: 18, marginLeft: 24 }}
          >
            {t("Cancel")}
          </Text>
        </TouchableOpacity>
        {children}
        <View
          style={{
            flex: 1,
            backgroundColor: themeColor.bg5,
            flexDirection: "row",
            padding: 24,
          }}
        >
          <View
            style={{
              width: "100%",
              marginTop: 16,
              height: 20,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Toast.loading(t("Loading"));
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: getSize(16),
              }}
            >
              <FontAwesome5 name="pen" size={24} color={themeColor.white} />
              <EmojiFilledIcon
                width={iconSize}
                height={iconSize}
                fill={themeColor.white}
              />
              <TextFilledIcon
                width={iconSize}
                height={iconSize}
                fill={themeColor.white}
              />

              <CutFilledIcon
                width={iconSize}
                height={iconSize}
                fill={themeColor.white}
              />
              <BgBlurFilledIcon
                width={iconSize}
                height={iconSize}
                fill={themeColor.white}
              />
            </TouchableOpacity>
            <Button
              style={{ width: 70 }}
              type="primary"
              onPress={() => {
                sendHandler();
              }}
            >
              {t("Send")}
            </Button>
          </View>
        </View>
      </View>
    );
  };
  const getContent = () => {
    // if (true) {
    if (photo) {
      return (
        <ImgAndVideoWrapper
          sendHandler={async () => {
            const uploadedphotos = await uploadImages([
              { uri: photo.uri, name: Math.random() + ".jpg", type: "image" },
            ]);
            console.log("uploadedphotos-photo", uploadedphotos, params);
            if (params.useType === "moments") {
              navigator.goBack();
              setTimeout(() => {
                navigator.navigate(
                  "pages/discover/moments/screens/post-moments/index",
                  {
                    uploadedImgs: uploadedphotos,
                  }
                );
              }, 100);
              return;
            }
            sendMsgHandler({
              val: uploadedphotos[0],
              userId: userInfo?._id + "",
              type: "img",
              convoId: chatListStore.curConvo?.convoId + "",
              doneHandler: () => {
                navigator.goBack();
              },
            });
          }}
        >
          <Image
            style={{ width: "100%", height: "80%" }}
            source={{
              uri:
                // "https://placekitten.com/302/302",
                photo.uri,
            }}
          ></Image>
        </ImgAndVideoWrapper>
      );
    }
    if (video) {
      // if (true) {
      return (
        <ImgAndVideoWrapper
          sendHandler={async () => {
            const uploadedphotos = await uploadImages([
              { uri: video, name: Math.random() + ".mp4", type: "image" },
            ]);
            console.log('video not support');
            return;
            console.log("uploadedphotos-camera", uploadedphotos);
            if (params.useType === "moments") {
              navigator.goBack();
              setTimeout(() => {
                navigator.navigate(
                  "pages/discover/moments/screens/post-moments/index",
                  {
                    uploadedImgs: uploadedphotos,
                  }
                );
              }, 100);
              return;
            }
            sendMsgHandler({
              val: uploadedphotos[0],
              userId: userInfo?._id + "",
              type: "video",
              convoId: chatListStore.curConvo?.convoId + "",
              doneHandler: () => {
                navigator.goBack();
              },
            });
          }}
        >
          <Video
            ref={videoRef}
            playsInSilentLockedModeIOS={true}
            // ref={video}
            style={{ width: "100%", height: "80%" }}
            // style={styles.video}
            source={{
              // uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",

              uri: video,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </ImgAndVideoWrapper>
      );
    }
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            navigator.goBack();
          }}
          style={{
            marginLeft: 24,
            position: "absolute",
            zIndex: 3,
            top: getSize(70),
          }}
        >
          <CloseIcon
            width={getSize(28)}
            height={getSize(28)}
            fill={themeColor.white}
          />
        </TouchableOpacity>
        <Camera style={{ flex: 1 }} ref={cameraRef} />
        <View
          style={{
            backgroundColor: themeColor.bg5,
            padding: 24,
            height: "20%",
            alignItems: "center",
          }}
        >
          <View style={{ position: "absolute", top: -getSize(80), zIndex: 3 }}>
            {
              <Fade in={!!recordingSecond}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    color: themeColor.white,
                  }}
                >
                  {t("Recording... ")}
                  {recordingSecond + ""}
                </Text>
              </Fade>
            }

            <Fade in={animationState}>
              <Text
                style={{
                  color: themeColor.white,
                  textAlign: "center",
                }}
              >
                {t("tap to take photo or hold to record video")}
              </Text>
            </Fade>
          </View>
          <TouchableOpacity
            onPress={takePhoto}
            onLongPress={startRecording}
            onPressOut={stopRecording}
          >
            <View
              style={{
                // transform: [{ translateX: -getSize(30) }],
                justifyContent: "center",
                alignItems: "center",
                // borderRadius: getSize(70),
                // width: getSize(70),
                // height: getSize(70),
              }}
            >
              <View
                style={{
                  borderBlockColor: themeColor.bg5,
                  borderWidth: 5,
                  zIndex: 3,
                  position: "absolute",
                  backgroundColor: themeColor.white,
                  borderRadius: getSize(70),
                  width: getSize(70),
                  height: getSize(70),
                }}
              ></View>

              <View
                style={{
                  transform: [
                    // { translateX: -getSize(37.5) },
                    { translateY: 0 },
                  ],
                  // ...StyleSheet.absoluteFillObject,
                  borderRadius: getSize(72),
                  backgroundColor: themeColor.white,
                  width: getSize(72),
                  height: getSize(72),
                }}
              ></View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return <View style={{ flex: 1 }}>{getContent()}</View>;
};
