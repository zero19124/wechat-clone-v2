import { Platform, StyleSheet } from "react-native";
import { parseThemeColors, parseThemeText, parseThemeBorder } from "./utils";

const fillColor = "rgb(237,237,237)";

export const themeColor = {
  primary: "#07C160",
  fillColor,
  transferOrange: "#eea351",
  textBlue: "#576B95",
  bg1: "#FFFFFF",
  white: "#FFFFFF",
  bg2: "#F6F6F6",
  bg3: "#EDEDED",
  bg4: "#333333",
  bg5: "#000000",
  borderColor: "",
  text2: "#C9CDD4",
  text1: "#a0a0a0",
  text3: "#86909C",
  text4: "#4E5969",
  text5: "#1D2129",

  brand1: "#07C160",
  // msg
  brand2: "#94ea68",

  brand3: "#9BE0D5",
  brand4: "#72D4C3",
  brand5: "#45BFB0",
  brand6: "#34AC9D",
  brand7: "#1F8F82",
  brand8: "#128073",
  brand9: "#04665B",
  brand10: "#004D44",
  color: "#34AC9D",
  brandLight: "#DEFAF5",
  iconBlue: "#4d89d4",
  iconYellow: "#eac653",

  // text1: "#FFFFFF",

  line1: "#F2F3F5",
  line2: "#E5E6EB",
  line3: "#C9CDD4",
  line4: "#86909C",
  fill1: "#FFFFFF",
  fill2: "#F7F8FA",
  fill3: "#F2F3F5",
  fill4: "#E5E6EB",
  fill5: "#C9CDD4",
  fill6: "#4E5969",
  fill7: "#1D2129",
  danger1: "#fff2f2",
  danger2: "#ffd6d8",
  danger3: "#ffb5b8",
  danger4: "#ff9195",
  danger5: "#fb6e77",
  danger6: "#e35661",
  danger7: "#c9384a",
  danger8: "#b01c37",
  danger9: "#960627",
  danger10: "#730524",
  blue1: "#abcaff",
  blue2: "#8cb8ff",
  blue3: "#69a1ff",
  blue4: "#478dff",
  blue5: "#2174ff",
  blue6: "#0957d9",
  blue7: "#084dcd",
  blue8: "#073ab5",
  blue9: "#062e9a",
  blue10: "#1e2c60",
  nBlue1: "#e8f7ff",
  nBlue2: "#ccd5ff",
  nBlue3: "#aebaf2",
  nBlue4: "#93a1e6",
  nBlue5: "#657ae6",
  nBlue6: "#495fcc",
  nBlue7: "#4053b3",
  nBlue8: "#374799",
  nBlue9: "#2c397a",
  nBlue10: "#1d2652",
  warning1: "#fff4e5",
  warning2: "#ffd8ad",
  warning3: "#ffb97d",
  warning4: "#ff9852",
  warning5: "#ed8139",
  warning6: "#d66724",
  warning7: "#c25110",
  warning8: "#a24006",
  warning9: "#873105",
  warning10: "#692204",
  green1: "#E8FFEA",
  green2: "#AFF0B5",
  green3: "#7BE188",
  green4: "#4CD263",
  green5: "#23C343",
  green6: "#00B42A",
  green7: "#009A29",
  green8: "#008026",
  green9: "#006622",
  green10: "#004D1C",
  lime1: "#fdffee",
  lime2: "#eef8c2",
  lime3: "#def198",
  lime4: "#cbe970",
  lime5: "#b8e24b",
  lime6: "#a8db39",
  lime7: "#84b723",
  lime8: "#629412",
  lime9: "#447006",
  lime10: "#2a4d00",
  yellow1: "#fefff0",
  yellow2: "#fefec6",
  yellow3: "#fdfa9d",
  yellow4: "#fcf374",
  yellow5: "#fbe94b",
  yellow6: "#fae13c",
  yellow7: "#cfb325",
  yellow8: "#a38614",
  yellow9: "#785e07",
  yellow10: "#4d3800",
  gold1: "#fffce8",
  gold2: "#fdf4be",
  gold3: "#fce995",
  gold4: "#fadc6c",
  gold5: "#f9cc44",
  gold6: "#f7c034",
  gold7: "#cc961f",
  gold8: "#A26F0F",
  gold9: "#774b04",
  gold10: "#4d2d00",
  overlay1: "rgba(0, 0, 0, 0.24)",
  overlay2: "rgba(0, 0, 0, 0.32)",
  overlay3: "rgba(0, 0, 0, 0.48)",
  overlay4: "rgba(0, 0, 0, 0.64)",
  overlay5: "rgba(0, 0, 0, 0.8)",
  purple1: "#F5E8FF",
  purple2: "#DDBEF6",
  purple3: "#C396ED",
  purple4: "#A871E3",
  purple5: "#8D4EDA",
  purple6: "#722ED1",
  purple7: "#551DB0",
  purple8: "#3C108F",
  purple9: "#27066E",
  purple10: "#1bold4D",
  magenta1: "#FFE8F1",
  magenta2: "#FDC2DB",
  magenta3: "#FB9DC7",
  magenta4: "#F979B7",
  magenta5: "#F754A8",
  magenta6: "#E5463B",
  magenta7: "#CB1E83",
  magenta8: "#A11069",
  magenta9: "#77064F",
  magenta10: "#4D0034",
};

const officeSize =
  Platform.OS === "ios" && process.env.NODE_ENV === "production" ? 2 : 0;
// key: [fontSize, fontWeight, fontStyle, color, lineHeight]
const themeText = {
  textLabel10: [10 + officeSize, "400", "normal", themeColor.text4, 18],
  textLabelBold10: [10 + officeSize, "bold", "normal", themeColor.text4, 18],
  textLabel12: [12 + officeSize, "400", "normal", themeColor.text4, 20],
  textLabelBold12: [12 + officeSize, "bold", "normal", themeColor.text4, 20],
  textLabel14: [14 + officeSize, "400", "normal", themeColor.text4, 22],
  textLabelBold14: [14 + officeSize, "bold", "normal", themeColor.text4, 22],
  textLabel16: [16 + officeSize, "400", "normal", themeColor.text4, 24],
  textLabelBold16: [16 + officeSize, "bold", "normal", themeColor.text4, 24],
  textLabel20: [20 + officeSize, "400", "normal", themeColor.text4, 28],
  textLabelBold20: [20 + officeSize, "bold", "normal", themeColor.text4, 28],
  textLabel24: [24 + officeSize, "400", "normal", themeColor.text4, 32],
  textLabelBold24: [24 + officeSize, "bold", "normal", themeColor.text4, 32],
  textLabel28: [28 + officeSize, "400", "normal", themeColor.text4, 36],
  textLabelBold28: [28 + officeSize, "bold", "normal", themeColor.text4, 36],
  textLabel36: [36 + officeSize, "400", "normal", themeColor.text4, 44],
  textLabelBold36: [36 + officeSize, "bold", "normal", themeColor.text4, 44],
  textLabel48: [48 + officeSize, "400", "normal", themeColor.text4, 56],
  textLabelBold48: [48 + officeSize, "bold", "normal", themeColor.text4, 56],
  textLabel64: [64 + officeSize, "400", "normal", themeColor.text4, 72],
  textLabelBold64: [64 + officeSize, "bold", "normal", themeColor.text4, 72],
  textValue10: [10 + officeSize, "400", "normal", themeColor.text5, 18],
  textValueBold10: [10 + officeSize, "bold", "normal", themeColor.text5, 18],
  textValue12: [12 + officeSize, "400", "normal", themeColor.text5, 20],
  textValueBold12: [12 + officeSize, "bold", "normal", themeColor.text5, 20],
  textValue14: [14 + officeSize, "400", "normal", themeColor.text5, 22],
  textValueBold14: [14 + officeSize, "bold", "normal", themeColor.text5, 22],
  textValue16: [16 + officeSize, "400", "normal", themeColor.text5, 24],
  textValueBold16: [16 + officeSize, "bold", "normal", themeColor.text5, 24],
  textValue20: [20 + officeSize, "400", "normal", themeColor.text5, 28],
  textValueBold20: [20 + officeSize, "bold", "normal", themeColor.text5, 28],
  textValue24: [24 + officeSize, "400", "normal", themeColor.text5, 32],
  textValueBold24: [24 + officeSize, "bold", "normal", themeColor.text5, 32],
  textValue28: [28 + officeSize, "400", "normal", themeColor.text5, 36],
  textValueBold28: [28 + officeSize, "bold", "normal", themeColor.text5, 36],
  textValue36: [36 + officeSize, "400", "normal", themeColor.text5, 44],
  textValueBold36: [36 + officeSize, "bold", "normal", themeColor.text5, 44],
  textValue48: [48 + officeSize, "400", "normal", themeColor.text5, 56],
  textValueBold48: [48 + officeSize, "bold", "normal", themeColor.text5, 56],
  textValue64: [64 + officeSize, "400", "normal", themeColor.text5, 72],
  textValueBold64: [64 + officeSize, "bold", "normal", themeColor.text5, 72],
};
// key: [borderWidth, borderColor]
const themeBorder = {
  borderTopLine1: [1, "top", themeColor.line1],
  borderRightLine1: [1, "right", themeColor.line1],
  borderBottomLine1: [1, "bottom", themeColor.line1],
  borderLeftLine1: [1, "left", themeColor.line1],
  borderLine1: [1, "", themeColor.line1],

  borderTopLine2: [1, "top", themeColor.line2],
  borderRightLine2: [1, "right", themeColor.line2],
  borderBottomLine2: [1, "bottom", themeColor.line2],
  borderLeftLine2: [1, "left", themeColor.line2],
  borderLine2: [1, "", themeColor.line2],

  borderTopLine3: [1, "top", themeColor.line3],
  borderRightLine3: [1, "right", themeColor.line3],
  borderBottomLine3: [1, "bottom", themeColor.line3],
  borderLeftLine3: [1, "left", themeColor.line3],
  borderLine3: [1, "", themeColor.line3],

  borderTopLine4: [1, "top", themeColor.line4],
  borderRightLine4: [1, "right", themeColor.line4],
  borderBottomLine4: [1, "bottom", themeColor.line4],
  borderLeftLine4: [1, "left", themeColor.line4],
  borderLine4: [1, "", themeColor.line4],
};
/** 字体颜色 */
export const color = StyleSheet.create(parseThemeColors(themeColor, "color"));
/** 背景颜色 */
export const bg = StyleSheet.create(
  parseThemeColors(themeColor, "backgroundColor")
);
/** 字体规范 */
export const text = StyleSheet.create(parseThemeText(themeText));
/** 边框规范 */
export const border = StyleSheet.create(parseThemeBorder(themeBorder));
