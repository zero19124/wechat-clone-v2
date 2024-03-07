import { Image, Text, TouchableOpacity, View } from "react-native";
import * as light from "@/theme/light";
import ItemCard from "@/component/complex/ItemCard";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import AddFriendIcon from "@/icons/add-friend.svg";
import IndexBar from "@/component/business/IndexBar";
import pinyin from "pinyin";
import { PortalHost } from "@/component/business/Portal";
import { tempNavigatorCount } from "@/component/business/IndexBar/style";
import { cardList } from "./data/contacts-mocks";
import { useTheme } from "@/theme/useTheme";
import config from "@/config/index";
import { useUser } from "app/store/user";
import SearchBar from "@/component/complex/SearchBar";
import UserAvatar from "@/component/complex/UserAvatar";
import { isNumber } from "@/utils/typeof";
import { useGetSameApiOfGet } from "@/hooks/useSameApi";
import { PusherContext } from "@/hooks/usePusherProvider";
const _ = require("lodash");
const indexList: string[] = [];
const customIndexList = [1, 2, 3, 4, 5, 6, 8, 9, 10];
const charCodeOfA = "A".charCodeAt(0);
// const headerHeight = useHeaderHeight();
for (let i = 0; i < tempNavigatorCount; i += 1) {
  indexList.push(String.fromCharCode(charCodeOfA + i));
}
indexList.push("#");
const Contacts = () => {
  const [friendList, setFriendList] = useState([]);
  const router = useRouter();
  const [listMap, setListMap] = useState(new Map());
  const { themeColor } = useTheme();
  const { userStore } = useUser();
  const { getConvoIdByCurUserIdAndByFriendId } = useGetSameApiOfGet();
  const navigate = useNavigation();

  useLayoutEffect(() => {
    navigate.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigate.navigate("pages/contacts/screens/add-contacts/index");
          }}
        >
          <AddFriendIcon style={{ marginRight: 12 }} />
        </TouchableOpacity>
      ),
    });
  });

  const getFriendList = () => {
    setFriendList([]);
    setListMap(new Map());
    fetch(
      config.apiDomain +
        "/api/friends/getFriendsByUserId?userId=" +
        userStore.userInfo?._id
    )
      .then((res) => res.json())
      .then((friendData) => {
        if (!friendData || !friendData?.length) {
          console.log("friendList?.length is null");
          return;
        }
        const friendList = friendData[0].friendsArray;
        console.log(friendList, "friendList");
        setFriendList(friendList);

        // console.log(pinyin("岩雀", { style: pinyin.STYLE_NORMAL }), "pinyin");
        // 将数据列表转化为拼音存储，以便于拼音搜索

        friendList.forEach((item, index, arr) => {
          // 将Item的名称转为拼音数组
          // console.log(1111111111, item);
          if (!item.act) return;
          // console.log(1111111111333);
          if (isNumber(Number(item.act))) {
            // console.log(111111);
            // console.log("pinyinArr");
            if (listMap.has("#")) {
              const preData = listMap.get("#");
              preData.push(item);
            } else {
              listMap.set("#", [item]);
            }

            const newMap = new Map(listMap);
            setListMap(newMap);
            return;
          }
          const pinyinArr = pinyin(item.act, { style: pinyin.STYLE_NORMAL });
          const firstPinyin = pinyinArr[0];
          const initial = firstPinyin[0][0];
          if (listMap.has(initial)) {
            const pre = listMap.get(initial);
            pre.push(item);
            return;
          }
          const newMap = new Map(listMap);
          newMap.set(initial, [item]);
          setListMap(newMap);
          // 将拼音数组转化为一个字符串，以支持拼音搜索
          // for (let i = 0; i < pinyinArr.length; i++) {
          //   for (let j = 0; j < pinyinArr[i].length; j++) {
          //     pinyinArrStr = pinyinArrStr + pinyinArr[i][j];
          //   }
          // }
          // item.pinyinArrStr = pinyinArrStr;
        });
        console.log(listMap, "listMap-------");
      });
  };
  const pusherContext = useContext(PusherContext);

  useEffect(() => {
    if (!pusherContext.socket) return;
    // 有新消息就更新会话列表
    pusherContext.socket?.on("friend:new", (data) => {
      console.log("riend:new");
      getFriendList();
    });
  }, [pusherContext.socket]);

  useEffect(() => {
    getFriendList();
  }, [userStore.userInfo]);

  return (
    <>
      <View
        style={{
          backgroundColor: themeColor.white,
        }}
      >
        <IndexBar highlightColor={light.themeColor.white} sticky={false}>
          <View className="bg-white flex-1">
            <SearchBar />

            {cardList.map((card, index) => {
              return (
                <ItemCard
                  onPress={() => {
                    if (card.text === "New Friends") {
                      navigate.navigate(
                        "pages/contacts/screens/new-friends/index"
                      );
                    }
                  }}
                  showRightComp={false}
                  key={index}
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
          </View>
          <View style={{ paddingTop: 12 }}></View>
          {indexList.map((item, index) => {
            // 拿到 abcd对应字母的数据  {a> ['anna','android']}
            const itemList = listMap?.get?.(item.toLocaleLowerCase());
            // 没有则显示到其他
            if (!itemList?.length) return null;
            console.log(itemList, "itemList");
            return (
              <View key={index}>
                <IndexBar.Anchor key={index} index={item} />
                {itemList?.map((_item, _index) => {
                  // console.log(_item);
                  // if (index % 2) {
                  //   item.desc = "descdesc";
                  // }
                  return (
                    <ItemCard
                      uniqueKey={_item?._id + ""}
                      key={_item?._id + ""}
                      style={{
                        marginTop: 16,
                      }}
                      onPress={() => {
                        const curUserId = userStore.userInfo?._id + "";
                        // find the convo and go there
                        getConvoIdByCurUserIdAndByFriendId(
                          curUserId,
                          _item?._id + ""
                        ).then((res) => {
                          navigate.navigate(
                            "pages/contacts/screens/friend-info/index",
                            {
                              status: "done",
                              confirm: true,
                              friendId: _item?._id,
                              type: "new",
                            }
                          );
                        });
                      }}
                      key={index}
                      showRightComp={false}
                      textComp={() => {
                        return (
                          <View>
                            <Text
                              style={{
                                fontSize: 16,
                              }}
                            >
                              {_item.act}
                            </Text>
                            {_item?.desc && (
                              <Text
                                style={{
                                  color: light.themeColor.text3,
                                }}
                              >
                                {_item?.desc}
                              </Text>
                            )}
                          </View>
                        );
                      }}
                      leftComp={() => {
                        return (
                          <UserAvatar
                            style={{ marginLeft: 16 }}
                            source={{ uri: _item.image }}
                          />
                        );
                      }}
                      text={_item.act}
                    />
                  );
                })}
              </View>
            );
          })}
          <Text className="text-center my-4 text-gray-500">
            {friendList?.length} friends
          </Text>
        </IndexBar>
      </View>
      <PortalHost name="ContactsPortalHost" />
    </>
  );
};
export default Contacts;
