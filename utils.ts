import { Dimensions } from "react-native";
import DeviceInfo from "react-native-device-info";

export const DeviceWidth = Dimensions.get("window").width || 375;
export const DeviceHeight = Dimensions.get("window").height || 667;

/**
 * 获取rn适配大小
 * 只返回数字
 */
export const getSize = (px: number): number => {
  // console.log(DeviceWidth, "DeviceWidth", DeviceHeight, DeviceInfo.getModel());
  const uiWidth = 375;

  // pad 适配
  if (DeviceWidth > 700) {
    return px * 1.4;
  }

  // RN采用设计稿宽度适配布局
  return (px * DeviceWidth) / uiWidth;
};
/**
 * 获取rn高度适配大小
 * 只返回数字
 */
export const getHeight = (px: number): number => {
  const uiHeight = 667; // 设计稿的高度

  // pad 适配
  if (DeviceHeight > 1000) {
    return px * 1.5;
  }

  // RN采用设计稿高度适配布局
  return (px * DeviceHeight) / uiHeight;
};
export function convertCamelCaseToNormal(text: string) {
  return text.replace(/([a-z])([A-Z])/g, "$1 $2");
}
