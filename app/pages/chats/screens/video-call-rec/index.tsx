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
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from "react-native-webrtc";
import io from "socket.io-client";
import config from "@/config/index";
import { useUser } from "app/store/user";
import { PusherContext } from "@/hooks/usePusherProvider";

const VideoCallRec = () => {
  const { userStore } = useUser();
  const pusherContext = useContext(PusherContext);
  const userId = useMemo(() => userStore.userInfo?._id || "222", [userStore]);
  const socket = pusherContext.socket;

  const [peers, setPeer] = useState([]);
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
      const peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      });
      setPeer([...peers, peers]);
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

      socket.emit("answer", {
        to: offerData.from, // 呼叫端 Socket ID
        from: userId, // 响应端 Socket ID
        answer,
      });

      console.log("连接成功-answer");

      try {
        // step3;
        peer.onicecandidate = (event) => {
          console.log("onicecandidate");
          if (event.candidate) {
            socket.emit("candid", {
              to: offerData.from, // 接收端 Socket ID
              candid: event.candidate,
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
    console.log(socket, "getMedia");
    socket.on("call", async (data) => {
      // call is offer
      console.log("call");
      initRemote(data);
    });
    const localStream = await mediaDevices.getUserMedia({
      audio: true,
      video: { facingMode: isFrontCamera ? "environment" : "user" },
    });
    setLocal_stream(localStream);
    console.log(localStream, "localStream");
  };

  // 播放视频组件
  const Player = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "red",
          gap: 20,
        }}
      >
        <RTCView
          style={{ height: 300, width: 150 }}
          streamURL={local_stream?.toURL?.()}
        />
        <RTCView
          style={{ height: 300, width: 150 }}
          streamURL={remote_stream?.toURL?.()}
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
    return () => {
      // socket.disconnect();
    };
  }, []);
  return <Player />;
};

export default VideoCallRec;
