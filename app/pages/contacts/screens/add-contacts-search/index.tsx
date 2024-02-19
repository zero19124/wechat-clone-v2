import { useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SearchIcon from "@/icons/common/search.svg";
import { useTheme } from "@/theme/useTheme";
import { Toast } from "@/component/base/Toast";
import _ from "lodash";
import config from "@/config/index";
import BottomWidthDivider from "@/component/complex/BottomWidthDivider";
import ItemCard from "@/component/complex/ItemCard";
import UserAvatar from "@/component/complex/UserAvatar";
const AddContactsSearch = () => {
  const navigate = useNavigation();
  const [text, setText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [resultList, setResultList] = useState([]);
  const { t } = useTranslation();
  const { themeColor } = useTheme();
  const textInputRef = useRef<TextInput>();
  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  // 定义处理文本变化的函数
  const handleTextChange = (inputText: string) => {
    setText(inputText);
    fetch(config.apiDomain + `/api/user/getUserByName?userName=${inputText}`)
      .then((res) => res.json())
      .then((userList) => {
        console.log(userList, "userList");
        setResultList(userList);
        setShowResult(true);
      });
    // 在这里处理文本变化的逻辑
  };

  // 使用 debounce 包装处理文本变化的函数，延迟执行 500 毫秒
  const debouncedHandleTextChange = _.debounce(handleTextChange, 500);
  return (
    <SafeAreaView style={{ backgroundColor: themeColor.fillColor }}>
      <View
        style={{
          backgroundColor: themeColor.fillColor,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 8,
        }}
      >
        <View
          style={{
            flex: 1,
            borderRadius: 4,
            margin: 8,
            padding: 4,
            flexDirection: "row",
            backgroundColor: themeColor.white,
          }}
        >
          <SearchIcon />
          <TextInput
            ref={textInputRef}
            onChangeText={debouncedHandleTextChange}
            selectionColor={themeColor.primary}
            style={{ paddingLeft: 8 }}
            placeholder={t("Account/Mobile Number")}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigate.goBack();
          }}
        >
          <Text style={{ color: themeColor.textBlue, fontSize: 16 }}>
            {t("Cancel")}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          Toast.loading("加载中...");
        }}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: themeColor.white,
          padding: 4,
          paddingRight: 0,
        }}
      >
        <Text style={{ marginBottom: 8, color: themeColor.text3 }}>
          {t("Contacts")}
        </Text>
        <BottomWidthDivider />
        {resultList.map((user, index) => {
          return (
            <ItemCard
              onPress={() => {
                navigate.navigate("pages/contacts/screens/friend-info/index", {
                  friendId: user._id,
                  type: "search",
                });
              }}
              borderVisible={false}
              rightComp={() => <View></View>}
              leftComp={() => {
                return (
                  <UserAvatar
                    style={{ borderColor: "transparent" }}
                    source={{ uri: user?.image }}
                  />
                );
              }}
              text={user.act}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};
export default AddContactsSearch;
