import {
  StyleSheet,
  Text,
  View,
  Image,
  TextProps,
  Pressable,
} from "react-native";
import UserAvatar from "@/component/complex/UserAvatar";
import { IMomentData } from "../index";
import HeartOutlineIcon from "@/icons/discover/heart-outline.svg";
import MomentsImg from "./MomentsIms";
import { useTheme } from "@/theme/useTheme";
import MomentsComment from "./MomentsComment";
import { Video, ResizeMode } from "expo-av";
import ImagePreview from "@/component/base/ImagePreview";
export interface IMomentsCard {
  momentData: IMomentData;
}

const MomentsCard = (props: IMomentsCard) => {
  const { themeColor, commonStyle } = useTheme();
  const momentsCardTextBlue = {
    color: themeColor.textBlue,
    fontWeight: "bold",
    fontSize: 16,
  } as TextProps;
  const style = StyleSheet.create({
    momentsCardContentWrapper: {
      flex: 1,
    },
    momentsCardComment: {
      paddingVertical: 6,
      borderRadius: 4,
      backgroundColor: themeColor.bg2,
    },
    momentsCardContent: {
      // marginBottom: 12,
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
  const { momentData } = props;

  return (
    <View style={[commonStyle.commonBorderBottom, style.momentsCardWrapper]}>
      <View style={style.momentsCardAvatar}>
        <UserAvatar source={{ uri: momentData.userId?.image }} />
      </View>
      <View style={style.momentsCardContentWrapper}>
        {/* userName  */}
        <Text style={style.momentsCardTextBlue}>{momentData.userId?.act}</Text>
        <View style={style.momentsCardContent}>
          <Text style={{ fontSize: 16, marginBottom: 8, marginTop: 4 }}>
            {momentData.contentText}
          </Text>
          {momentData.contentType === "video" ? (
            <View>
              <Video
                playsInSilentLockedModeIOS={true}
                // ref={video}
                style={{ width: "80%", height: 200 }}
                // style={styles.video}
                
                source={{
                  uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            </View>
          ) : (
            <MomentsImg imgList={momentData.imgList} />
          )}
        </View>
        <MomentsComment momentData={momentData} />
        {/* like  */}
        {momentData.likes.length > 0 && (
          <View style={style.momentsCardComment}>
            <View
              style={{
                paddingHorizontal: 4,
                paddingVertical: 2,
                flexDirection: "row",
                alignItems: "center",
                ...commonStyle.commonBorderBottom,
              }}
            >
              <HeartOutlineIcon width={20} fill={themeColor.textBlue} />
              <View style={{ marginLeft: 4 }}>
                {momentData.likes.map((like) => {
                  return (
                    <Text style={[style.momentsCardTextBlue, { fontSize: 14 }]}>
                      {like.name}
                    </Text>
                  );
                })}
              </View>
            </View>
          </View>
        )}
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
  );
};

export default MomentsCard;
