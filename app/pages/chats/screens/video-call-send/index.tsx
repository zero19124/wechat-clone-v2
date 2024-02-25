/**
 * Sample React Native AppText
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  TouchableOpacity,
  Dimensions,
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

import io from "socket.io-client";

import Video from "./video";
import config from "@/config/index";
import { useUser } from "app/store/user";

const dimensions = Dimensions.get("window");
let socket = null;

const AppText = () => {
  const { userStore } = useUser();
  const socketInit = () => {
    return new Promise((res, rej) => {
      console.log(11111);
      socket = io(config.apiDomain, {
        auth: {
          userid: "222",

          // userid: userStore.userInfo?._id || "222",
          username: "我是呼叫端",
          role: "sender",
        },
      });
      socket.on("call", async (data) => {
        console.log("call");
        initRemote(data);
      });
      res("ok");
    });
  };

  const [peers, setPeers] = useState();
  const [local_stream, setLocal_stream] = useState();
  const [remote_stream, setRemote_stream] = useState();
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const constraints = {
    audio: true,
    video: {
      facingMode: isFrontCamera ? "environment" : "user", // 切换前后摄像头
    },
  };
  useEffect(() => {
    console.log("local_stream111", local_stream);
  }, [local_stream]);

  const initRemote = useCallback(async () => {
    // console.log("ok11111", socket);
    // 1. 创建实例
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });
    setPeers(peer);
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

    socket.emit("offer-test", {
      to: "123", // 呼叫端 Socket ID
      from: "222", // 呼叫端 Socket ID
      offer,
    });

    try {
      console.log("offer-test");

      peer.onicecandidate = (event) => {
        console.log("onicecandidate");
        if (event.candidate) {
          socket.emit("candid", {
            to: "123", // 接收端 Socket ID
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
  }, [local_stream]);
  // 获取本地摄像头
  const getMedia = async () => {
    await socketInit();
    socket.on("answer", (data) => {
      console.log("连接成功-answer1", peers);

      setPeers((pre) => {
        console.log("连接成功-answer", pre);

        pre.setRemoteDescription(data.answer);
      });
    });
    const localStream = await mediaDevices.getUserMedia({
      audio: true,
      video: { facingMode: isFrontCamera ? "environment" : "user" },
    });
    setLocal_stream(localStream);
    console.log(localStream, "localStream");
    // localStream = await mediaDevices.getUserMedia({
    //   audio: true,
    //   video: { facingMode: isFrontCamera ? "environment" : "user" },
    // });
    // setLocal_stream(localStream);
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
          title="call"
          onPress={() => {
            initRemote();
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
    return () => {
      socket.disconnect();
    };
  }, [isFrontCamera]);
  return <Player />;
};

export default AppText;
