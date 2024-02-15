import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Pressable, Text, View } from "react-native";
import CameraOutline from "@/icons/common/camera-outline.svg";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import GoBack from "@/component/complex/GoBack";
const Moments = () => {
  const navigator = useNavigation();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigator.setOptions({
      title: t("moments"),
      headerLeft: () => <GoBack />,
      headerRight: () => <CameraOutline />,
    } as NativeStackNavigationOptions);
  });
  return (
    <View>
      <Text>Moments</Text>
    </View>
  );
};
export default Moments;
