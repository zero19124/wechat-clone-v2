import constants from "@/utils/constants";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import GoBack from "../GoBack";
import CameraOutline from "@/icons/common/camera-outline.svg";
import { useNavigation } from "expo-router";
import { useTheme } from "@/theme/useTheme";
import React from "react";
import { useTranslation } from "react-i18next";
export const HEADER_HEIGHT = constants.screenHeight / 3;
export const SCROLL_THRESHOLD = HEADER_HEIGHT;
const ParallaxHeader: React.FC<{
  rightHandler?: () => void;
  scrollY: Animated.Value;
}> = ({ rightHandler, scrollY }) => {
  const navigator = useNavigation();
  const { themeColor } = useTheme();
  const { t } = useTranslation();
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_THRESHOLD - 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  return (
    <Animated.View
      style={{
        paddingTop: constants.statusBarHeight,
        paddingBottom: 12,
        flexDirection: "row",
        width: "100%",
        position: "absolute",
        paddingHorizontal: 24,
        zIndex: 10,
        justifyContent: "space-between",
        alignItems: "center",
        opacity: headerOpacity,
        backgroundColor: themeColor.fillColor,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigator.goBack();
        }}
      >
        <GoBack color={themeColor.bg5} />
      </TouchableOpacity>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{t("Moments")}</Text>

      <TouchableOpacity
        onPress={() => {
          rightHandler?.();
        }}
      >
        <CameraOutline />
      </TouchableOpacity>
    </Animated.View>
  );
};
export default ParallaxHeader;
