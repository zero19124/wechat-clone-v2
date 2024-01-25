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
import { convertCamelCaseToNormal, getSize } from "utils";
import * as light from "@/theme/light";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
const iconOrderOne = [
  "Album",
  "Camera",
  "VideoCall",
  "Location",
  "RedPacket",
  "Transfer",
  "VoiceInput",
  "Favorites",
];
const { width } = Dimensions.get("window");
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
    backgroundColor: light.themeColor.white,
    width: getSize(60),
    height: getSize(60),
  },
});
const iconOrderTwo = ["ContactCard", "File", "Coupons", "Music"];

const FnKeyBoard = ({ heightValue }: { heightValue: number }) => {
  console.log("FnKeyBoard", heightValue);
  const [heightValueMemo, setHeightValueMemo] = useState(0);

  useEffect(() => {
    heightValue?.addListener((value) => {
      if (value === 220) {
        console.log("当前值为：", value);
        setHeightValueMemo(0);
        return;
      }
      if (value === 0) {
        console.log("当前值为：", value);
        setHeightValueMemo(220);
        return;
      }
    });
  }, []);

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
  const SvgText = ({ children }) => (
    <Text
      style={{
        fontSize: 11,
        marginVertical: 8,
        color: light.themeColor.text4,
        textAlign: "center",
      }}
    >
      {convertCamelCaseToNormal(children)}
    </Text>
  );
  useEffect(() => {
    console.log(heightValueMemo, "heightValueMemo");
  }, [heightValueMemo]);
  return (
    <Animated.View
      style={{
        // backgroundColor: "blue",
        borderTopColor: light.themeColor.fill5,
        borderTopWidth: StyleSheet.hairlineWidth,
        height: heightValue,
        paddingTop: 12,
        width: "100%",
        bottom: 0,
      }}
    >
      <SwiperFlatList
        paginationStyleItem={{
          width: 8,
          height: 8,
          marginHorizontal: 4,
        }}
        // keyExtractor={(item) => item + Math.random()}
        paginationStyle={{ bottom: -12 }}
        showPagination={heightValueMemo < 10}
        // showPagination={true}
        paginationActiveColor={light.themeColor.bg4}
        paginationDefaultColor={light.themeColor.text1}
      >
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
      </SwiperFlatList>
    </Animated.View>
  );
};
export default FnKeyBoard;
