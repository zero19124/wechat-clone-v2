import {
  View,
  Text,
  Animated,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import PanelSvgs from "@/icons/utils/svgs";
import { getSize } from "utils";
import * as light from "@/theme/light";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useNavigation, useRouter } from "expo-router";
const iconOrderOne = [
  "ImgPicker",
  "Camera",
  "Video",
  "Location",
  "RedPacket",
  "Transfer",
  "VoiceInput",
  "Favorites",
];
const iconOrderTwo = ["ContactCard", "File", "Coupons", "Music"];
const FnKeyBoard = ({ heightValue }: { heightValue: number }) => {
  console.log(PanelSvgs, "PanelSvgs");
  const { width } = Dimensions.get("window");
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white" },
    child: { width, justifyContent: "center" },
    text: { fontSize: width * 0.5, textAlign: "center" },
    touchItemWrapper: {
      backgroundColor: "tomato",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    touchItem: {
      margin: 16,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 16,
      backgroundColor: light.themeColor.white,
      width: getSize(60),
      height: getSize(60),
    },
  });
  const router = useRouter();
  const svgHandler = (name: string) => {
    switch (name) {
      case "Transfer":
        console.log(222);
        router.push("/individual-payment");
        break;
      case "ImgPicker":
        console.log(222);
        router.push("/pages/socket-test");
        break;
    }
  };
  return (
    <Animated.View
      style={{
        backgroundColor: "blue",
        height: heightValue,
        width: "100%",
        bottom: 0,
      }}
    >
      <SwiperFlatList showPagination={false}>
        <View style={[styles.child, styles.touchItemWrapper]}>
          {iconOrderOne.map((iconName, index) => {
            const Svg = PanelSvgs[iconName];
            return (
              <TouchableOpacity
                style={styles.touchItem}
                onPress={() => {
                  svgHandler(iconName);
                }}
              >
                <Svg style={{ height: 52 }} />
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={[
            styles.child,
            styles.touchItemWrapper,
            { backgroundColor: "thistle" },
          ]}
        >
          {iconOrderTwo.map((iconName, index) => {
            return (
              <TouchableOpacity style={styles.touchItem}>
                {PanelSvgs[iconName]()}
              </TouchableOpacity>
            );
          })}
        </View>
      </SwiperFlatList>
      <Animated.ScrollView
        horizontal
        style={{ flexDirection: "column" }}
      ></Animated.ScrollView>
    </Animated.View>
  );
};
export default FnKeyBoard;
