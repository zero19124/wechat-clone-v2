import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import GoBack from "../GoBack";
const CommonNavigateTitle = () => {
  return (
    <View>
      <Text>CommonNavigateTitle</Text>
    </View>
  );
};
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
export type TNavigationOptions = NativeStackNavigationOptions;
export const useCommonNavigateProps = (props: {
  title?: string;
  rightComp: () => React.ReactNode;
  goBackHandler?: () => void;
  rightHandler?: () => void;
}): TNavigationOptions => {
  const { title, rightComp, goBackHandler, rightHandler } = props;
  return {
    title: title,
    headerLeft: () => (
      <Pressable
        onPress={() => {
          goBackHandler?.();
        }}
      >
        <GoBack />
      </Pressable>
    ),
    headerRight: () => (
      <Pressable
        onPress={() => {
          rightHandler?.();
        }}
      >
        {rightComp}
      </Pressable>
    ),
  };
};
export default CommonNavigateTitle;
