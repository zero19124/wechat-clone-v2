import {
  TNavigationOptions,
  useCommonNavigateProps,
} from "@/component/complex/CommonNavigateTitle";
import UserAvatar from "@/component/complex/UserAvatar";

import { useUser } from "app/store/user";
import { useFocusEffect, useNavigation } from "expo-router";
import { useGetSameApiOfGet } from "@/hooks/useSameApi";
import MobilePhoneIcon from "@/icons/discover/mobile-phone.svg";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import SearchBar from "@/component/complex/SearchBar";
import BottomWidthDivider from "@/component/complex/BottomWidthDivider";
import Toast from "@/component/base/Toast";
import ItemCard from "@/component/complex/ItemCard";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@/theme/useTheme";
import { useLoadingStore } from "app/store/globalLoading";
const NewFriends = () => {
  const navigate = useNavigation();
  const { t } = useTranslation();
  const { themeColor } = useTheme();
  const { userStore } = useUser();
  const { setLoadingStore } = useLoadingStore();

  const userId = useMemo(() => userStore.userInfo?._id, [userStore]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  useLayoutEffect(() => {
    const navigatorProps = useCommonNavigateProps({
      title: t("New Friends"),
      headerTitleAlign: "center",

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
  const { getFriendRequestListByUserId } = useGetSameApiOfGet();
  const getFriendRequestingList = () => {
    setLoadingStore({ loading: true });

    getFriendRequestListByUserId(userId + "")
      .then((res) => {
        console.log(res, "res1");
        if (res.code === 200) {
          if (!res.data) return;
          setFriendRequestList(res.data.friendRequestList);
          console.log(res.data.friendRequestList, "friendRequestList");
        } else {
          Toast.fail(res.data);
        }
      })
      .finally(() => {
        setLoadingStore({ loading: false });
      });
  };

  useFocusEffect(
    useCallback(() => {
      getFriendRequestingList();
    }, [])
  );
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
        {friendRequestList?.map((request, index) => {
          const { status, userId: user, confirm, remark } = request;
          console.log(user._id, "user._id");
          return (
            <ItemCard
              onPress={() => {
                navigate.navigate("pages/contacts/screens/friend-info/index", {
                  status,
                  confirm,
                  friendId: user._id,
                  type: "new",
                });
              }}
              key={index}
              showRightComp={true}
              textComp={() => {
                return (
                  <View style={{}}>
                    <Text
                      style={{
                        fontSize: 18,
                      }}
                    >
                      {user.act}
                    </Text>
                    <Text
                      style={{
                        marginTop: 2,
                        color: themeColor.text3,
                      }}
                    >
                      {remark || t("Hi I want to add u")}
                    </Text>
                  </View>
                );
              }}
              leftComp={() => {
                return <UserAvatar source={{ uri: user?.image }} />;
              }}
              rightComp={() => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 12,
                    }}
                  >
                    <AntDesign
                      style={{ transform: [{ rotate: "-60deg" }] }}
                      name="arrowright"
                      size={18}
                      color={themeColor.text2}
                    />
                    <Text
                      style={{
                        color: themeColor.text1,
                        marginLeft: 8,
                        fontSize: 16,
                      }}
                    >
                      {status}
                    </Text>
                  </View>
                );
              }}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};
export default NewFriends;
