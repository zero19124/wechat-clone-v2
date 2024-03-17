import { useNavigation } from "expo-router";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, Pressable, Image, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getSize } from "utils";

const LocationCard = ({ text, popover }) => {
  const value = JSON.parse(text.split("+")[1]);
  const [count, setCount] = useState(0);
  const navigator = useNavigation();
  const { t } = useTranslation();
  // useEffect(() => {
  //   setCount((pre) => ++pre);
  // }, []);
  console.log(text, "LocationCard-log", count);

  if (Platform.OS === "android") {
    return (
      <Text style={{ paddingHorizontal: 8, paddingVertical: 2 }}>
        {t("android not support map")}
      </Text>
    );
  }
  const MoI = useCallback(
    memo(
      function MoI({ val }: { val: string }) {
        console.log("MoIMoIMoIMoIMoIMoI");
        return (
          <Image
            key={val}
            style={{ width: 50, height: 50 }}
            source={{
              uri: "https://wechat-server-jhc0.onrender.com/files/1710523292686.jpg",
            }}
          />
        );
      },
      () => {
        console.log(22222223333344);
        return true;
      }
    ),
    [text]
  );
  return (
    <Pressable
      onPress={() => {
        setCount((pre) => ++pre);
      }}
      onLongPress={() => {
        popover.current?.show();
      }}
    >
      <Text>{count}</Text>
      <MoI val={text} />
    </Pressable>
  );
};
export default memo(LocationCard);

{
  /* <MapView
          onPress={() => {
            navigator.navigate("pages/discover/screens/nearBy/index", {
              routeType: "chat-location-check",
              coordinates: value,
            });
          }}
          initialRegion={{
            longitude: value.longitude,
            latitude: value.latitude,
            latitudeDelta: 0.00221,
            longitudeDelta: 0.00221,
          }}
          style={[
            { borderRadius: 4, width: getSize(230), height: getSize(140) },
            { position: "relative" },
          ]}
        >
          <Marker coordinate={value}>
            <Text>🔥</Text>
          </Marker>
        </MapView> */
}
