import { useTheme } from "@/theme/useTheme";
import { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import UserAvatar from "../UserAvatar";
import HangUpBtn from "../HangUpBtn";
import AcceptBtn from "../AcceptBtn";
import { PortalRef } from "app/_layout";
import axios from "axios";
import config from "@/config/index";
const portalKey = "PhoneCalling";
const PhoneCalling = (props: {
  callUserId: string;
  rejectHandler: () => void;
  answerHandler: () => void;
}) => {
  const { callUserId, answerHandler, rejectHandler } = props;
  const translateY = useRef(new Animated.Value(0)).current;
  const { themeColor } = useTheme();
  const [callingUser, setCallingUser] = useState({ act: "", image: "" });
  useEffect(() => {
    axios
      .get(config.apiDomain + `/api/user/getUserById?userId=${callUserId}`)
      .then((user) => {
        console.log(user.data.data, "user-calling");
        setCallingUser(user.data.data);
      });
  }, []);
  useEffect(() => {
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 5,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -5,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    floatingAnimation.start();

    return () => {
      floatingAnimation.stop();
    };
  }, [translateY]);
  return (
    <Animated.View
      style={[
        {
          borderRadius: 8,
          right: 0,
          left: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 12,
          padding: 8,
          paddingHorizontal: 16,
          alignItems: "center",
          backgroundColor: themeColor.overlay4,
          position: "absolute",
          top: "15%",
        },
        {
          transform: [{ translateY: translateY }],
        },
      ]}
      key={portalKey}
    >
      <UserAvatar rounded source={{ uri: callingUser.image }} />
      <Text
        style={{
          color: themeColor.white,
          fontSize: 18,
          flex: 1,
          marginHorizontal: 8,
        }}
      >
        {callingUser.act} is calling
      </Text>

      <View
        className="justify-center items-center flex-row gap-4 bg-red-50"
        style={{ backgroundColor: themeColor.overlay4, height: 1 }}
      >
        <HangUpBtn
          width={38}
          height={38}
          sizeOut={26}
          onPress={() => {
            PortalRef.current?.removePortal(portalKey);
          }}
        />
        <AcceptBtn
          width={38}
          height={38}
          sizeOut={26}
          onPress={() => {
            PortalRef.current?.removePortal(portalKey);
          }}
        />
      </View>
    </Animated.View>
  );
};
export default PhoneCalling;
