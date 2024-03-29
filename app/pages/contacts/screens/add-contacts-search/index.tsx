import { useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchIcon from "@/icons/common/search.svg";
import { useTheme } from "@/theme/useTheme";
import { Toast } from "@/component/base/Toast";
import _ from "lodash";
import config from "@/config/index";
import BottomWidthDivider from "@/component/complex/BottomWidthDivider";
import ItemCard from "@/component/complex/ItemCard";
import UserAvatar from "@/component/complex/UserAvatar";
import { useUser } from "app/store/user";
import { useLoadingStore } from "app/store/globalLoading";
const AddContactsSearch = () => {
  const navigate = useNavigation();
  const { userInfo } = useUser().userStore;
  const [text, setText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [resultList, setResultList] = useState([]);
  const { t } = useTranslation();
  const { themeColor } = useTheme();
  const textInputRef = useRef<TextInput>();
  const { setLoadingStore } = useLoadingStore();

  // 定义处理文本变化的函数
  const handleTextChange = (inputText: string) => {
    setText(inputText);
    setLoadingStore({ loading: true });
    fetch(config.apiDomain + `/api/user/getUserByName?userName=${inputText}`)
      .then((res) => res.json())
      .then((userList) => {
        console.log(userList, "userList");
        setResultList(userList.filter((user) => user._id !== userInfo?._id));
        setShowResult(true);
      })
      .finally(() => {
        setLoadingStore({ loading: false });
      });
    // 在这里处理文本变化的逻辑
  };

  // 使用 debounce 包装处理文本变化的函数，延迟执行 500 毫秒
  const debouncedHandleTextChange = _.debounce(handleTextChange, 500);
  useEffect(() => {
    textInputRef.current?.focus();
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: themeColor.fillColor,
      }}
    >
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
        <ScrollView style={{}}>
          {resultList.map((user, index) => {
            return (
              <ItemCard
                uniqueKey={index}
                style={{ marginVertical: 12 }}
                onPress={() => {
                  navigate.navigate(
                    "pages/contacts/screens/friend-info/index",
                    {
                      friendId: user._id,
                      type: "search",
                    }
                  );
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default AddContactsSearch;
