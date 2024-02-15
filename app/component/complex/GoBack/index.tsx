import { useRouter } from "expo-router";
import GoBackIcon from "@/icons/common/go-back.svg";

import { Pressable, Text, View } from "react-native";
const GoBack = () => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        console.log("back");
        router.back();
      }}
    >
      <GoBackIcon />
    </Pressable>
  );
};
export default GoBack;
