import * as ImagePicker from "expo-image-picker";
import config from "../config";
import Toast from "@/component/base/Toast";
import { Platform } from "react-native";
import ImageManipulator from "expo-image-manipulator";
import { useLoadingStore } from "app/store/globalLoading";
export type TImageIns = {
  uri: string;
  type: "image" | "video" | undefined | "audio/mpeg";
  name: string | null | undefined;
};
export const pickImages = async ({
  startPicking = () => {},
  endPicking = () => {},
  afterUploaded = () => {},
  beforeUploaded = () => {},
} = {}) => {
  startPicking();
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: true,
    quality: 1,
  });
  endPicking();
  if (!result.canceled) {
    console.log(result, "result");
    const selectedImages = result?.assets?.map((image) => {
      return {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      };
    });
    console.log(selectedImages.length, "selectedImages.length-v2");

    // setImages(selectedImages);
    // console.log(selectedImages, "selectedImages");
    beforeUploaded();
    const uploadedImgs = await uploadImages(selectedImages);
    afterUploaded();
    if (uploadedImgs?.length) {
      return uploadedImgs;
    }
    return [];
  }
};
// 压缩图片的最大宽度和高度
const maxWidth = 800;
const maxHeight = 800;
export const uploadImages = async (
  images: TImageIns[],
  type: "img" | "audio/mpeg" | "video" = "img"
) => {
  // const { setLoadingStore } = useLoadingStore();

  const formData = new FormData();
  console.log(images.length, "images.length-uploadImages");

  images.forEach(async (image, index) => {
    
    const type = image.uri.split(".").pop();
    // const compressedImage = await ImageManipulator.manipulateAsync(
    //   image.uri,
    //   [{ resize: { maxWidth, maxHeight } }],
    //   { format: "jpeg", compress: 0.5 }
    // );

    formData.append(`files`, {
      uri: image.uri,
      // uri: compressedImage.uri,
      name: image.name,
      // todo  photo from camera error
      // https://github.com/facebook/react-native/issues/28551
      type: "image/jpg",
    } as any);
  });

  console.log(formData, "formData-uploadImages");
  console.log(formData["_parts"], "files-uploadImages");

  try {
    // setLoadingStore({ loading: true, text: "uploading..." });

    const response = await fetch(config.apiDomain + "/api/utils/upload", {
      method: "POST",
      body: formData,
      // data
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    const data = await response.json();
    if (data.code === 200) {
      console.log("ok");
      return data.data;
    } else {
      Toast.fail("upload failed");
      return [];
    }
  } catch (error) {
    console.error("Error-uploadImages:", error);
    return [];
  } finally {
    // setLoadingStore({ loading: false });
  }
};
