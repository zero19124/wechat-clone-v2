import React, { useRef, useState } from "react";
import {
  View,
  Button,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
} from "react-native";
import { Camera, CameraCapturedPicture } from "expo-camera";
import { uploadImages } from "@/hooks/useImagePicker";
import { ResizeMode, Video } from "expo-av";
import useSendMsg from "@/hooks/useSendMsg";
import { useUser } from "app/store/user";
import { useChatList } from "app/store/chatList";
import { useNavigation } from "expo-router";

export default () => {
  const cameraRef = useRef<Camera>(null);
  const { sendMsgHandler } = useSendMsg();
  const navigator = useNavigation();
  const { userInfo } = useUser().userStore;
  const { chatListStore, getChatList, setChatListStore } = useChatList();
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

  const startRecording = async () => {
    if (cameraRef.current) {
      const recorded = await cameraRef.current.recordAsync();
      setVideo(recorded.uri);
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current) {
      try {
        const video = await cameraRef.current.stopRecording();
        console.log("Video recorded:", video);
        // 将视频上传至服务器
        // uploadFile(video.uri);
      } catch (e) {
        console.log("error:" + e);
      }
    }
  };
  const getContent = () => {
    if (photo) {
      return (
        <>
          <Button
            title="back"
            onPress={() => {
              setPhoto(null);
            }}
          />
          <Image
            style={{ width: 300, height: 300 }}
            source={{ uri: photo.uri }}
          ></Image>
          <Button
            title="Send"
            onPress={async () => {
              const uploadedphotos = await uploadImages([
                { uri: photo.uri, name: Math.random() + "", type: "image" },
              ]);
              console.log("uploadedphotos-camera", uploadedphotos);
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
          />
        </>
      );
    }
    if (video) {
      return (
        <>
          <Button
            title="back"
            onPress={() => {
              setVideo("");
            }}
          />
          <Video
            playsInSilentLockedModeIOS={true}
            // ref={video}
            style={{ width: "80%", height: 200 }}
            // style={styles.video}
            source={{
              uri: video,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </>
      );
    }
    return (
      <>
        <Camera style={{ flex: 1 }} ref={cameraRef} />
        <TouchableOpacity
          onPress={takePhoto}
          onLongPress={startRecording}
          onPressOut={stopRecording}
        >
          <Text>Press to take photo, Long Press to record video</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView style={{ width: "100%", height: "80%" }}>
      {getContent()}
    </SafeAreaView>
  );
};
