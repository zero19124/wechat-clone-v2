import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as light from "@/theme/light";
import Button from "@/component/base/Button/Button";
import ItemCard from "@/component/complex/ItemCard";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useNavigation } from "expo-router";
import AddFriendIcon from "@/icons/add-friend.svg";
import SearchIcon from "@/icons/common/search.svg";
import IndexBar from "@/component/business/IndexBar";
import { list1 } from "@/cont.js";
import pinyin from "pinyin";
import { PortalHost } from "@/component/business/Portal";
import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

import { tempNavigatorCount } from "@/component/business/IndexBar/style";
import { cardList, originalList } from "./data/contacts-mocks";
import { useTheme } from "@/theme/useTheme";
const Contacts = () => {
  const { toggleTheme, themeColor, themeName } = useTheme();
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
        backgroundColor: themeColor.fillColor,
      }}
    >
      <View
        className="flex-row justify-center items-center rounded-md"
        style={{
          height: 36,
          backgroundColor: themeColor.white,
          marginTop: 8,
          marginHorizontal: 8,
          marginBottom: 16,
        }}
      >
        <SearchIcon fill={themeColor.text3} />
        <Text style={{ color: themeColor.text3 }}>Search</Text>
      </View>
    </View>
  );

  const indexList: string[] = [];
  const customIndexList = [1, 2, 3, 4, 5, 6, 8, 9, 10];
  const charCodeOfA = "A".charCodeAt(0);
  // const headerHeight = useHeaderHeight();
  for (let i = 0; i < tempNavigatorCount; i += 1) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }
  const _ = require("lodash");

  // console.log(pinyin("岩雀", { style: pinyin.STYLE_NORMAL }), "pinyin");
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
  const [locale, setLocale] = useState("ja");
  const i18n = new I18n(
    {
      en: { welcome: "Hello" },
      ja: { welcome: "こんにちは" },
    },
    { locale: locale }
  );
  let colorScheme = useColorScheme();

  useEffect(() => {
    setLocale(i18n.locale);
    console.log(colorScheme, "colorScheme");
  }, []);
  // i18n.onChange((v) => {
  //   console.log(v, "vvv");
  // });
  console.log(i18n?.locale, "I18n.locale ");
  const [color, setColor] = useState("#ff0000");

  const ColorChangeComponent = useCallback(() => {
    const animatedColorValue = new Animated.Value(0);

    const backgroundColorInterpolate = animatedColorValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["#ff0000", "#00ff00"],
    });

    const animatedStyle = {
      backgroundColor: backgroundColorInterpolate,
    };
    console.log(animatedColorValue, "animatedColorValue11");
    const changeColor = () => {
      Animated.timing(animatedColorValue, {
        toValue: animatedColorValue ? 1 : 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    };

    return (
      <View
        style={{
          position: "absolute",
          top: 100,
          flex: 1,
          zIndex: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View style={[{ width: 200, height: 200 }, animatedStyle]}>
          <TouchableOpacity onPress={changeColor}>
            <Text>Change Color</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }, [color]);

  return (
    <>
      <View
        style={{
          backgroundColor: themeColor.white,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            toggleTheme(themeName === "light" ? "dark" : "light");
            setLocale((v) => {
              const vv = v === "en" ? "ja" : "en";
              i18n.locale = vv;
              console.log(v, 111111111, i18n.locale);

              return vv;
            });
          }}
          style={{
            // zIndex: 12,
            // position: "absolute",
            backgroundColor: "blue",
            // // top: 844 / 2 - 8.5 * 26,
            // top: 124,
            // right: 0,
            // width: 100,
            // height: 11,
          }}
        >
          <Text>{i18n.t("welcome")}</Text>
          <Text>
            {i18n.locale}-{locale}-{i18n.t("welcome")}
          </Text>
        </TouchableOpacity>
        <ColorChangeComponent />

        <IndexBar highlightColor={light.themeColor.white} sticky={false}>
          <View className="bg-white flex-1">
            <SearchBar />

            {cardList.map((card) => {
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
