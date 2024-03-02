import { useRouter } from "expo-router";
import GoBackIcon from "@/icons/common/go-back.svg";

import { Pressable, Text, View } from "react-native";
const GoBack = ({ color }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        console.log("back");
        router.back();
      }}
    >
      <GoBackIcon width={24} height={24} fill={color} />
    </Pressable>
  );
};
export default GoBack;
