import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as light from "@/theme/light";
import Button from "@/component/base/Button/Button";
import ItemCard from "@/component/complex/ItemCard";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import AddFriendIcon from "@/icons/add-friend.svg";
import SearchIcon from "@/icons/common/search.svg";
import IndexBar from "@/component/business/IndexBar";
import React from "react";
import { PortalHost } from "@/component/business/Portal";
const Contacts = () => {
  const navigate = useNavigation();
  useLayoutEffect(() => {
    navigate.setOptions({
      headerRight: () => <AddFriendIcon style={{ marginRight: 12 }} />,
    });
  });
  const urls = [
    "https://wx.qlogo.cn/mmhead/ver_1/r8lPicJIVKrJhzoYCO9kqCIgpSpvdKstOfW0PpdKVSrnXb3RoZO97fuicmOGrYqmq62kxjjX2Tlnic0GAlw8PQicl1ichRpRWYFtgWUahX32mKN0/132",
    ,
    "https://wx.qlogo.cn/mmhead/ver_1/rR4NYnibS1lbswZqjjedejicZT9FvxvrbR7l8lXD8WW1rNLKlm9SErbENiafAhqKF074bvKMcfHmqF9bFq7FLWHILvYmf6NIonQIL2iaWGQDib8g/0",
  ];
  const SearchBar = () => (
    <View
      style={{
        backgroundColor: light.themeColor.fillColor,
      }}
    >
      <View
        className="flex-row justify-center items-center rounded-md"
        style={{
          height: 36,
          backgroundColor: light.themeColor.white,
          marginTop: 8,
          marginHorizontal: 8,
          marginBottom: 16,
        }}
      >
        <SearchIcon fill={light.themeColor.text3} />
        <Text style={{ color: light.themeColor.text3 }}>Search</Text>
      </View>
    </View>
  );
  const cardList = [
    {
      text: "New Friends",
      url: require("@/icons/contacts/new-friend.png"),
    },
    {
      text: "Chats Only Friends",
      url: require("@/icons/contacts/chats-only-friends.png"),
    },
    {
      text: "Group Chat",
      url: require("@/icons/contacts/group-chat.png"),
    },
    {
      text: "Tags",
      url: require("@/icons/contacts/tags.png"),
    },
    {
      text: "Official Account",
      url: require("@/icons/contacts/official-account.png"),
    },
    {
      text: "Wecom Contacts",
      url: require("@/icons/contacts/wecom-contacts.png"),
    },
  ];

  const indexList: string[] = [];
  const customIndexList = [1, 2, 3, 4, 5, 6, 8, 9, 10];
  const charCodeOfA = "A".charCodeAt(0);
  // const headerHeight = useHeaderHeight();
  for (let i = 0; i < 26; i += 1) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }
  const _ = require("lodash");

  // 原始列表
  const originalList = [{ name: "你好" }, { name: "evan" }, { name: "" }];

  // 使用 lodash 库的 groupBy 函数和 map 函数来处理列表
  const groupedAndMapped = _.chain(originalList)
    .filter((item) => item.name) // 过滤掉空的 name 属性
    .groupBy((item) => item.name[0].toUpperCase()) // 根据首字母分组
    .map((value, key) => ({ alphabet: key, list: value })) // 转换成指定格式
    .value();

  console.log(groupedAndMapped, "groupedAndMapped");
  return (
    <>
      <View style={{ backgroundColor: light.themeColor.white }}>
        <IndexBar sticky={false}>
          <View className="bg-white flex-1">
            <SearchBar />

            {cardList.map((card) => {
              console.log(card.text);
              return (
                <ItemCard
                  showRightComp={false}
                  key={card.text}
                  leftComp={() => {
                    return (
                      <Image
                        style={{
                          marginLeft: 12,
                          marginVertical: 8,
                          width: 40,
                          height: 40,
                        }}
                        borderRadius={4}
                        source={card.url}
                      />
                    );
                  }}
                  text={card.text}
                />
              );
            })}

            {/* <View className="flex-row gap-20 flex-wrap">
      <Button type="primary">主要按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="default">默认按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
    </View> */}
            {/* <Image
      width={100}
      resizeMode="center"
      height={106}
      source={{ uri: urls[1] }}
    />

    <Image width={100} height={100} source={{ uri: urls[0] }} /> */}
          </View>
          <View style={{ paddingTop: 12 }}></View>
          {indexList.map((item, index) => {
            if (index === 2) {
              return (
                <View key={item}>
                  <IndexBar.Anchor index={item + "2"} />
                  <ItemCard
                    showRightComp={false}
                    leftComp={() => {
                      return (
                        <Image
                          style={{
                            marginLeft: 12,
                            marginVertical: 8,
                            width: 40,
                            height: 40,
                          }}
                          borderRadius={4}
                          source={require("@/assets/me.png")}
                        />
                      );
                    }}
                    text={"evan"}
                  />
                </View>
              );
            }
            return (
              <View key={item}>
                <IndexBar.Anchor index={item} />
                <ItemCard
                  showRightComp={false}
                  leftComp={() => {
                    return (
                      <Image
                        style={{
                          marginLeft: 12,
                          marginVertical: 8,
                          width: 40,
                          height: 40,
                        }}
                        borderRadius={4}
                        source={require("@/assets/me.png")}
                      />
                    );
                  }}
                  text={"evan"}
                />
                <ItemCard
                  showRightComp={false}
                  leftComp={() => {
                    return (
                      <Image
                        style={{
                          marginLeft: 12,
                          marginVertical: 8,
                          width: 40,
                          height: 40,
                        }}
                        borderRadius={4}
                        source={require("@/assets/me.png")}
                      />
                    );
                  }}
                  text={"evan"}
                />
              </View>
            );
          })}
        </IndexBar>
      </View>
      <PortalHost name="ContactsPortalHost" />
    </>
  );
};
export default Contacts;
