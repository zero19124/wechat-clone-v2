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
import { list1 } from "@/cont.js";
import pinyin from "pinyin";
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
  const originalList = [
    { id: "盖伦", name: "盖伦" },
    { id: "崔丝塔娜", name: "aaaa崔2丝塔娜" },
    { id: "大发明家", name: "大发明家" },
    { id: "武器大师", name: "武器大师" },
    { id: "刀妹", name: "刀妹" },
    { id: "卡特琳娜", name: "卡特琳娜" },
    { id: "盲僧", name: "盲僧" },
    { id: "蕾欧娜", name: "蕾欧娜" },
    { id: "拉克丝", name: "拉克丝" },
    { id: "剑圣", name: "剑圣" },
    { id: "赏金", name: "赏金" },
    { id: "发条", name: "发条" },
    { id: "瑞雯", name: "瑞雯" },
    { id: "提莫", name: "提莫" },
    { id: "卡牌", name: "卡牌" },
    { id: "剑豪", name: "剑豪" },
    { id: "琴女", name: "琴女" },
    { id: "木木", name: "木木" },
    { id: "雪人", name: "雪人" },
    { id: "安妮", name: "安妮" },
    { id: "薇恩", name: "薇恩" },
    { id: "小法师", name: "小法师" },
    { id: "艾尼维亚", name: "艾尼维亚" },
    { id: "奥瑞利安索尔", name: "奥瑞利安索尔" },
    { id: "布兰德", name: "布兰德" },
    { id: "凯特琳", name: "凯特琳" },
    { id: "虚空", name: "虚空" },
    { id: "机器人", name: "机器人" },
    { id: "挖掘机", name: "挖掘机" },
    { id: "EZ", name: "EZ" },
    { id: "暴走萝莉", name: "暴走萝莉" },
    { id: "艾克", name: "艾克" },
    { id: "波比", name: "波比" },
    { id: "赵信", name: "赵信" },
    { id: "牛头", name: "牛头" },
    { id: "九尾", name: "九尾" },
    { id: "菲兹", name: "菲兹" },
    { id: "寒冰", name: "寒冰" },
    { id: "猴子", name: "猴子" },
    { id: "深渊", name: "深渊" },
    { id: "凯南", name: "凯南" },
    { id: "诺克萨斯", name: "诺克萨斯" },
    { id: "祖安", name: "祖安" },
    { id: "德莱文", name: "德莱文" },
    { id: "德玛西亚王子", name: "德玛西亚王子" },
    { id: "豹女", name: "豹女" },
    { id: "皮城执法官", name: "皮城执法官" },
    { id: "泽拉斯", name: "泽拉斯" },
    { id: "岩雀", name: "岩雀" },
  ];
  console.log(pinyin("岩雀", { style: pinyin.STYLE_NORMAL }), "pinyin");
  // 将数据列表转化为拼音存储，以便于拼音搜索
  const listMap = new Map();
  originalList.forEach((item, index, arr) => {
    // 将Item的名称转为拼音数组
    if (!item.name) return;
    const pinyinArr = pinyin(item.name, { style: pinyin.STYLE_NORMAL });
    const firstPinyin = pinyinArr[0];
    const initial = firstPinyin[0][0];
    if (listMap.has(initial)) {
      const pre = listMap.get(initial);
      pre.push(item);
      return;
    }
    listMap.set(initial, [item]);

    // 将拼音数组转化为一个字符串，以支持拼音搜索
    // for (let i = 0; i < pinyinArr.length; i++) {
    //   for (let j = 0; j < pinyinArr[i].length; j++) {
    //     pinyinArrStr = pinyinArrStr + pinyinArr[i][j];
    //   }
    // }
    // item.pinyinArrStr = pinyinArrStr;
  });

  console.log(listMap.get("g"), "groupedAndMapped");
  return (
    <>
      <View style={{ backgroundColor: light.themeColor.white }}>
        <IndexBar highlightColor={light.themeColor.white} sticky={false}>
          <View className="bg-white flex-1">
            <SearchBar />
            <View
              style={{
                zIndex: 12,
                position: "absolute",
                backgroundColor: "blue",
                // top: 844 / 2 - 8.5 * 26,
                top: 201,
                right: 0,
                width: 100,
                height: 11,
              }}
            ></View>
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
            const itemList = listMap.get(item.toLocaleLowerCase());
            // 没有则不显示
            // if (!itemList?.length) return null;
            return (
              <View key={item}>
                <IndexBar.Anchor index={item} />
                {itemList?.map((item, index) => {
                  if (index % 2) {
                    item.desc = "descdesc";
                  }
                  return (
                    <ItemCard
                      showRightComp={false}
                      textComp={() => {
                        return (
                          <View>
                            <Text
                              style={{
                                fontSize: 16,
                              }}
                            >
                              {item.name}
                            </Text>
                            {item?.desc && (
                              <Text
                                style={{
                                  color: light.themeColor.text3,
                                }}
                              >
                                {item?.desc}
                              </Text>
                            )}
                          </View>
                        );
                      }}
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
                      text={item.name}
                    />
                  );
                })}
              </View>
            );
          })}
          <Text className="text-center my-4 text-gray-500"> 1000 friends</Text>
        </IndexBar>
      </View>
      <PortalHost name="ContactsPortalHost" />
    </>
  );
};
export default Contacts;
