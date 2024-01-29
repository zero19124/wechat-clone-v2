import { themeColor } from "@/theme/light";
import QrCodeIcon from "@/icons/qr-code.svg";
import ArrowRightIcon from "@/icons/common/arrow-right.svg";
import PlusIcon from "@/icons/common/plus.svg";
import { SafeAreaView, Text, View, Image } from "react-native";
import RedDot from "@/component/complex/RedDot";
const Me = () => {
  const avatars = [
    require("@/assets/me.png"),
    require("@/assets/me.png"),
    require("@/assets/me.png"),
  ];
  return (
    <SafeAreaView style={{ backgroundColor: themeColor.white }}>
      <View
        className="flex-row"
        style={{ paddingTop: "16%", paddingBottom: 32 }}
      >
        <Image
          style={{
            marginLeft: 32,
            marginRight: 24,
            width: 60,
            height: 60,
            borderRadius: 4,
          }}
          source={require("@/assets/me.png")}
        />
        <View className="flex-1">
          <Text style={{ fontSize: 24, marginBottom: 8 }}>Evan</Text>
          <View className="flex-row justify-between items-center">
            <Text style={{ fontSize: 18, color: themeColor.text3 }}>
              Wechat Id: zero123456
            </Text>
            <View className="flex-row items-center" style={{ marginRight: 12 }}>
              <QrCodeIcon style={{ marginRight: 24 }} width={18} />
              <ArrowRightIcon />
            </View>
          </View>
          <View
            className="flex-row justify-center items-center"
            style={{
              alignSelf: "flex-start",
              marginTop: 8,
              paddingHorizontal: 8,
              borderRadius: "50%",
              borderColor: themeColor.fillColor,
              borderWidth: 1,
            }}
          >
            <PlusIcon width={16} />
            <Text
              style={{
                marginLeft: 4,
                paddingVertical: 2,
                color: themeColor.text3,
              }}
            >
              Status
            </Text>
          </View>
          <View
            className="flex-row justify-center items-center"
            style={{
              alignSelf: "flex-start",
              marginTop: 8,
              paddingLeft: 2,
              paddingRight: 8,
              paddingVertical: 2,
              borderRadius: "50%",
              borderColor: themeColor.fillColor,
              borderWidth: 1,
            }}
          >
            <View className="flex-row">
              {avatars.map((avatar, index) => {
                return (
                  <Image
                    style={{
                      width: 16,
                      marginLeft: index ? -(2 + index * 1.5) : 0,
                      height: 16,
                      borderColor: themeColor.white,
                      borderWidth: 1,
                      borderRadius: "50%",
                    }}
                    source={require("@/assets/me.png")}
                  />
                );
              })}
            </View>
            <Text
              style={{
                marginHorizontal: 4,
                paddingVertical: 2,
                color: themeColor.text3,
              }}
            >
              and other friends (9)
            </Text>
            <RedDot />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Me;
