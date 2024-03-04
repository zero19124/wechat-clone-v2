import {
  View,
  Text,
  Animated,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Keyboard,
} from "react-native";
import PanelSvgs from "@/icons/utils/svgs";
import { convertCamelCaseToNormal, getSize } from "utils";
import * as light from "@/theme/light";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { pickImages } from "@/hooks/useImagePicker";
import Swiper from "@/component/base/Swiper";
import { useTheme } from "@/theme/useTheme";
export const FN_TYPE_MAPS = {
  Album: "Album",
  Camera: "Camera",
  VideoCall: "VideoCall",
  Location: "Location",
  RedPacket: "RedPacket",
  Transfer: "Transfer",
  VoiceInput: "VoiceInput",
  Favorites: "Favorites",
};
const iconOrderOne = [
  FN_TYPE_MAPS.Album,
  FN_TYPE_MAPS.Camera,
  FN_TYPE_MAPS.VideoCall,
  FN_TYPE_MAPS.Location,
  FN_TYPE_MAPS.RedPacket,
  FN_TYPE_MAPS.Transfer,
  FN_TYPE_MAPS.VoiceInput,
  FN_TYPE_MAPS.Favorites,
];

const { width } = Dimensions.get("window");

const iconOrderTwo = ["ContactCard", "File", "Coupons", "Music"];

const FnKeyBoard = ({
  heightValue,
  handlers,
}: {
  heightValue: number;
  handlers: (type: keyof typeof FN_TYPE_MAPS, val: any) => void;
}) => {
  console.log("FnKeyBoard", heightValue);
  const { themeColor } = useTheme();
  const router = useRouter();
  const navigator = useNavigation();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: "white"
    },
    child: { width, justifyContent: "center" },
    text: { fontSize: width * 0.5, textAlign: "center" },
    touchItemWrapper: {
      // backgroundColor: "tomato",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    touchItem: {
      marginHorizontal: 16,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 16,
      backgroundColor: themeColor.white,
      width: getSize(60),
      height: getSize(60),
    },
  });
  const svgHandler = async (name: string) => {
    switch (name) {
      case FN_TYPE_MAPS.Transfer:
        console.log(222);
        router.push("/individual-payment");
        handlers?.(FN_TYPE_MAPS.Transfer, "");
        break;
      // case "ImgPicker":
      //   console.log(222);
      //   router.push("/pages/socket-test");
      //   handlers?.(FN_TYPE_MAPS.Album, "");

      //   break;
      case "Album":
        const imageList = await pickImages();
        if (imageList.length === 1) {
          handlers?.({ type: FN_TYPE_MAPS.Album, val: imageList[0] });
        }
        console.log("Album", imageList);

        break;
      case "Camera":
        navigator.navigate("pages/chats/msg-chats/screens/camera/index");
        break;
      case FN_TYPE_MAPS.VideoCall:
        handlers?.({ type: FN_TYPE_MAPS.VideoCall });
        break;
      case FN_TYPE_MAPS.Location:
        handlers?.({ type: FN_TYPE_MAPS.Location });
        break;
    }
  };
  const SvgText = ({ children }) => (
    <Text
      style={{
        fontSize: 11,
        marginVertical: 8,
        color: themeColor.text4,
        textAlign: "center",
      }}
    >
      {convertCamelCaseToNormal(children)}
    </Text>
  );

  const [showIndicator, setShowIndicator] = useState(false);
  const onLayoutChange = (event) => {
    const { height } = event.nativeEvent.layout;
    console.log(height, "height");
    if (height > 200) {
      setShowIndicator(true);
      return;
    }
    setShowIndicator(false);
  };
  return (
    <Animated.View
      onLayout={onLayoutChange}
      style={{
        // backgroundColor: "blue",
        borderTopColor: themeColor.fill5,
        borderTopWidth: StyleSheet.hairlineWidth,
        height: heightValue,
        paddingTop: 12,
        width: "100%",
        bottom: 0,
      }}
    >
      <Swiper
        initialSwipe={0}
        indicator={showIndicator}
        loop
        onChange={() => {}}
        indicatorStyle={{ bottom: -20 }}
        dotStyle={{ backgroundColor: themeColor.bg4 }}
        activeDotStyle={{ backgroundColor: themeColor.bg5 }}
      >
        <Swiper.Item>
          <View style={[styles.child, styles.touchItemWrapper]}>
            {iconOrderOne.map((iconName, index) => {
              const Svg = PanelSvgs[iconName];
              return (
                <View key={index + iconName}>
                  <TouchableOpacity
                    style={styles.touchItem}
                    onPress={() => {
                      svgHandler(iconName);
                    }}
                  >
                    <Svg width={32} height={32} />
                  </TouchableOpacity>
                  <SvgText>{iconName}</SvgText>
                </View>
              );
            })}
          </View>
        </Swiper.Item>
        <Swiper.Item>
          <View
            style={[
              styles.child,
              styles.touchItemWrapper,
              // { backgroundColor: "thistle" },
            ]}
          >
            {iconOrderTwo.map((iconName, index) => {
              const Svg = PanelSvgs[iconName];
              return (
                <View key={index + iconName}>
                  <TouchableOpacity style={styles.touchItem}>
                    <Svg width={32} height={32} />
                  </TouchableOpacity>
                  <SvgText>{iconName}</SvgText>
                </View>
              );
            })}
          </View>
        </Swiper.Item>
      </Swiper>
    </Animated.View>
  );
};
export default FnKeyBoard;
