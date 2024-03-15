import ImagePreview from "@/component/base/ImagePreview";
import UserAvatar from "@/component/complex/UserAvatar";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View, Image, TouchableOpacity, Pressable, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getSize } from "utils";

const LocationCard = ({ text, popover }) => {
  const value = JSON.parse(text.split("+")[1]);
  console.log(text, "LocationCard", value);
  const navigator = useNavigation();
  const {t} = useTranslation()
  if(Platform.OS ==='android'){
    return <Text>{t('android not support map')}</Text>
  }
  return (
    <Pressable
      onLongPress={() => {
        popover.current?.show();
      }}
    >
      <MapView
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
      </MapView>
    </Pressable>
  );
};
export default LocationCard;
