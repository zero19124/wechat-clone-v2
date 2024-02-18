import Button from "@/component/base/Button/Button";
import Toast from "@/component/base/Toast";
import {
  TNavigationOptions,
  useCommonNavigateProps,
} from "@/component/complex/CommonNavigateTitle";
import config from "@/config/index";
import { useTheme } from "@/theme/useTheme";
import { useUser } from "app/store/user";
import ArrowRightIcon from "@/icons/common/arrow-right.svg";

import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getSize } from "utils";
import BottomWidthDivider from "@/component/complex/BottomWidthDivider";
const FriendInfoConfirm = () => {
  const name = "Send Friend Request";
  const navigate = useNavigation();
  const { themeColor } = useTheme();
  const { t } = useTranslation();
  const { userStore } = useUser();
  const params = useLocalSearchParams();
  const friendId = useMemo(() => params.friendId, [params]);
  const userId = useMemo(() => userStore.userInfo?._id, [userStore]);
  useLayoutEffect(() => {
    const navigatorProps = useCommonNavigateProps({
      title: t(name),
      rightComp: () => <Text style={{ fontSize: 16 }}></Text>,
    });
    navigate.setOptions({
      ...navigatorProps,
      headerShadowVisible: false,
    } as TNavigationOptions);
  });
  const requestFriendHandler = () => {
    const data = {
      userId,
      friendId,
    };
    console.log(params, "prams", data);

    fetch(config.apiDomain + "/api/friends/requestFriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "requestFriendHandler");
        navigate.goBack();
      });
  };
  return (
    <SafeAreaView className="flex-1">
      <View style={{ padding: 32, flex: 1, position: "relative" }}>
        <Text style={{ color: themeColor.text4, marginBottom: 8 }}>{name}</Text>
        <View
          style={{
            backgroundColor: themeColor.fill4,
            padding: 16,
            height: 90,
            borderRadius: 8,
          }}
        >
          <TextInput selectionColor={themeColor.primary} value="i m ssss" />
        </View>
        <Text
          style={{ color: themeColor.text4, marginBottom: 8, marginTop: 24 }}
        >
          {t("Set Alias")}
        </Text>

        <View
          style={{
            backgroundColor: themeColor.fill4,
            padding: 16,
            borderRadius: 8,
          }}
        >
          <TextInput selectionColor={themeColor.primary} value="i m ssss" />
        </View>
        <Text
          style={{ color: themeColor.text4, marginBottom: 8, marginTop: 24 }}
        >
          {t("Add tags and a description")}
        </Text>

        <View
          style={{
            backgroundColor: themeColor.fill4,
            padding: 16,
            borderRadius: 8,
          }}
        >
          <View className="flex-row justify-between">
            <Text>{t("Tags")}</Text>
            <ArrowRightIcon />
          </View>
          <BottomWidthDivider style={{ marginBottom: 12 }} />
          <View className="flex-row justify-between">
            <Text>{t("Remark")}</Text>
            <ArrowRightIcon />
          </View>
        </View>
        <Text>
          ===== friendId:{friendId}==== userId:{userId}
        </Text>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() => {
              console.log("confirm");
              // Toast.loading(t("Sending"));
              requestFriendHandler();
            }}
          >
            <View
              style={{ borderRadius: 8, backgroundColor: themeColor.primary }}
            >
              <Text
                style={{
                  color: themeColor.white,
                  paddingHorizontal: getSize(56),
                  paddingVertical: 12,
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                {t("Send")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default FriendInfoConfirm;
