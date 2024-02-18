import Button from "@/component/base/Button/Button";
import {
  TNavigationOptions,
  useCommonNavigateProps,
} from "@/component/complex/CommonNavigateTitle";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ThreeDot from "@/icons/three-dot.svg";

import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { themeColor } from "@/theme/light";
import BottomWidthDivider from "@/component/complex/BottomWidthDivider";
import UserAvatar from "@/component/complex/UserAvatar";
import config from "@/config/index";
const FriendInfo = () => {
  const navigate = useNavigation();
  const { t } = useTranslation();
  const [user, setUser] = useState();
  const params = useLocalSearchParams();
  const friendId = useMemo(() => params.friendId || null, [params]);
  const dataFromRequestList = useMemo<{ status: string; userId: string }>(
    () => (params as any) || null,
    [params]
  );
  useLayoutEffect(() => {
    const navigatorProps = useCommonNavigateProps({
      title: "",
      rightComp: () => (
        <Pressable
          onPress={() => {
            console.log("ThreeDot");
          }}
        >
          <ThreeDot />
        </Pressable>
      ),
      rightHandler: () => {
        console.log(2222);
      },
    });
    navigate.setOptions(navigatorProps as TNavigationOptions);
  });
  useEffect(() => {
    fetch(config.apiDomain + `/api/user/getUserById?userId=${friendId}`)
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
        console.log(user, "user");
      });
  }, [friendId]);
  console.log(dataFromRequestList, "dataFromRequestList");
  return (
    <View>
      {/* <Text>
        FriendInfo
        {friendId}
      </Text> */}
      <View
        style={{
          backgroundColor: themeColor.white,
          padding: 24,
          flexDirection: "row",
        }}
      >
        <UserAvatar
          source={{ uri: user?.image }}
          style={{ marginRight: 24, borderColor: "transparent" }}
        />
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text>{user?.act}</Text>
            <Fontisto name="female" color={themeColor.danger5} />
          </View>
          <Text>{user?.act || "shenzhen "}</Text>
        </View>
      </View>
      <View
        style={{
          paddingLeft:16,
          backgroundColor: themeColor.white,
          marginVertical: 12,
        }}
      >
        <View className="flex-row items-center" style={{ paddingVertical: 16 }}>
          <Text style={{ fontSize: 16, width: 80 }}>{t("Whats Up")}</Text>
          <Text style={{ fontSize: 14, color: themeColor.text4 }}>
            {t("Whellllll")}
          </Text>
        </View>
        <BottomWidthDivider />
        <View className="flex-row items-center" style={{ paddingVertical: 16 }}>
          <Text style={{ fontSize: 16, width: 80 }}>{t("From")}</Text>
          <Text style={{ fontSize: 14, color: themeColor.text4 }}>
            {t("Searched ID")}
          </Text>
        </View>
      </View>
      {dataFromRequestList?.status === "done" ? (
        <View
          style={{
            backgroundColor: themeColor.white,
            alignItems: "center",
            paddingVertical: 12,
          }}
        >
          <Text style={{ color: themeColor.text2, fontSize: 16 }}>ddd</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={{ backgroundColor: themeColor.white, paddingVertical: 12 }}
          onPress={() => {
            navigate.navigate(
              "pages/contacts/screens/friend-info-confirm/index",
              {
                friendId,
              }
            );
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: themeColor.textBlue,
              fontSize: 16,
            }}
          >
            {t("Add")}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default FriendInfo;
