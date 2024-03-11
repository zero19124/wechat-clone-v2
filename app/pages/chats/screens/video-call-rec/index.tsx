/**
 * Sample React Native AppText
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { View, Button, Dimensions } from "react-native";

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCView,
  mediaDevices,
} from "react-native-webrtc";
import io from "socket.io-client";
import config from "@/config/index";
import { useUser } from "app/store/user";
import { PusherContext } from "@/hooks/usePusherProvider";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useChatList } from "app/store/chatList";
import VideoCallPlayer from "../component/VideoCallPlayer";
// const toIdTemp = "65ca596cd90c67e46d6b01a7";
// const toIdTemp = "65ca5993d90c67e46d6b01ac";
const VideoCallRec = () => {
  const { userStore } = useUser();
  const params = useLocalSearchParams<{
    answer: boolean;
    to: string;
    from: string;
  }>();
  const pusherContext = useContext(PusherContext);
  const socket = pusherContext.socket;
  const navigator = useNavigation();
  const userId = useMemo(() => userStore.userInfo?._id || "222", [userStore]);
  const { chatListStore } = useChatList();
  const toId = useMemo(() => {
    console.log(params, "params-rec");
    // 没有就取路由的 因为当前用户没有进入过信息页面 拿不到当前对话信息
    // 接听后 拿到from from其实就是要发送回去的to 因为call是from打来的 然后要answer回去
    if (!chatListStore.curConvo) {
      return params.from;
    }
    return (
      chatListStore.curConvo?.curReceiverInfo?._id ||
      "curReceiverInfo?._id is null"
    );
  }, [chatListStore?.curConvo, params]);
  const [peer, setPeer] = useState(
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
    async (offerData) => {
      // console.log("ok11111", socket);
      // 1. 创建实例
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
      // 发送 answer
      console.log(offerData, "offerData");
      // let offer = new RTCSessionDescription(offerData.offer);
      await peer.setRemoteDescription(offerData.offer);
      let answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      console.log("setLocalDescription(answer)");

      socket.emit("answer", {
        to: toId, // 呼叫端 Socket ID
        from: userId, // 响应端 Socket ID
        answer,
      });

      console.log("连接成功-answer-rec", toId + "-toId");

      try {
        // step3;
        peer.onicecandidate = (event) => {
          console.log(
            "onicecandidate-rec+toId+" + toId,
            "curReceiverInfo",
            chatListStore.curConvo?.curReceiverInfo,
            "params",
            params
          );
          if (event.candidate) {
            socket.emit("candid", {
              to: toId, // 接收端 Socket ID
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
        setAwaiting(false);

        console.log("ok3");
      } catch (e) {
        console.log(e, "eee");
      }
    },
    [local_stream, toId]
  );
  const [awaiting, setAwaiting] = useState(true);

  // 获取本地摄像头
  const getMedia = async () => {
    console.log("getMedia");
    socket.on("end-call", (data) => {
      console.log("end-call-rec", peer);
      setTimeout(() => {
        navigator.canGoBack() && navigator.goBack();
      }, 300);
    });
    socket.on("call", async (data) => {
      // call is offer
      console.log("call-rec");
      initRemote(data);
    });
    const localStream = await mediaDevices.getUserMedia({
      audio: true,
      video: { facingMode: isFrontCamera ? "environment" : "user" },
    });
    setLocal_stream(localStream);
    // console.log(localStream, "localStream");
  };

  // 播放视频组件
  const Player = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "red",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            paddingTop: 40,
            justifyContent: "space-between",
          }}
        >
          <RTCView
            objectFit="cover"
            style={{ flex: 1 }}
            streamURL={local_stream?.toURL?.()}
          />
          <RTCView
            style={{ height: 200, width: 130 }}
            streamURL={remote_stream?.toURL?.()}
          />
        </View>
        <Button
          title="end-call"
          onPress={() => {
            console.log(peer, "peer");
            peer.close();
            local_stream.getTracks().forEach((track) => {
              track.stop();
            });
            navigator.goBack();
            socket?.emit("end-call", {
              to: toId, // 呼叫端 Socket ID
              from: userId,
            });
          }}
        />
        <Button
          title="change camera"
          onPress={() => {
            setIsFrontCamera(!isFrontCamera);
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    getMedia();
    console.log(toId, "toId-rec");
    return () => {
      peer.close();
      // socket.disconnect();
    };
  }, []);

  return (
    <VideoCallPlayer
      type="receiver"
      awaiting={awaiting}
      preCall={() => {
        // preCall();
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
  return <Player />;
};

export default VideoCallRec;
