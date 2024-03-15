import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Keyboard,
} from "react-native";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import UserAvatar from "@/component/complex/UserAvatar";
import { useTranslation } from "react-i18next";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useTheme } from "@/theme/useTheme";
import { useUser } from "app/store/user";
import Toast from "@/component/base/Toast";
import { PusherContext } from "@/hooks/usePusherProvider";
import { TextInput } from "react-native-gesture-handler";
import DeviceInfo from "react-native-device-info";
import { useLoadingStore } from "app/store/globalLoading";
type TUserListInRoomData = {
  userId: string;
  messageIdForRoom: string;
  coordinates: number[];
  userName: string;
  userImg: string;
};
type TCoords = Location.LocationObject["coords"];
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
  const pusherContext = useContext(PusherContext);

  const [onLineUserList, setOnLineUserList] = useState<TUserListInRoomData[]>();
  const { userInfo } = useUser().userStore;
  const deviceModel = DeviceInfo.getModel();
  const curUserLocation = {
    longitude: userInfo?.location?.coordinates[0],
    latitude: userInfo?.location?.coordinates[1],
  };
  const { t } = useTranslation();
  const navigator = useNavigation();
  const [showView, setShowView] = useState(false);
  const { themeColor } = useTheme();
  const params = useLocalSearchParams<{
    messageIdForRoom: string;
  }>();

  // when user joined and interval this to get realtime location
  const updateCurLocationByUserId = (coordinates: TCoords) => {
    // return;
    pusherContext.socket?.emit("real-time-location-update", {
      messageIdForRoom: params.messageIdForRoom,
      userId: userInfo?._id,
      userImg: userInfo?.image,
      coordinates: coordinates as any,
    } as TUserListInRoomData);
  };
  const intervalId = useRef<NodeJS.Timeout>();
  const { setLoadingStore } = useLoadingStore();

  useEffect(() => {
    setLoadingStore({ loading: true });
    Location.getCurrentPositionAsync({}).then((coordinates) => {
      console.log(params, "params-real-time-location-join", coordinates);
      // step1
      // join a room

      setLoadingStore({ loading: true });

      pusherContext.socket?.emit("real-time-location-join", {
        messageIdForRoom: params.messageIdForRoom,
        userId: userInfo?._id,
        userImg: userInfo?.image,
        coordinates: {
          coords:
            deviceModel === "iPhone 13 Pro"
              ? coordinates.coords
              : curUserLocation,
        } as any,
      } as TUserListInRoomData);
      // todo
      intervalId.current = setInterval(async () => {
        return;
        let location = await Location.getCurrentPositionAsync({});
        updateCurLocationByUserId(location.coords);
      }, 3000);
    });
    pusherContext.socket?.on(
      "real-time-location-joined",
      (userListInRoom: TUserListInRoomData[]) => {
        setLoadingStore({ loading: false });
        // console.log(userListInRoom, "real-time-location-joined");
        setOnLineUserList(userListInRoom);
        Toast.info("friend joined");
      }
    );
    // update the list
    pusherContext.socket?.on(
      "real-time-location-updated",
      (data: TUserListInRoomData) => {
        console.log(data, "real-time-location-updated");
        setOnLineUserList(data);
      }
    );
    pusherContext.socket?.on("real-time-location-sb-left", (data) => {
      setOnLineUserList(data);
      console.log("real-time-location-sb-left");
      Toast.info("friend left");
    });
    return () => {
      clearInterval(intervalId.current);
      pusherContext.socket?.emit("real-time-location-leaving", {
        messageIdForRoom: params.messageIdForRoom,
        leavingUserId: userInfo?._id,
      });
      pusherContext.socket?.removeListener("real-time-location-joined");
      pusherContext.socket?.removeListener("real-time-location-sb-left");
    };
  }, []);
  const fadeAnim = new Animated.Value(1);
  const startAnimation = useCallback(() => {
    // console.log("startAnimation");
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 700,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 700,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);
  startAnimation();
  const [mockLocation, setMock] = useState({ ...curUserLocation });
  // console.log(mockLocation, "mockLocationmockLocation11");
  return (
    <View style={styles.container}>
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
        <View
          style={{
            backgroundColor: themeColor.overlay2,
            marginLeft: "30%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
            borderRadius: 4,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setShowView(true);
            }}
          >
            <Text style={{ color: themeColor.white }}>
              {t(" joined: ")}
              {onLineUserList?.length}
              {/* {onLineUserList?.map((user) => user.userName).join(",")} */}
            </Text>
          </TouchableOpacity>
        </View>
        {showView && (
          <View
            style={{
              width: 200,
              marginLeft: 50,
              position: "absolute",
              top: 80,
            }}
          >
            <TextInput
              keyboardType="numeric"
              value={String(mockLocation.longitude).substring(0, 6)}
              style={{ width: 100, height: 30, backgroundColor: "red" }}
              onChangeText={(l) => {
                // console.log(l, "22211");
                mockLocation.longitude = l;
                setMock({ ...mockLocation });
              }}
            />
            <TextInput
              keyboardType="numeric"
              value={String(mockLocation.latitude).substring(0, 6)}
              style={{ width: 100, height: 30, backgroundColor: "blue" }}
              onChangeText={(la) => {
                mockLocation.latitude = la;
                setMock({ ...mockLocation });
              }}
            />
            <TouchableOpacity
              style={{ backgroundColor: themeColor.primary, padding: 12 }}
              onPress={() => {
                // console.log(mockLocation, "mockLocation");
                setMock((pre) => {
                  pusherContext.socket?.emit("real-time-location-update", {
                    messageIdForRoom: params.messageIdForRoom,
                    userId: userInfo?._id,
                    userImg: userInfo?.image,
                    coordinates: pre as any,
                  } as TUserListInRoomData);
                  return pre;
                });
              }}
            >
              <Text>mock moving</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <MapView
        initialRegion={{
          ...curUserLocation,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0521,
        }}
        onPress={() => {
          Keyboard.dismiss();
        }}
        style={[styles.map, { position: "relative" }]}
      >
        {onLineUserList?.map((item, index) => {
          // console.log(item, "item", item.coordinates.coords);
          // console.log(item.coordinates, "item.coordinates.coords;");

          const { longitude, latitude } = item?.coordinates?.coords;
          return (
            <Marker.Animated
              key={index}
              style={{ opacity: fadeAnim }}
              coordinate={{
                longitude,
                latitude,
              }}
            >
              <UserAvatar
                defaultSource={require("@/assets/loading-image.png")}
                rounded
                source={{ uri: item.userImg }}
              />
            </Marker.Animated>
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
