import { Dimensions } from "react-native";

export const DeviceWidth = Dimensions.get("window").width || 375;

/**
 * 获取rn适配大小
 * 只返回数字
 */
export const getSize = (px: number): number => {
  const uiWidth = 375;

  // pad 适配
  if (DeviceWidth > 700) {
    return px * 1.4;
  }

  // RN采用设计稿宽度适配布局
  return (px * DeviceWidth) / uiWidth;
};
export function convertCamelCaseToNormal(text: string) {
  return text.replace(/([a-z])([A-Z])/g, "$1 $2");
}
