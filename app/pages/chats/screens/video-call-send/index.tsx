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
import { View, Button, Text, Animated, PanResponder } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import {
  RTCPeerConnection,
  RTCIceCandidate,
  mediaDevices,
} from "react-native-webrtc";

import { useUser } from "app/store/user";
import { PusherContext } from "@/hooks/usePusherProvider";
import { useNavigation } from "expo-router";
import { useChatList } from "app/store/chatList";
import HangUpBtn from "@/component/complex/HangUpBtn";
import { getSize } from "utils";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/theme/useTheme";
import VideoCallBtn, {
  VideoCallBtnSize,
} from "@/component/complex/VideoCallBtn";
import VideoCallPlayer from "../component/VideoCallPlayer";
// export const toIdTemp = "65ca5993d90c67e46d6b01ac";
// const toIdTemp = "65ca596cd90c67e46d6b01a7";

const VideoCallSender = () => {
  const navigator = useNavigation();
  const { userStore } = useUser();
  const { themeColor } = useTheme();
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
          setAwaiting(false);
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
        navigator.goBack();
      }
    });
    const localStream = await mediaDevices.getUserMedia({
      audio: true,
      video: { facingMode: isFrontCamera ? "environment" : "user" },
    });
    setLocal_stream(localStream);
    // console.log(localStream, "localStream");
  };
  // if the user can call preCall then they must be on the page
  const preCall = () => {
    console.log(chatListStore.curConvo, "preCall-chatListStore.curConvo");
    socket.emit("pre-call", {
      to: toId, // 呼叫端 Socket ID
      from: userId,
    });
  };

  useEffect(() => {
    getMedia();
    console.log(toId, "toId-send");

    return () => {
      peer.close();
    };
  }, []);
  const [awaiting, setAwaiting] = useState(true);

  // setIsFrontCamera(!isFrontCamera);
  return (
    <VideoCallPlayer
      awaiting={awaiting}
      preCall={() => {
        preCall();
      }}
      hangUpHandler={() => {
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
      switchHandler={() => {
        setIsFrontCamera(!isFrontCamera);
      }}
      local_stream={local_stream}
      remote_stream={remote_stream}
    />
  );
};

export default VideoCallSender;
