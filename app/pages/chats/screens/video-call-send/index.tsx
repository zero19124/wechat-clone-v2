/**
 * Sample React Native AppText
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Button,
  Dimensions,
  ScrollView,
  Animated,
  PanResponder,
} from "react-native";

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from "react-native-webrtc";

import config from "@/config/index";
import { useUser } from "app/store/user";
import { PusherContext } from "@/hooks/usePusherProvider";
import { useNavigation } from "expo-router";
import { useChatList } from "app/store/chatList";
// export const toIdTemp = "65ca5993d90c67e46d6b01ac";
// const toIdTemp = "65ca596cd90c67e46d6b01a7";

const VideoCallSender = () => {
  const navigator = useNavigation();
  const { userStore } = useUser();
  const pusherContext = useContext(PusherContext);
  const userId = useMemo(() => userStore.userInfo?._id || "222", [userStore]);
  const socket = pusherContext.socket;
  const { chatListStore } = useChatList();
  const toId = useMemo(() => {
    console.log(chatListStore.curConvo, "toIdtoIdtoId");
    return chatListStore.curConvo?.curReceiverInfo?._id || "";
  }, [chatListStore?.curConvo]);
  // 1. 创建实例
  const [peer, setPeers] = useState(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    })
  );

  const [local_stream, setLocal_stream] = useState();
  const [remote_stream, setRemote_stream] = useState();
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const constraints = {
    audio: true,
    video: {
      facingMode: isFrontCamera ? "environment" : "user", // 切换前后摄像头
    },
  };

  const initRemote = useCallback(
    async (data: { to: string; from: string; answer: boolean }) => {
      // console.log("ok11111", socket);
      // here can get toid
      localStream = await mediaDevices.getUserMedia({
        audio: true,
        video: { facingMode: isFrontCamera ? "environment" : "user" },
      });
      setLocal_stream(localStream);
      console.log(localStream, "local_stream-call");

      // 2. 将本地视频流添加到实例中
      localStream.getTracks().forEach((track) => {
        peer.addTrack(track, localStream);
      });
      // 3. 接收远程视频流 在candid后触发
      peer.ontrack = async (event) => {
        console.log("remoteStream");
        let [remoteStream] = event.streams;
        setRemote_stream(remoteStream);
      };

      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      console.log("setLocalDescription(offer)");
      socket.emit("offer-test", {
        to: toId, // 响应端
        from: userId, // 呼叫端
        offer,
      });

      try {
        console.log("offer-test", toId + "-toId");

        peer.onicecandidate = (event) => {
          console.log("onicecandidate+" + toId);

          if (event.candidate) {
            socket.emit("candid", {
              to: toId, // 接收端
              candid: event.candidate,
              from: userId,
            });
          }
        };
        // step4;
        // 接收 candidate
        socket.on("candid", (data) => {
          console.log("candid-testcandid-testcandid-test");
          let candid = new RTCIceCandidate(data.candid);
          peer.addIceCandidate(candid);
          // 对接完 然后开始推
        });
        console.log("ok3");
      } catch (e) {
        console.log(e, "eee");
      }
    },
    [local_stream]
  );
  // 获取本地摄像头
  const getMedia = async () => {
    console.log("getMedia-rec");
    socket.on("answer", (data) => {
      console.log("连接成功-answer-send", data.from, data.to);
      peer.setRemoteDescription(data.answer);
    });
    socket.on("end-call", (data) => {
      console.log("end-call-send", peer);
      setTimeout(() => {
        navigator.canGoBack() && navigator.goBack();
      }, 300);
    });
    // start make phone call
    socket.on("pre-call-answer-result", (data) => {
      console.log("pre-call-answer-result:", data);
      if (data.answer) {
        // set the toId1 cuz if the receiver didnt go to chat page then toId1 will be null
        initRemote();
      } else {
        alert("rejected!");
      }
    });
    const localStream = await mediaDevices.getUserMedia({
      audio: true,
      video: { facingMode: isFrontCamera ? "environment" : "user" },
    });
    setLocal_stream(localStream);
    console.log(localStream, "localStream");
  };
  // if the user can call preCall then they must be on the page
  const preCall = () => {
    console.log(chatListStore.curConvo, "preCall-chatListStore.curConvo");
    socket.emit("pre-call", {
      to: toId, // 呼叫端 Socket ID
      from: userId,
    });
  };
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
  // 播放视频组件
  const Player = () => {
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
          <RTCView style={{ flex: 1 }} streamURL={local_stream?.toURL?.()} />
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
                zIndex: 2,
              }}
              streamURL={remote_stream?.toURL?.()}
            />
          </Animated.View>
        </View>
        <View style={{ position: "absolute", bottom: 48, left: 32 }}>
          <Button
            title="end-call"
            onPress={() => {
              console.log(peer, "peer");
              peer.close();
              local_stream.getTracks().forEach((track) => {
                track.stop();
              });
              navigator.goBack();
              // the same only the user who get in this page get toid
              socket?.emit("end-call", {
                to: toId, // 呼叫端 Socket ID
                from: userId,
              });
            }}
          />
          <Button
            title="pre-call"
            onPress={() => {
              preCall();
            }}
          />
          <Button
            title="change camera"
            onPress={() => {
              setIsFrontCamera(!isFrontCamera);
            }}
          />
        </View>
      </View>
    );
  };

  useEffect(() => {
    getMedia();
    console.log(toId, "toId-send");

    return () => {
      peer.close();
    };
  }, []);
  return <Player />;
};

export default VideoCallSender;
