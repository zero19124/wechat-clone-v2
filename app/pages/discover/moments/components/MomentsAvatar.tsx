import UserAvatar from "@/component/complex/UserAvatar";
import { useTheme } from "@/theme/useTheme";
import { useUser } from "app/store/user";
import { Text, View } from "react-native";
import { getSize } from "utils";
const MomentsAvatar = () => {
  const { userStore } = useUser();
  const { themeColor } = useTheme();

  return (
    <View
      className=" flex-row absolute justify-center "
      style={{ top: -48, right: 8 }}
    >
      <Text
        style={{
          fontSize: getSize(18),
          color: themeColor.bg2,
          paddingTop: 16,
        }}
      >
        {userStore.userInfo?.nickname || userStore.userInfo?.act}
      </Text>
      <UserAvatar
        style={{
          width: getSize(75),
          height: getSize(75),
          borderColor: "transparent",
        }}
        source={{ uri: userStore.userInfo?.image }}
      />
    </View>
  );
};
export default MomentsAvatar;
