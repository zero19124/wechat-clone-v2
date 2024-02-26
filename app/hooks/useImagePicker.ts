import * as ImagePicker from "expo-image-picker";
import config from "../config";
import Toast from "@/component/base/Toast";
export type TImageIns = {
  uri: string;
  type: "image" | "video" | undefined;
  name: string | null | undefined;
};
export const pickImages = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: true,
    quality: 1,
  });

  if (!result.canceled) {
    console.log(result, "result");
    const selectedImages = result?.assets?.map((image) => {
      return {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      };
    });
    console.log(selectedImages.length, "selectedImages.length");

    // setImages(selectedImages);
    // console.log(selectedImages, "selectedImages");

    const uploadedImgs = await uploadImages(selectedImages);
    if (uploadedImgs?.length) {
      return uploadedImgs;
    }
    return [];
  }
};
export const uploadImages = async (images: TImageIns[]) => {
  const formData = new FormData();
  console.log(images.length, "images.length");
  images.forEach((image, index) => {
    formData.append(`files`, {
      uri: image.uri,
      name: image.name,
      type: image.type,
    } as any);
  });
  console.log(formData, "formData");
  try {
    const response = await fetch(config.apiDomain + "/api/utils/upload", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/json",
      },
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
    console.error("Error:", error);
    return [];
  }
};