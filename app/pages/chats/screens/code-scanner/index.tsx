import { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "expo-router";
import { defaultImageUrl } from "@/const/index";
// import RNQRGenerator from "rn-qr-generator";
import LinearGradient from "react-native-linear-gradient";
// import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/theme/useTheme";
import CloseIcon from "@/icons/common/close.svg";

import { getSize } from "utils";
import LinearLight from "./component/LinearLight";
import Dialog from "@/component/base/Dialog";
import { useTranslation } from "react-i18next";
import { useUser } from "app/store/user";
const CodeScanner = () => {
  // const { _id: userId } = useUser().userStore.userInfo!;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");
  const navigator = useNavigation();
  const { themeColor } = useTheme();
  const { t } = useTranslation();
  useEffect(() => {
    const [barCodeType, data] = text.split("///");
    try {
      console.log("type+text", text);
      if (!data) {
        return;
      }
      const [dataType, userIdField, userId] = data.split("+");
      // qrcode in me

      const goToFriendAdd = () => {
        navigator.navigate("pages/contacts/screens/friend-info/index", {
          friendId: userId,
          type: "new",
        });
      };
      const goToTransfer = () => {
        navigator.navigate("individual-payment/index", {
          recipientId: userId,
          type: "direct",
        });
      };

      if (dataType === "me-page") {
        Dialog.confirm({
          closeable: true,
          cancelButtonText: t("Transfer"),
          confirmButtonText: t("Add Friend"),
          title: t("Detected Qrcode"),
          message: t("do u wanna add as a friend or make a transfer?"),
        })
          .then(() => {
            goToFriendAdd();
          })
          .catch(() => {
            goToTransfer();
          })
          .finally(() => {
            reset();
          });
      }
      // qrcode in money accept
      if (dataType === "transfer") {
        goToTransfer();
      }
      // qrcode in friend
      if (dataType === "friend") {
        goToFriendAdd();
      }
    } catch (e) {
      console.log("error-", e);
    }
  }, [text, setText]);
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
    setTimeout(() => {
      setText(
        `Bar code with type ${type} data ///${data}/// has been scanned!`
      );
    }, 0);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const reset = () => {
    setScanned(false);
    setText("");
  };

  return (
    <View style={styles.container}>
      <LinearLight />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      <TouchableOpacity
        onPress={() => {
          navigator.goBack();
        }}
        style={{ position: "absolute", top: getSize(70), marginLeft: 12 }}
      >
        <CloseIcon
          width={getSize(28)}
          height={getSize(28)}
          fill={themeColor.white}
        />
      </TouchableOpacity>

      {scanned && (
        <TouchableOpacity
          style={{
            height: 90,
            backgroundColor: "black",
            ...StyleSheet.absoluteFillObject,
            top: "50%",
          }}
          onPress={() => {
            reset();
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            tab to scan again
          </Text>
          <Text style={{ color: "white" }}>{text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default CodeScanner;
