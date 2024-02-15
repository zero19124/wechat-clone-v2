import { StyleSheet, Text, View, Image, TextProps } from "react-native";
import * as light from "@/theme/light";
import UserAvatar from "@/component/complex/UserAvatar";
import { IMomentData } from "../index";
import HeartOutlineIcon from "@/icons/discover/heart-outline.svg";
import MomentsImg from "./MomentsIms";
interface IMomentsCard {
  momentData: IMomentData;
}
const MomentsCard = (props: IMomentsCard) => {
  const { momentData } = props;
  return (
    <View
      style={[light.commonStyle.commonBorderBottom, style.momentsCardWrapper]}
    >
      <View style={style.momentsCardAvatar}>
        <UserAvatar source={{ uri: momentData.img }} />
      </View>
      <View style={style.momentsCardContentWrapper}>
        <Text style={style.momentsCardTextBlue}>{momentData.name}</Text>
        <View style={style.momentsCardContent}>
          <Text style={{ fontSize: 16, marginBottom: 8, marginTop: 4 }}>
            {momentData.content}
          </Text>
          {momentData.contentType === "video" ? (
            <View>
              <Text>video</Text>
            </View>
          ) : (
            <MomentsImg imgList={momentData.imgList} />
          )}
        </View>
        <View style={style.momentsCardBottom}>
          <Text style={{ color: light.themeColor.text1 }}>
            {momentData.time}
          </Text>
          <Image
            style={style.momentsCardBottomImg}
            source={require("@/assets/icon/discover/two-dot-moments.png")}
          />
        </View>

        <View style={style.momentsCardComment}>
          {/* like  */}
          <View
            style={{
              paddingHorizontal: 4,
              paddingVertical: 2,
              flexDirection: "row",
              ...light.commonStyle.commonBorderBottom,
            }}
          >
            <HeartOutlineIcon width={20} fill={light.themeColor.textBlue} />
            {momentData.likes.map((like) => {
              return (
                <Text style={[style.momentsCardTextBlue, { fontSize: 14 }]}>
                  {like.name}
                </Text>
              );
            })}
          </View>
          {/* comment  */}
          <View style={{ paddingHorizontal: 8, paddingVertical: 2 }}>
            {momentData.comments.map((com) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 2,
                  }}
                >
                  <Text style={[style.momentsCardTextBlue, { fontSize: 14 }]}>
                    {com.name}:
                  </Text>
                  <Text>{com.comment}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};
const momentsCardTextBlue = {
  color: light.themeColor.textBlue,
  fontWeight: "bold",
  fontSize: 16,
} as TextProps;
const style = StyleSheet.create({
  momentsCardContentWrapper: {
    flex: 1,
  },
  momentsCardComment: {
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: light.themeColor.bg2,
  },
  momentsCardContent: {
    marginBottom: 12,
  },
  momentsCardTextBlue,
  momentsCardBottomImg: {
    borderRadius: 4,
    width: 30,
    height: 20,
  },
  momentsCardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  momentsCardAvatar: {
    marginRight: 8,
  },
  momentsCardWrapper: {
    flexDirection: "row",
    padding: 16,
  },
});
export default MomentsCard;
