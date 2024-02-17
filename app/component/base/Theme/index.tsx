import { useMemo } from "react";
import { createTheming } from "@callstack/react-theme-provider";
import { Dimensions, StyleSheet } from "react-native";
// import { defaultTheme } from '../styles';
import * as vars from "./variables";

type ThemeFactoryCallBack<T extends StyleSheet.NamedStyles<T>> = {
  styles: T;
  theme: DiceUI.Theme;
};
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const defaultTheme = {
  // Button
  button_mini_height: 24,
  button_mini_padding_horizontal: vars.padding_base,
  button_mini_font_size: vars.font_size_xs,
  button_small_height: 32,
  button_small_padding_horizontal: vars.padding_xs,
  button_small_font_size: vars.font_size_sm,
  button_normal_padding_horizontal: 15,
  button_normal_font_size: vars.font_size_md,
  button_large_height: 50,
  button_default_height: 44,
  button_default_font_size: vars.font_size_lg,
  button_default_color: vars.text_color,
  button_default_background_color: vars.background_2,
  button_default_border_color: vars.gray_4,
  button_primary_color: vars.white,
  button_primary_background_color: vars.primary_color,
  button_primary_border_color: vars.primary_color,
  button_success_color: vars.white,
  button_success_background_color: vars.success_color,
  button_success_border_color: vars.success_color,
  button_danger_color: vars.white,
  button_danger_background_color: vars.danger_color,
  button_danger_border_color: vars.danger_color,
  button_warning_color: vars.white,
  button_warning_background_color: vars.warning_color,
  button_warning_border_color: vars.warning_color,
  button_border_width: vars.border_width_base,
  button_border_radius: vars.border_radius_sm,
  button_round_border_radius: vars.border_radius_max,
  button_plain_background_color: vars.white,
  button_disabled_opacity: vars.disabled_opacity,
};

export const { ThemeProvider, withTheme, useTheme } =
  createTheming<DiceUI.Theme>(defaultTheme as DiceUI.Theme);

export function useThemeFactory<T extends StyleSheet.NamedStyles<T>, P>(
  fun: (theme: DiceUI.Theme, ...extra: P[]) => T,
  ...params: P[]
): ThemeFactoryCallBack<T> {
  const theme = useTheme();
  const styles = useMemo(() => fun(theme, ...params), [fun, theme, params]);

  return { styles, theme };
}

export default {
  ThemeProvider,
  withTheme,
  useTheme,
  useThemeFactory,
};
