import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
// import { launchImageLibrary } from "@react-native-community/image-picker";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import ImageEditor from "@react-native-community/image-editor";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageManipulator } from "expo-image-crop";
import { useState } from "react";
import { router } from "expo-router";
import * as light from "../theme/light";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
const Page = () => {
  const [imageSource, setImageSource] = useState(null);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      quality: 1,
    });
    const source = { uri: result.assets[0].uri };
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      console.log(result);
      const cropData = {
        offset: { x: 0, y: 0 },
        size: { width: 100, height: 100 },
        displaySize: { width: 100, height: 100 },
        resizeMode: "cover",
      };

      const manipResult = await manipulateAsync(
        imageUri,
        [
          // { rotate: 90 },
          // { flip: FlipType.Vertical },
          {
            crop: {
              originX: 0,
              originY: 316,
              width: 1170,
              height: 200,
            },
          },
        ],
        { compress: 1, format: SaveFormat.PNG }
      );
      setImageSource(manipResult);

      // const cropImage = ImageManipulator.manipulate(imageUri, cropData);
      // console.log(cropImage, "cropImagecropImagecropImagecropImagecropImagecropImagecropImagecropImagecropImage");
    } else {
      alert("You did not select any image.");
    }
  };

  // launchImageLibrary({ mediaType: "photo" }, (response) => {

  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <TouchableWithoutFeedback
        onPress={() => {
          pickImageAsync();
        }}
      >
        <Image
          resizeMode="stretch"
          style={{ backgroundColor: "red", width: "100%", height: 70 }}
          source={imageSource}
        ></Image>
      </TouchableWithoutFeedback>
      <View style={{ backgroundColor: light.themeColor.fillColor, flex: 1 }}>
        <View
          style={{
            backgroundColor: "#fff",
            marginTop: 8,
            flex: 1,
            borderRadius: 24,
          }}
        >
          {/* 输入框 */}
          <View style={{ padding: 24 }}>
            <Text style={{ fontWeight: "bold" }}>Amount</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomColor: light.themeColor.fillColor,
                borderBottomWidth: StyleSheet.hairlineWidth,
                paddingBottom: 4,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 28 }}>￥</Text>
              <TextInput
                selectionColor={light.themeColor.primary}
                placeholderTextColor="red"
                inputMode="decimal"
                style={{
                  flex: 1,
                  // backgroundColor: "red",
                  height: 60,
                  fontSize: 48,
                  // fontWeight: "bold",
                }}
              />
            </View>
            <Text
              style={{
                marginTop: 18,
                color: "rgb(94,107,148)",
                fontWeight: "bold",
              }}
            >
              Add Note
            </Text>
          </View>
          {/* 九宫格 */}
          <View>
            <FontAwesome5 name="backspace" size={24} color="black" />
          </View>
        </View>
      </View>
    </View>
  );
};
export default Page;
