import { Pressable } from "react-native";
import GoBack from "../GoBack";

import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
export type TNavigationOptions = NativeStackNavigationOptions;
export const useCommonNavigateProps = (props: {
  title?: string;
  rightComp: () => React.ReactNode;
  goBackColor?: string;
  goBackHandler?: () => void;
  rightHandler?: () => void;
}): TNavigationOptions => {
  const { title, rightComp, goBackColor, goBackHandler, rightHandler } = props;
  return {
    title: title,
    headerTitleAlign: "center",

    headerLeft: () => (
      <Pressable
        onPress={() => {
          goBackHandler?.();
        }}
      >
        <GoBack color={goBackColor} />
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
