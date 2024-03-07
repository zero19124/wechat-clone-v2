import { useTheme } from "@/theme/useTheme";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import { IMomentsCard } from "./MomentsCard";
import { useState } from "react";
import HeartOutlineIcon from "@/icons/discover/heart-outline.svg";
import HeartIcon from "@/icons/discover/heart.svg";
import CommentOutlineIcon from "@/icons/discover/comment-outline.svg";
import axios from "axios";

import { useTranslation } from "react-i18next";
import { useUser } from "app/store/user";
import config from "@/config/index";
import { TextInput } from "react-native-gesture-handler";
import { formatDateToString } from "@/utils/date";
const MomentsComment = (props: { momentData: IMomentsCard["momentData"] }) => {
  const { themeColor, commonStyle } = useTheme();
  const { momentData } = props;
  const { t } = useTranslation();
  const { userInfo } = useUser().userStore;
  const [commentVisible, setCommentVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const animatedValue = new Animated.Value(0);

  const handleAnimation = () => {
    setCommentVisible(!commentVisible);
  };
  // console.log(momentData, "momentData");
  return (
    <View style={style.momentsCardBottom}>
      <Text style={{ color: themeColor.text1 }}>{formatDateToString(momentData.createdAt)}</Text>
      {commentVisible && (
        <Animated.View
          style={[
            {
              right: 30,
              top: 2,
              position: "absolute",
              flexDirection: "row",
              backgroundColor: themeColor.bg4,
              paddingVertical: 4,
              borderRadius: 4,
              paddingHorizontal: 8,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setLiked(!liked);
              axios
                .post("api/moments/add-moments-like", {
                  momentsId: momentData._id,
                  likedUserId: userInfo?._id,
                  likedUserName: userInfo?.act,
                })
                .then((res) => {
                  console.log(1111, res);
                });
              setTimeout(() => {
                setCommentVisible(false);
              }, 300);
            }}
            style={[
              {
                flexDirection: "row",
                paddingHorizontal: 4,
                gap: 4,
                alignItems: "center",
              },
            ]}
          >
            {liked ? (
              <HeartIcon width={20} fill={themeColor.danger5} />
            ) : (
              <HeartOutlineIcon width={20} fill={themeColor.white} />
            )}
            <Text
              style={{
                color: themeColor.white,
              }}
            >
              {t("like")}
            </Text>
          </TouchableOpacity>
          {/* divider  */}
          <View
            style={{
              width: 1,
              backgroundColor: themeColor.bg5,
              marginHorizontal: 12,
            }}
          />
          {/* divider  end*/}
          <TouchableOpacity
            onPress={() => {
              axios
                .post("api/moments/add-moments-comment", {
                  momentsId: momentData._id,
                  commentedUserId: userInfo?._id,
                  commentedUserName: userInfo?.act,
                  // comment,
                })
                .then((res) => {
                  console.log(1111, res);
                });
              setTimeout(() => {
                setCommentVisible(false);
              }, 300);
            }}
            style={[
              {
                flexDirection: "row",
                marginHorizontal: 4,
                alignItems: "center",
                gap: 4,
              },
            ]}
          >
            <CommentOutlineIcon width={20} fill={themeColor.white} />
            <View>
              <Text
                style={{
                  color: themeColor.white,
                  textAlign: "center",
                }}
              >
                {t("comment")}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}

      <TouchableOpacity
        onPress={() => {
          handleAnimation();
        }}
      >
        <Image
          style={style.momentsCardBottomImg}
          source={require("@/assets/icon/discover/two-dot-moments.jpeg")}
        />
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  momentsCardBottomImg: {
    borderRadius: 4,
    width: 30,
    height: 20,
  },
  momentsCardBottom: {
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default MomentsComment;
