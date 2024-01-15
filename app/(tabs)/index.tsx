import {
  Button,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
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
import { RootSiblingParent } from "react-native-root-siblings";

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
              originY: 320,
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
    <RootSiblingParent>
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <Button
          title="topay"
          onPress={() => {
            router.push("individual-payment");
          }}
        ></Button>
        <Text style={{}}>tab i1ndex {Dimensions.get("window").width}</Text>
        <Button
          title="picker-image"
          onPress={() => {
            pickImageAsync();
          }}
        ></Button>
        <Image
          resizeMode="stretch"
          style={{ backgroundColor: "red", width: "100%", height: 70 }}
          source={imageSource}
        ></Image>
      </View>
    </RootSiblingParent>
  );
};
export default Page;
