import { StyleSheet } from "react-native";
import type { ViewStyle, TextStyle } from "react-native";
import type { ButtonType, ButtonSize } from "./type";
import { useTheme } from "@/theme/useTheme";

type Params = {
  type: ButtonType;
  size: ButtonSize;
  plain?: boolean;
};

type Styles = {
  button: ViewStyle;
  disabled: ViewStyle;
  plain: ViewStyle;
  round: ViewStyle;
  square: ViewStyle;
  text: TextStyle;
};

const createStyle = (
  theme: DiceUI.Theme,
  { type, size, plain }: Params
): Styles => {
  const { themeColor } = useTheme();
  const buttonTypeStyleMaps: Record<ButtonType, ViewStyle> = {
    default: {
      backgroundColor: theme.button_default_background_color,
      borderColor: theme.button_default_border_color,
      borderStyle: "solid",
      borderWidth: theme.button_border_width,
    },
    danger: {
      backgroundColor: theme.button_danger_background_color,
      borderColor: theme.button_danger_border_color,
      borderStyle: "solid",
      borderWidth: theme.button_border_width,
    },
    primary: {
      backgroundColor: themeColor.primary,
      borderColor: themeColor.primary,
      borderStyle: "solid",
      borderWidth: theme.button_border_width,
    },
    success: {
      backgroundColor: theme.button_success_background_color,
      borderColor: theme.button_success_border_color,
      borderStyle: "solid",
      borderWidth: theme.button_border_width,
    },
    warning: {
      backgroundColor: theme.button_warning_background_color,
      borderColor: theme.button_warning_border_color,
      borderStyle: "solid",
      borderWidth: theme.button_border_width,
    },
  };

  const buttonSizeStyleMaps: Record<ButtonSize, ViewStyle> = {
    normal: {},
    small: {
      height: theme.button_small_height,
    },
    large: {
      height: theme.button_large_height,
    },
    mini: {
      height: theme.button_mini_height,
    },
  };

  const contentPadding: Record<ButtonSize, ViewStyle> = {
    normal: {
      paddingHorizontal: theme.button_normal_padding_horizontal,
    },
    small: {
      paddingHorizontal: theme.button_small_padding_horizontal,
    },
    large: {},
    mini: {
      paddingHorizontal: theme.button_mini_padding_horizontal,
    },
  };

  const textSizeStyleMaps: Record<ButtonSize, TextStyle> = {
    normal: {
      fontSize: 14,
    },
    large: {
      fontSize: 18,
    },
    mini: {
      fontSize: 8,
    },
    small: {
      fontSize: 12,
    },
  };

  const textTypeStyleMaps: Record<ButtonType, TextStyle> = {
    default: {
      color: theme.button_default_color,
    },
    danger: {
      color: plain
        ? theme.button_danger_background_color
        : theme.button_danger_color,
    },
    primary: {
      color: plain
        ? themeColor.white
        : themeColor.white,
    },
    success: {
      color: plain
        ? theme.button_success_background_color
        : theme.button_success_color,
    },
    warning: {
      color: plain
        ? theme.button_warning_background_color
        : theme.button_warning_color,
    },
  };

  return StyleSheet.create<Styles>({
    button: {
      alignItems: "center",
      borderRadius: 8,
      flexDirection: "row",
      height: theme.button_default_height,
      justifyContent: "center",
      overflow: "hidden",
      position: "relative",
      ...buttonTypeStyleMaps[type],
      ...buttonSizeStyleMaps[size],
      ...contentPadding[size],
    },
    disabled: {
      opacity: theme.button_disabled_opacity,
    },
    plain: {
      backgroundColor: theme.button_plain_background_color,
    },

    round: {
      borderRadius: theme.button_round_border_radius,
    },

    square: {
      borderRadius: 0,
    },

    text: {
      ...textTypeStyleMaps[type],
      ...textSizeStyleMaps[size],
    },
  });
};

export default createStyle;
