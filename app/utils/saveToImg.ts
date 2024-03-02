import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import Toast from "@/component/base/Toast";
import { BarCodeScanner } from "expo-barcode-scanner";

export const captureScreenAndSaveToAlbum = async (viewRef: any) => {
  if (!viewRef) {
    Toast.fail("Save error");
    console.log(viewRef, "viewRef-null-captureScreenAndSaveToAlbum");
    return;
  }
  try {
    const uri = await captureRef(viewRef, {
      format: "png",
      quality: 1,
    });
    console.log(uri, "uri");
    // const barCodeResult = await BarCodeScanner.scanFromURLAsync(uri);
    // console.log(barCodeResult[0].data, "datadatadatadata");
    // 保存截图文件到相册
    const asset = await MediaLibrary.createAssetAsync(uri);
    console.log("Screenshot saved to album:", asset);
    Toast.info("Save Successfully");
    // 保存图像到本地文件系统
    // const fileUri = FileSystem.documentDirectory + "screenshot.png";
    // await FileSystem.copyAsync({ from: uri, to: fileUri });
    // console.log("Screenshot saved:", fileUri);
  } catch (error) {
    console.error("Error capturing screenshot:", error);
  }
};
