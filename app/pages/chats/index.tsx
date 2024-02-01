import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ChatIcon from "@/icons/tabs/chats.svg";
import ChatActiveIcon from "@/icons/tabs/chats-active.svg";
import ThreeDot from "@/icons/three-dot.svg";
import CirclePlus from "@/icons/circle-plus.svg";
import * as light from "@/theme/light";
import Tooltip from "react-native-walkthrough-tooltip";
import { getSize } from "utils";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import MsgSender from "app/component/business/MsgSender";
import MsgReceiver from "app/component/business/MsgReceiver";
import { useTheme } from "@/theme/useTheme";
const Chats = () => {
  const { toggleTheme, themeColor, themeName } = useTheme();

  const navigate = useNavigation();
  const router = useRouter();
  useLayoutEffect(() => {
    navigate.setOptions({
      // headerShown: false,
      headerLeft: () => <Entypo name="dots-two-horizontal" size={20} />,
      headerLeftContainerStyle: { paddingLeft: 12 },
      headerTitle: "Weixin(331)",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            console.log(1111);
            router.push("individual-payment");
          }}
        >
          <CirclePlus />
        </TouchableOpacity>
      ),
      headerRightContainerStyle: { paddingRight: 12 },
      tabBarIcon: ({ size, color, focused }) => {
        if (focused) {
          return <ChatActiveIcon />;
        }
        return <ChatIcon />;
      },
    });
  }, []);
  console.log("chats");
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const data = [
    {
      id: 1,
      isSticky: false,
      avatar: "@/assets/avatar.png",
      userName: "Bella",
      unReadCount: 1,
      latestMessage: "latestMessage",
      time: "00:00",
    },
    {
      id: 12,
      isSticky: false,
      avatar: "@/assets/avatar.png",
      userName: "Bella",
      unReadCount: 12,
      latestMessage: "latestMessage",
      time: "00:00",
    },
    {
      id: 13,
      isSticky: false,
      avatar: "@/assets/avatar.png",
      userName: "Bella",
      unReadCount: 0,
      latestMessage: "latestMessage",
      time: "12:00",
    },
  ];
  const style = StyleSheet.create({
    itemContainer: {
      backgroundColor: "#FFF",
      flexDirection: "row",
      margin: 12,
      marginBottom: 0,
      marginRight: 0,
    },
    itemContainerLeft: { flexDirection: "row" },
    itemContainerRight: {
      // backgroundColor: "red",
      paddingBottom: 16,
      // alignItems: "center",
      justifyContent: "space-between",
      // flexDirection: "row",
      flex: 1,
      borderBottomColor: themeColor.fillColor,
      borderBottomWidth: 1,
    },
    itemContainerAvatar: {
      borderRadius: 4,
      borderColor: themeColor.fillColor,
      borderWidth: 1,
      width: getSize(50),
      height: getSize(50),
      marginRight: 12,
    },
  });
  const renderItem = ({ item }: { item: (typeof data)[0] }) => {
    {
      /* 头像 */
    }

    const LeftPart = () => {
      const MarkUnReadDot = (props: {
        width: number;
        height: number;
        children?: any;
      }) => {
        const { width, height, children } = props;

        return (
          <View
            style={{
              width,
              height,
              backgroundColor: "red",
              borderRadius: width,
              position: "absolute",
              top: -(width / 3),
              right: width / 2,
            }}
          >
            <Text
              style={{
                color: themeColor.white,
                fontSize: 10,
                fontWeight: "bold",
                textAlign: "center",
                lineHeight: width,
              }}
            >
              {children}
            </Text>
          </View>
        );
      };
      return (
        <View>
          <Image
            source={require("@/assets/avatar.png")}
            style={style.itemContainerAvatar}
          />
          {item.unReadCount > 0 ? (
            <MarkUnReadDot width={16} height={16}>
              {item.unReadCount}
            </MarkUnReadDot>
          ) : (
            <MarkUnReadDot width={10} height={10} />
          )}
        </View>
      );
    };
    const RightPart = () => (
      <View style={style.itemContainerRight}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          {/* groupName */}
          <Text style={{ fontSize: 16, marginVertical: 4 }}>
            {item.userName}
          </Text>
          <Text
            style={{
              width: getSize(50),
              fontSize: 12,
              color: themeColor.text1,
            }}
          >
            {item.time}
          </Text>
        </View>
        {/* time */}
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingRight: 16,
          }}
        >
          <Text style={{ color: themeColor.text1 }}>{item.latestMessage}</Text>
          <MaterialCommunityIcons
            size={16}
            color={themeColor.text1}
            name="bell-off-outline"
          />
        </View>
      </View>
    );
    return (
      <TouchableOpacity
        onPress={() => {
          navigate.navigate("pages/chats/msg-chats/index");
        }}
      >
        <View style={style.itemContainer}>
          <LeftPart />
          <RightPart />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ backgroundColor: themeColor.white, flex: 1 }}>
      {/* <Image
        style={{ width: 50, height: 50 }}
        source={require("@/assets/avatar.png")}
      /> */}
      {/* <Text>Chats</Text>; */}
      {/* <Tooltip
        isVisible={toolTipVisible}
        content={<Text>Check this out!</Text>}
        placement="top"
        onClose={() => setToolTipVisible(false)}
      >
        <TouchableHighlight onPress={() => setToolTipVisible(true)}>
          <Text>Press me</Text>
        </TouchableHighlight>
      </Tooltip> */}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id + ""}
        renderItem={renderItem}
      ></FlatList>
    </View>
  );
};

export default Chats;
