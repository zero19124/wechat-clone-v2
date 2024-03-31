import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import UserAvatar from "@/component/complex/UserAvatar";
import { Popover, PopoverInstance } from "@/component/base/Popover";
import { useTranslation } from "react-i18next";
import { getSize } from "utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useTheme } from "@/theme/useTheme";
import { useUser } from "app/store/user";
import Toast from "@/component/base/Toast";
import { useLoadingStore } from "app/store/globalLoading";
import { useConfigState } from "app/store/globalConfig";

const NearByView = ({
  type = "normal",
  setHandler = () => {},
}: {
  setHandler?: (coordinates: any) => void;
  type?: "normal" | "chat-location";
}) => {
  // const data = {
  //   longitude: 113.93,
  //   latitude: 22.48,
  // };
  const { setLoadingStore } = useLoadingStore();
  const { config } = useConfigState();

  const { t } = useTranslation();
  const navigator = useNavigation();
  const [location, setLocation] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { themeColor } = useTheme();
  const params = useLocalSearchParams<{
    routeType: string;
    coordinates: any;
  }>();
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
        console.log(res, "res-location-1");
        return res.data;
      })
      .finally(() => {
        setLoadingStore({ loading: false });
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
        console.log(res, "res-location-3");
        return res.data.location.coordinates;
      });
  };
  useEffect(() => {
    if (params.routeType === "chat-location-check") {
      console.log("chat-location-check");
      setMarker(params.coordinates);
      return;
    }
    if (type === "chat-location") {
      console.log("chat-location");
      return;
    }
    setLoadingStore({ loading: true });
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
  const popover = useRef<PopoverInstance>(null);

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
      {
        <View
          style={{
            position: "absolute",
            top: 80,
            zIndex: 1,
            flexDirection: "row",
          }}
        >
          <MaterialCommunityIcons
            style={{
              marginLeft: 32,
            }}
            onPress={() => {
              navigator.goBack();
            }}
            name="arrow-left"
            size={24}
            color="black"
          />
          {type === "normal" && (
            <View
              style={{
                backgroundColor: themeColor.overlay2,
                marginLeft: "25%",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 24,
                borderRadius: 4,
              }}
            >
              <TouchableOpacity onPress={() => {}}>
                <Text style={{ color: themeColor.white }}>
                  {t("people near u: ")}
                  {locationData?.length}
                  {/* {onLineUserList?.map((user) => user.userName).join(",")} */}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      }

      <MapView
        onPress={onMapPress}
        initialRegion={{
          longitude: userInfo?.location?.coordinates[0],
          latitude: userInfo?.location?.coordinates[1],
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0521,
        }}
        style={[styles.map, { position: "relative" }]}
      >
        {marker && (
          <Marker coordinate={marker}>
            <Popover
              reference={
                <View style={{ padding: 24, paddingBottom: 4 }}>
                  <Text style={{ fontSize: 32 }}>😄</Text>
                </View>
              }
            >
              <TouchableOpacity
                style={{ width: getSize(150) }}
                onPress={() => {
                  if (type === "chat-location") {
                    console.log("chat-location");
                    setHandler?.(marker);
                    return;
                  }
                  if (params.routeType === "chat-location-check") {
                    console.log("chat-location-check");
                    return;
                  }
                  setMarker(null);
                  setLoadingStore({ loading: true });
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
                    })
                    .finally(() => {
                      setLoadingStore({ loading: false });
                    });
                }}
              >
                <Text style={{ padding: 12 }}>
                  {type === "normal"
                    ? t("Set New Location")
                    : t("Send Location")}
                </Text>
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
                  ref={popover}
                  onOpen={() => {
                    fetch(config.apiDomain + `/api/user/getOnlineUsers`)
                      .then((res) => {
                        return res.json();
                      })
                      .then((res) => {
                        console.log(res, "res-location-2");

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
                        <Text style={{ padding: 12 }}>
                          {t("status loading...")}
                        </Text>
                      )}
                    </View>
                    <TouchableOpacity
                      style={{
                        margin: 12,
                        borderRadius: 4,
                        marginTop: 2,
                        backgroundColor: themeColor.blue1,
                      }}
                      onPress={() => {
                        Toast.info(t("message sent!"));
                        popover.current?.hide();
                      }}
                    >
                      <Text style={{ padding: 12 }}>{t("say hi")}</Text>
                    </TouchableOpacity>
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
