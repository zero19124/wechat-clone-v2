import {
  TNavigationOptions,
  useCommonNavigateProps,
} from "@/component/complex/CommonNavigateTitle";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ThreeDot from "@/icons/three-dot.svg";
import ArrowRightIcon from "@/icons/common/arrow-right.svg";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import BottomWidthDivider from "@/component/complex/BottomWidthDivider";
import UserAvatar from "@/component/complex/UserAvatar";
import config from "@/config/index";
import AddConfirmBtn from "./components/AddConfirmBtn";
import { useTheme } from "@/theme/useTheme";
import { useUser } from "app/store/user";
const FriendInfo = () => {
  const navigate = useNavigation();
  const { t } = useTranslation();
  const { themeColor } = useTheme();
  const [user, setUser] = useState();
  const { userInfo } = useUser().userStore;
  const params = useLocalSearchParams();
  const routeParams = useMemo<{
    friendId: string;
    confirm: boolean;
    type: string;
    status: undefined | string;
  }>(() => {
    if (params.type === "search") {
      return { friendId: params.friendId, type: params.type };
    }
    return {
      status: params.status,
      confirm: params.confirm,
      friendId: params.friendId,
      type: params.type,
    };
  }, [params]);

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
    console.log(routeParams, "routeParams");

    if (!routeParams.friendId) return;
    // get the friend info
    fetch(
      config.apiDomain + `/api/user/getUserById?userId=${routeParams.friendId}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "user");

        if (res.code === 200) {
          setUser(res.data);
        }
      });
  }, [routeParams]);
  return (
    <View>
      <View
        style={{
          backgroundColor: themeColor.white,
          padding: 24,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: 24,
          }}
        >
          <UserAvatar
            source={{ uri: user?.image }}
            style={{ marginRight: 24, borderColor: "transparent" }}
          />
          <View>
            <View
              style={{
                flexDirection: "row",
                gap: 16,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>{user?.act}</Text>
              <Fontisto name="female" color={themeColor.danger5} />
            </View>
            <Text style={{ fontSize: 16, marginTop: 4 }}>
              {t("Region: ")}
              {user?.region || "Shenzhen China"}
            </Text>
          </View>
        </View>

        <BottomWidthDivider />

        <TouchableOpacity
          style={{
            marginTop: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>{t("Edit Contact")}</Text>
          <ArrowRightIcon fill={themeColor.bg4} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingLeft: 16,
          backgroundColor: themeColor.white,
          marginVertical: 12,
        }}
      >
        <View className="flex-row items-center" style={{ paddingVertical: 16 }}>
          <Text style={{ fontSize: 16, width: 80 }}>{t("Whats Up")}</Text>
          <Text style={{ fontSize: 16, color: themeColor.text4 }}>
            {t("bio~~~")}
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
      {routeParams?.friendId !== userInfo?._id && (
        <AddConfirmBtn
          confirm={routeParams.confirm}
          friendId={routeParams?.friendId}
          status={routeParams?.status}
        />
      )}
    </View>
  );
};
export default FriendInfo;
