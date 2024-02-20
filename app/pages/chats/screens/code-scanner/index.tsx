import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "expo-router";
import { defaultImageUrl } from "@/const/index";
// import RNQRGenerator from "rn-qr-generator";
import LinearGradient from "react-native-linear-gradient";
// import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/theme/useTheme";
const CodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");
  const navigator = useNavigation();
  const { themeColor } = useTheme();
  const verticalPosition = new Animated.Value(-200);
  const fadeAnim = new Animated.Value(1);
  const startAnimation = useCallback(() => {
    console.log("startAnimation");
    Animated.loop(
      Animated.parallel([
        Animated.timing(verticalPosition, {
          toValue: 200,
          duration: 2500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),

        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start(() => {
      // 重置动画
      verticalPosition.setValue(-200);
      fadeAnim.setValue(0.5);
      startAnimation();
    });
  }, [verticalPosition, fadeAnim]);
  useEffect(() => {
    if (text.includes("userId+")) {
      const userId = text.split("+")[1];
      navigator.navigate("pages/contacts/screens/friend-info/index", {
        friendId: userId,
        type: "new",
      });
    }
  }, [text]);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
    // Detect QR code in image

    // RNQRGenerator.detect({
    //   uri: require("@/assets/qrcode.png"),
    // })
    //   .then((response) => {
    //     const { values } = response; // Array of detected QR code values. Empty if nothing found.
    //     console.log(values, "values");
    //   })
    //   .catch((error) => console.log("Cannot detect QR code in image", error));
    // startAnimation();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(`Bar code with type ${type} and data ${data}+ has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  startAnimation();

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          { width: "100%", position: "absolute", zIndex: 1 },
          { transform: [{ translateY: verticalPosition }], opacity: fadeAnim },
        ]}
      >
        <LinearGradient
          colors={[
            "transparent",
            "rgba(89, 237, 90,0.05)",
            "rgba(89, 237, 90,0.1)",
            "rgba(89, 237, 90,0.9)",
          ]}
          // colors={["transparent", themeColor.primary, "transparent"]}
          style={{ width: "100%", height: 250 }}
        />
      </Animated.View>
      <TouchableOpacity
        onPress={() => {
          alert("tab!");
        }}
        style={{ position: "absolute", bottom: 320, zIndex: 1 }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          tab
        </Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: defaultImageUrl }}
        />
      </TouchableOpacity>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ width: "100%", height: "80%" }}
      />
      {scanned && (
        <Button
          title={"Tap to Scan Again"}
          onPress={() => {
            setScanned(false);
            setText("");
          }}
        />
      )}
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CodeScanner;
