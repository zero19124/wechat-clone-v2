import { FontAwesome5 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-root-toast";
import * as light from "../../theme/light";
import { getSize } from "../../utils";
import React from "react";
import { RootSiblingParent } from "react-native-root-siblings";
const InputKeyboard = (props) => {
  const { onChange, onDelete } = props;
  const numberList = Array.from({ length: 9 }, (_, i) => i + 1); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
  numberList.push(0);
  numberList.push(".");
  return (
    <RootSiblingParent>
      <View
        style={{
          paddingVertical: 8,
          flexDirection: "row",
          paddingBottom: 48,
          backgroundColor: light.themeColor.fillColor,
        }}
      >
        <View
          style={{
            width: getSize(290),
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {numberList.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                onChange(item);
              }}
              style={{
                margin: 4,

                borderRadius: 4,
                justifyContent: "center",
                alignItems: "center",
                width: item === 0 ? getSize(183) : getSize(87),
                height: getSize(50),
                backgroundColor: "#fff",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flex: 1, margin: 4, marginLeft: 0 }}>
          <TouchableOpacity
            onPress={() => {
              onDelete();
            }}
            style={{
              height: getSize(50),
              justifyContent: "center",
              backgroundColor: "#fff",
              marginBottom: 8,
              borderRadius: 4,
              alignItems: "center",
            }}
          >
            <FontAwesome5 name="backspace" size={24} color="black" />
          </TouchableOpacity>
          {/* <Toast /> */}
          <TouchableOpacity
            onPress={() => {
              console.log(Toast, "Toast");
              // Toast.show("This is a short toast");
              const toast = Toast.show("リンクがコピーされました！31", {
                duration: Toast.durations.LONG,
                position: 150,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
              });
            }}
            style={{
              borderRadius: 4,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              backgroundColor: light.themeColor.primary,
            }}
          >
            <Text style={{ color: "#fff" }}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RootSiblingParent>
  );
};
export default InputKeyboard;
