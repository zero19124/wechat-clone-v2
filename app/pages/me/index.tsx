import { themeColor } from "@/theme/light";
import QrCodeIcon from "@/icons/qr-code.svg";
import ArrowRightIcon from "@/icons/common/arrow-right.svg";
import PlusIcon from "@/icons/common/plus.svg";
import PaySuccessOutlineIcon from "@/icons/me/pay-success-outline.svg";
import SettingIcon from "@/icons/common/setting-outline.svg";
import AlbumIcon from "@/icons/me/album-outline.svg";
import CardsOffersIcon from "@/icons/me/cards-offers.svg";
import Favorites from "@/icons/me/favorites.svg";
import Sticker from "@/icons/keyboard-panel/emoji-icon.svg";
import * as Haptics from "expo-haptics";
import PusherTester from "./components/App";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleProp,
  Pressable,
  TextInput,
} from "react-native";
import RedDot from "@/component/complex/RedDot";
import Divider from "@/component/complex/Divider";
import ItemCard from "@/component/complex/ItemCard";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { pusherClient } from "lib/pusher";
import { useEffect, useState } from "react";
import {
  Pusher,
  PusherAuthorizerResult,
  PusherChannel,
  PusherEvent,
  PusherMember,
} from "@pusher/pusher-websocket-react-native";
import SimpleLogin from "./components/SimpleLogin";
import { useUser } from "app/store/user";
const Me = () => {
  // return <PusherTester />;
  const avatars = [
    require("@/assets/bella.png"),
    require("@/assets/me.png"),
    require("@/assets/avatar.png"),
  ];
  const { userInfo } = useUser().userStore;

  const [members, onChangeMembers] = useState<PusherMember[]>([]);
  const [msgList, setMsgList] = useState<string[]>([]);
  const pusher = Pusher.getInstance();
  const onAuthorizer = async (channelName: string, socketId: string) => {
    console.log(
      `calling onAuthorizer. channelName=${channelName}, socketId=${socketId}`
    );

    const response = await fetch("some_url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        socket_id: socketId,
        channel_name: channelName,
      }),
    });

    const body = (await response.json()) as PusherAuthorizerResult;

    console.log(`response: ${JSON.stringify(body)}`);
    return body;
  };
  const connect = async () => {
    const onSubscriptionSucceeded = (channelName: string, data: any) => {
      console.log(
        `onSubscriptionSucceeded: ${channelName} data: ${JSON.stringify(data)}`
      );
      const channel: PusherChannel | undefined = pusher.getChannel(channelName);

      if (!channel) {
        return;
      }

      const me = channel.me;
      onChangeMembers([...channel.members.values()]);
      console.log(`Me: ${me}`);
    };
    await pusher.init({
      apiKey: "f9e1ab46abdff9fa95bb",
      cluster: "ap3",
      onAuthorizer,
      onSubscriptionSucceeded,
    });

    await pusher.connect();
    // let myChannel = await pusher.subscribe({
    //   channelName: "my-channel",
    //   onEvent: (event: PusherEvent) => {
    //     console.log(event);
    //     msgList.push(JSON.parse(event.data).message);
    //     setMsgList([...msgList]);
    //     console.log(msgList, "msgList");
    //   },
    // });
  };
  useEffect(() => {
  }, []);
  useEffect(() => {
    console.log(members, "members");
  }, [members]);
  const serviceList = [
    {
      text: "Favorites",
      icon: <Favorites width={24} height={24} fill={themeColor.primary} />,
    },
    {
      text: "Album",
      icon: <AlbumIcon width={24} height={24} fill={themeColor.iconBlue} />,
    },
    {
      text: "Cards & Offres",
      icon: (
        <CardsOffersIcon width={24} height={24} fill={themeColor.primary} />
      ),
    },
    {
      text: "Stiker Gallery",
      icon: <Sticker width={24} height={24} fill={themeColor.iconYellow} />,
    },
  ];
  const meImg = require("@/assets/me.png");
  const bellaImg = require("@/assets/bella.png");
  return (
    <SafeAreaView style={{ backgroundColor: themeColor.white }}>
      <View
        className="flex-row"
        style={{ paddingTop: "16%", paddingBottom: 32 }}
      >
        <Image
          style={{
            marginLeft: 32,
            marginRight: 24,
            width: 60,
            height: 60,
            borderRadius: 4,
          }}
          source={{ uri: userInfo?.image }}
        />
        <View className="flex-1">
          <Text style={{ fontSize: 24, marginBottom: 8 }}>{userInfo?.act}</Text>
          <View className="flex-row justify-between items-center">
            <Text style={{ fontSize: 18, color: themeColor.text3 }}>
              Wechat Id: zero123456
            </Text>
            <View className="flex-row items-center" style={{ marginRight: 12 }}>
              <QrCodeIcon style={{ marginRight: 24 }} width={18} />
              <ArrowRightIcon />
            </View>
          </View>
          <View
            className="flex-row justify-center items-center"
            style={{
              alignSelf: "flex-start",
              marginTop: 8,
              paddingHorizontal: 8,
              borderRadius: 8,
              borderColor: themeColor.fillColor,
              borderWidth: 1,
            }}
          >
            <PlusIcon width={16} />
            <Text
              style={{
                marginLeft: 4,
                paddingVertical: 2,
                color: themeColor.text3,
              }}
            >
              Status
            </Text>
          </View>
          <View
            className="flex-row justify-center items-center"
            style={{
              alignSelf: "flex-start",
              marginTop: 8,
              paddingLeft: 2,
              paddingRight: 8,
              paddingVertical: 2,
              borderRadius: 8,
              borderColor: themeColor.fillColor,
              borderWidth: 1,
            }}
          >
            <View className="flex-row">
              {avatars.map((avatar, index) => {
                return (
                  <Image
                    key={index}
                    style={{
                      width: 16,
                      marginLeft: index ? -(2 + index * 1.5) : 0,
                      height: 16,
                      borderColor: themeColor.white,
                      borderWidth: 1,
                      borderRadius: 8,
                    }}
                    source={avatar}
                  />
                );
              })}
            </View>
            <Text
              style={{
                marginHorizontal: 4,
                paddingVertical: 2,
                color: themeColor.text3,
              }}
            >
              and other friends (9)
            </Text>
            <RedDot />
          </View>
        </View>
      </View>
      <SimpleLogin />

      <Divider />

      <ItemCard
        onPress={() =>
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        }
        borderVisible={false}
        leftComp={() => {
          return (
            <PaySuccessOutlineIcon
              style={{ marginLeft: 24 }}
              width={24}
              height={24}
              fill={themeColor.primary}
            />
          );
        }}
        text={"Services"}
      />
      <Divider />

      {serviceList.map((service) => {
        return (
          <ItemCard
            onPress={() =>
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            }
            key={service.text}
            leftComp={() => {
              return <View style={{ marginLeft: 24 }}>{service.icon}</View>;
            }}
            text={service.text}
          />
        );
      })}
      <Divider />
      <ItemCard
        onPress={() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          // Haptics.selectionAsync();
          console.log("haptics");
        }}
        borderVisible={false}
        leftComp={() => {
          return (
            <SettingIcon
              style={{ marginLeft: 24 }}
              width={24}
              height={24}
              fill={themeColor.iconBlue}
            />
          );
        }}
        text={"Setting"}
      />
    </SafeAreaView>
  );
};
export default Me;
