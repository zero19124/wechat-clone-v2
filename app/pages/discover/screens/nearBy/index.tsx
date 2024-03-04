import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import config from "@/config/index";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import UserAvatar from "@/component/complex/UserAvatar";
import { Popover } from "@/component/base/Popover";
import { useTranslation } from "react-i18next";
import GoBack from "@/component/complex/GoBack";
import { getSize } from "utils";
import GoBackIcon from "@/icons/common/go-back.svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useTheme } from "@/theme/useTheme";
import { useUser } from "app/store/user";

const NearByView = () => {
  // const data = {
  //   longitude: 113.93,
  //   latitude: 22.48,
  // };
  const { t } = useTranslation();
  const navigator = useNavigation();
  const [location, setLocation] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { themeColor } = useTheme();

  const getUserList = async ([longitude, latitude]) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    const locationData = await fetch(
      config.apiDomain +
        `/api/utils/findNearbyUsersByCoordinates?latitude=${latitude}&longitude=${longitude}`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res, "res");
        return res.data;
      });
    setLocationData(locationData);
  };
  const getCurUserLocation = () => {
    return fetch(
      config.apiDomain + `/api/utils/findUsersById?userId=${userInfo?._id}`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res, "res");
        return res.data.location.coordinates;
      });
  };
  useEffect(() => {
    getCurUserLocation().then(async (coordinates) => {
      console.log(coordinates, "longitude, latitude");
      await getUserList(coordinates);
    });
    // (async () => {})();
  }, []);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const { userInfo } = useUser().userStore;
  const [marker, setMarker] = useState();
  const onMapPress = (e: any) => {
    if (marker) return;
    console.log(e.nativeEvent.coordinate, "e.nativeEvent.coordinate");
    setMarker({
      ...e.nativeEvent.coordinate,
    });
  };
  return (
    <View style={styles.container}>
      <MapView
        onPress={onMapPress}
        initialRegion={{
          longitude: userInfo?.location?.coordinates[0],
          latitude: userInfo?.location?.coordinates[1],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={[styles.map, { position: "relative" }]}
      >
        <MaterialCommunityIcons
          onPress={() => {
            console.log(3);
            navigator.goBack();
          }}
          style={{
            marginTop: getSize(80),
            marginLeft: 32,
          }}
          name="arrow-left"
          size={24}
          color="black"
        />
        {marker && (
          <Marker coordinate={marker}>
            <Popover
              reference={
                <View style={{ padding: 24, paddingBottom: 4 }}>
                  <Text>😄</Text>
                </View>
              }
            >
              <TouchableOpacity
                style={{ width: getSize(150) }}
                onPress={() => {
                  setMarker(null);
                  fetch(
                    config.apiDomain + "/api/utils/updateUserLocationByUserId",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        ...marker,
                        userId: userInfo?._id,
                      }),
                    }
                  )
                    .then((res) => {
                      return res.json();
                    })
                    .then(async (res) => {
                      const updatedUser = res.data;
                      console.log(res.data, "updateUserLocationByUserId");
                      // have to call have to recalulate
                      getUserList(updatedUser.location.coordinates);
                      // setLocationData((pre) => {
                      //   const foundUser = pre.find(
                      //     (item) => item._id === updatedUser._id
                      //   );
                      //   if (foundUser) {
                      //     foundUser.location.coordinates =
                      //       updatedUser.location.coordinates;
                      //   }
                      //   return [...pre];
                      // });
                    });
                }}
              >
                <Text style={{ padding: 12 }}>{t("Set New Location")}</Text>
              </TouchableOpacity>
            </Popover>
          </Marker>
        )}
        {locationData?.map((item) => {
          const [longitude, latitude] = item.location.coordinates;
          return (
            <Marker
              key={item._id}
              coordinate={{ longitude, latitude }}
              // image={{ uri: "https://placekitten.com/302/302" }}
              // style={{ width: 20, height: 20 }}
            >
              <View style={{ alignItems: "center" }}>
                {userInfo?._id === item._id ? (
                  <Text>{t("Me")}</Text>
                ) : (
                  <Text>
                    {(item.distance / 1000).toFixed(2)}
                    {t(" km")}
                  </Text>
                )}
                <Popover
                  onOpen={() => {
                    fetch(config.apiDomain + `/api/user/getOnlineUsers`)
                      .then((res) => {
                        return res.json();
                      })
                      .then((res) => {
                        console.log(res, "res");

                        setLocationData(
                          locationData.map((item) => {
                            const user = res.data.find(
                              (onlineUserItem) =>
                                onlineUserItem._id === item._id
                            );
                            if (user) {
                              item.onLine = true;
                            } else {
                              item.onLine = false;
                            }
                            return item;
                          })
                        );
                      });
                  }}
                  reference={
                    <UserAvatar rounded source={{ uri: item.image }} />
                  }
                >
                  <View style={{ width: getSize(150) }}>
                    <Text style={{ padding: 12 }}>
                      {t("name")}:{item.act}
                    </Text>
                    <View
                      style={{
                        margin: 8,
                        backgroundColor: item?.onLine
                          ? themeColor.primary
                          : themeColor.bg3,
                        borderRadius: 4,
                      }}
                    >
                      {item?.onLine ? (
                        <Text style={{ padding: 12 }}>
                          {item?.onLine ? t("online") : t("offline")}
                        </Text>
                      ) : (
                        <Text style={{ padding: 12 }}>status loading...</Text>
                      )}
                    </View>
                  </View>
                </Popover>
              </View>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};
// export default MapTest;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default NearByView;
