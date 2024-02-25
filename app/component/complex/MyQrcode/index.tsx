import {
  Pressable,
  StyleProp,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { QRCode, Canvas } from "easyqrcode-react-native/QRCode";
import { useLayoutEffect, useMemo } from "react";
import {
  TNavigationOptions,
  useCommonNavigateProps,
} from "@/component/complex/CommonNavigateTitle";
import { useNavigation } from "expo-router";
import ThreeDot from "@/icons/three-dot.svg";
import { useUser } from "app/store/user";

const MyQrcode = ({
  style,
  type = "add",
}: {
  type?: "add" | "transfer";
  style?: StyleProp<ViewStyle>;
}) => {
  const navigate = useNavigation();
  const { userStore } = useUser();
  useLayoutEffect(() => {
    const navigatorProps = useCommonNavigateProps({
      title: "",
      rightComp: () => (
        <Pressable
          onPress={() => {
            console.log("ThreeDot");
          }}
        >
          <ThreeDot />
        </Pressable>
      ),
      rightHandler: () => {
        console.log(2222);
      },
    });

    navigate.setOptions(navigatorProps as TNavigationOptions);
  });
  const logoImage =
    "https://avatars1.githubusercontent.com/u/4082017?s=160&v=4";
  // 3. Generate QRCode
  const text = useMemo(() => {
    if (userStore.userInfo?._id) {
      return type + "+userId+" + userStore.userInfo?._id;
    }
    return "";
  }, [userStore.userInfo]);
  const generateQRCode = (canvas) => {
    if (canvas !== null) {
      // QRCode options
      var options = {
        text,
        logo: userStore.userInfo?.image || "",
        width: 200,
        height: 200,
      };
      // Create QRCode Object
      var qrCode = new QRCode(canvas, options);
    }
  };
  return (
    <View style={[{ alignItems: "center" }, style]}>
      <Canvas style={{ width: 200, height: 200 }} ref={generateQRCode} />
    </View>
  );
};
export default MyQrcode;
