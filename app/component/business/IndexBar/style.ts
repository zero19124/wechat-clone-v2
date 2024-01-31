import { Dimensions, StyleSheet, TextStyle, ViewStyle } from "react-native";
import type { Vars } from "@/theme/styles/index";
export const indexBarDefaultVars = (vars: Vars) => ({
  index_bar_sidebar_z_index: 2,
  index_bar_sidebar_text_color: vars.text_color,
  index_bar_index_font_size: vars.font_size_xs,
  index_bar_index_line_height: vars.line_height_xs,
  index_bar_index_active_color: vars.primary_color,
  index_anchor_z_index: 1,
  index_anchor_padding_vertical: 0,
  index_anchor_padding_horizontal: vars.padding_md,
  index_anchor_text_color: vars.text_color,
  index_anchor_font_weight: vars.font_weight_bold,
  index_anchor_font_size: vars.font_size_md,
  index_anchor_line_height: 32,
  index_anchor_background_color: "transparent",
  index_anchor_sticky_text_color: vars.primary_color,
  index_anchor_sticky_background_color: vars.background_2,
});

interface Styles {
  wrapper: ViewStyle;
  sidebar: ViewStyle;
  index: TextStyle;
  indexActive: TextStyle;
}
export const tempLineHeight = 16;
export const tempNavigatorCount = 26;
export const createStyle = (
  theme: DiceUI.Theme,
  headerHeight: number
): Styles => {
  const halfHeaderHeight = headerHeight / 2;
  const screenHalfHeight = Dimensions.get("screen").height / 2;
  return StyleSheet.create<Styles>({
    index: {
      paddingHorizontal: 4,
      textAlign: "center",
      color: theme.index_bar_sidebar_text_color,
      fontSize: theme.index_bar_index_font_size,
      fontWeight: theme.font_weight_bold,
      width: tempLineHeight,
      height: tempLineHeight,
      lineHeight: tempLineHeight,
    },
    indexActive: {
      color: theme.index_bar_index_active_color,
    },
    sidebar: {
      position: "absolute",
      right: 2,
      zIndex: 4,
      // 布局不算全部 add headder /2
      top: screenHalfHeight - halfHeaderHeight,
      transform: [
        {
          translateY:
            // 自身的一半加上header的一半就是中间
            (-tempLineHeight * tempNavigatorCount) / 2 - halfHeaderHeight,
        },
      ],
      textAlign: "center",
    },
    // scrollview
    wrapper: {
      position: "relative",
    },
  });
};

interface AnchoreStyles {
  anchore: ViewStyle;
  anchoreText: TextStyle;
  sticky: ViewStyle;
  stickyText: TextStyle;
}

export const createAnchoreStyle = (theme: DiceUI.Theme): AnchoreStyles => {
  return StyleSheet.create<AnchoreStyles>({
    anchore: {
      backgroundColor: theme.index_anchor_background_color,
      paddingHorizontal: theme.index_anchor_padding_horizontal,
      paddingVertical: theme.index_anchor_padding_vertical,
      zIndex: theme.index_anchor_z_index,
    },
    anchoreText: {
      color: theme.index_anchor_text_color,
      fontSize: theme.index_anchor_font_size,
      fontWeight: theme.index_anchor_font_weight,
      lineHeight: theme.index_anchor_line_height,
    },
    sticky: {
      backgroundColor: theme.index_anchor_sticky_background_color,
      borderBottomColor: theme.gray_3,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    stickyText: {
      color: theme.index_anchor_sticky_text_color,
    },
  });
};
