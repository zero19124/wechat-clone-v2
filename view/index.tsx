import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  Dimensions,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useTheme, ThemeProvider } from "../theme/useTheme";
import { Link, router } from "expo-router";
export default function Page() {
  console.log(3, "setStatusBarHidden");
  return (
    <SafeAreaView>
      <View
        style={{
          marginTop: Platform.OS === "android" ? 20 : 100,
        }}
      >
        <Link href="/about">About</Link>
        {/* ...other links */}
        <Link href="/view/login">View user</Link>
        <Link href="/view/about/test">link /view/about/test </Link>
        <TouchableOpacity
          onPress={() => {
            console.log(1111);
            router.push("/view/about/test");
          }}
        >
          <Text>push /view/about/test331</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export function App1() {
  // const { width, height } = useWindowDimensions();
  const widthPx = 390;
  const heightPx = 844;
  const { themeColor, toggleTheme, themeName } = useTheme();

  const w = (value) => {
    return (value * width) / widthPx;
  };
  const h = (value) => {
    return (value * height) / heightPx;
  };
  const { width, height } = Dimensions.get("window");
  return (
    <SafeAreaView style={{ paddingTop: StatusBar.height }}>
      <View style={{ width: 375, height: 100, backgroundColor: "red" }}>
        <Text style={{ color: "white" }}>375</Text>
      </View>
      <View style={{ width: "90%", height: 100, backgroundColor: "blue" }}>
        <Text style={{ color: "white" }}>90%</Text>
      </View>
      <View style={{ width: w(351), height: 100, backgroundColor: "black" }}>
        <Text style={{ color: "white" }}>351</Text>
      </View>
      <TouchableOpacity
        onPress={() => toggleTheme(themeName === "light" ? "dark" : "light")}
        style={{
          width: w(351),
          height: 100,
          backgroundColor: themeColor?.brand6,
        }}
      >
        <Text style={{ color: "white" }}>toggleTheme</Text>
      </TouchableOpacity>
      <View>
        <Text style={{ marginBottom: 12 }}>
          width of the device= {width}
          {"\n"}height of the device{height}
        </Text>
        <Text style={{ marginBottom: 12 }}>
          widthPx={widthPx} deviceW = {width.toFixed(0)}
        </Text>
        <Text>
          width{width} * inputW351 / widthPx {width.toFixed(0)} ={" "}
          {(width.toFixed(0) * 351) / widthPx}
        </Text>
        <Text style={{ marginTop: 12 }}>current* 90% = {width * 0.9}</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
