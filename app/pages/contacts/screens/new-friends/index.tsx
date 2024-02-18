import {
  TNavigationOptions,
  useCommonNavigateProps,
} from "@/component/complex/CommonNavigateTitle";
import UserAvatar from "@/component/complex/UserAvatar";
import config from "@/config/index";
import { useUser } from "app/store/user";
import { useNavigation } from "expo-router";

import MobilePhoneIcon from "@/icons/discover/mobile-phone.svg";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { themeColor } from "@/theme/light";
import SearchBar from "@/component/complex/SearchBar";
import BottomWidthDivider from "@/component/complex/BottomWidthDivider";
const NewFriends = () => {
  const navigate = useNavigation();
  const { t } = useTranslation();
  const { userStore } = useUser();
  const userId = useMemo(() => userStore.userInfo?._id, [userStore]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  useLayoutEffect(() => {
    const navigatorProps = useCommonNavigateProps({
      title: t("New Friends"),
      rightComp: () => (
        <Text style={{ fontSize: 16 }}>{t("Add Contacts")}</Text>
      ),
      rightHandler: () => {
        console.log(2222);
        navigate.navigate("pages/contacts/screens/add-contacts/index");
      },
    });
    navigate.setOptions(navigatorProps as TNavigationOptions);
  });
  useEffect(() => {
    fetch(
      config.apiDomain +
        `/api/friends/getFriendRequestByUserId?userId=${userId}`
    )
      .then((res) => res.json())
      .then((friends) => {
        setFriendRequestList(friends.friendRequestList);
        console.log(friends.friendRequestList, "friends");
      });
  }, []);
  return (
    <ScrollView>
      <SearchBar
        placeholder={t("Account/Mobile Number")}
        onPress={() => {
          navigate.navigate("pages/contacts/screens/add-contacts-search/index");
        }}
      />
      <View
        className=" justify-center items-center"
        style={{ backgroundColor: themeColor.white, paddingVertical: 8 }}
      >
        <MobilePhoneIcon height={33} width={33} fill={themeColor.primary} />
        <Text style={{ marginTop: 4 }}>{t("Mobile Contacts")}</Text>
      </View>
      <View
        style={{
          marginTop: 8,
          backgroundColor: themeColor.white,
          padding: 16,
          paddingRight: 0,
        }}
      >
        {friendRequestList.map((request) => {
          const { status, userId } = request;
          return (
            <TouchableOpacity
              onPress={() => {
                navigate.navigate("pages/contacts/screens/friend-info/index", {
                  status,
                  userId,
                });
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <UserAvatar source={{ uri: userId?.image }} />
                <View
                  style={{
                    flex: 1,
                    // backgroundColor: "red",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{userId?.act}</Text>
                  <Text>{status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};
export default NewFriends;
