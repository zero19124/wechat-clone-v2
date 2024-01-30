import { Dimensions } from "react-native";
import * as _vars from "./variables";
// import { imagePickerDefaultVars } from '../ImagePicker/style';
// import { imagePreviewDefaultVars } from '../ImagePreview/style';
import { indexBarDefaultVars } from "@/component/business/IndexBar/style";
// import { numberKeyBoardDefaultVars } from '../NumberKeyboard/style';
// import { searchDefaultVars } from '../Search/style';
// import { passwordInputDefaultVars } from '../PasswordInput/style';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createDefaultTheme = (vars: typeof _vars) => ({
  ...vars,
  dark: false,

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

  // Cell
  cell_font_size: vars.font_size_md,
  cell_line_height: 24,
  cell_padding_vertical: 10,
  cell_padding_horizontal: vars.padding_md,
  cell_text_color: vars.text_color,
  cell_background_color: vars.background_2,
  cell_border_color: vars.border_color,
  cell_active_color: vars.active_color,
  cell_required_color: vars.red,
  cell_label_color: vars.text_color_2,
  cell_label_font_size: vars.font_size_sm,
  cell_label_line_height: vars.line_height_sm,
  cell_label_margin_top: vars.padding_base,
  cell_value_color: vars.text_color_2,
  cell_icon_size: 16,
  cell_right_icon_color: vars.gray_6,
  cell_large_padding_vertical: vars.padding_sm,
  cell_large_title_font_size: vars.font_size_lg,
  cell_large_label_font_size: vars.font_size_md,
  cell_disabled_text_color: vars.text_color_3,

  // CellGroup
  cell_group_background_color: vars.background_2,
  cell_group_title_color: vars.text_color_2,
  cell_group_title_padding_horizontal: vars.padding_md,
  cell_group_title_padding_top: vars.padding_md,
  cell_group_title_padding_bottom: vars.padding_xs,
  cell_group_title_font_size: vars.font_size_md,
  cell_group_title_line_height: 16,
  cell_group_inset_padding_vertical: 0,
  cell_group_inset_padding_horizontal: vars.padding_md,
  cell_group_inset_radius: vars.border_radius_lg,
  cell_group_inset_title_padding_vertical: vars.padding_md,
  cell_group_inset_title_padding_horizontal: vars.padding_md,

  // Checkbox
  checkbox_icon_border_color: vars.gray_5,
  checkbox_icon_size: 20,
  checkbox_disabled_background_color: vars.border_color,
  checkbox_checked_icon_color: vars.primary_color,
  checkbox_label_color: vars.text_color,
  checkbox_label_margin: vars.padding_xs,
  checkbox_disabled_label_color: vars.text_color_3,
  checkbox_disabled_icon_color: vars.gray_5,

  // Radio
  radio_icon_border_color: vars.gray_5,
  radio_icon_size: 20,
  radio_disabled_background_color: vars.border_color,
  radio_checked_icon_color: vars.primary_color,
  radio_label_color: vars.text_color,
  radio_label_margin: vars.padding_xs,
  radio_disabled_label_color: vars.text_color_3,
  radio_disabled_icon_color: vars.gray_5,

  // Image
  image_default_size: 100, // 图片默认尺寸
  image_placeholder_text_color: vars.gray_6,
  image_placeholder_font_size: vars.font_size_md,
  image_placeholder_background_color: vars.background,
  image_loading_icon_size: 32,
  image_loading_icon_color: vars.gray_4,
  image_error_icon_size: 32,
  image_error_icon_color: vars.gray_4,

  // Switch
  switch_size: 30,
  switch_width_ratio: 2, // 原变量中使用了 em，这里改成对应的比例
  switch_height_ratio: 1, // 原变量中使用了 em，这里改成对应的比例
  switch_node_size_ratio: 1, // 原变量中使用了 em，这里改成对应的比例
  switch_node_background_color: vars.white,
  switch_background_color: vars.background_2,
  switch_on_background_color: vars.primary_color,
  switch_transition_duration: vars.animation_duration_base,
  switch_disabled_opacity: vars.disabled_opacity,
  switch_border_width: vars.border_width_base,
  switch_border_color: "rgba(0, 0, 0, 0.1)",

  // Tag
  tag_padding_horizontal: vars.padding_base,
  tag_text_color: vars.white,
  tag_font_size: vars.font_size_sm,
  tag_border_radius: 2,
  tag_line_height: 16,
  tag_medium_padding_vertical: 2,
  tag_medium_padding_horizontal: 6,
  tag_large_padding_vertical: vars.padding_base,
  tag_large_padding_horizontal: vars.padding_xs,
  tag_large_border_radius: vars.border_radius_md,
  tag_large_font_size: vars.font_size_md,
  tag_round_border_radius: vars.border_radius_max,
  tag_danger_color: vars.red,
  tag_primary_color: vars.blue,
  tag_success_color: vars.green,
  tag_warning_color: vars.orange,
  tag_default_color: vars.gray_6,
  tag_plain_background_color: vars.white,

  // Divider
  divider_margin_vertical: vars.padding_md,
  divider_margin_horizontal: vars.padding_md,
  divider_text_color: vars.text_color_2,
  divider_font_size: vars.font_size_md,
  divider_line_height: 24,
  divider_border_color: vars.border_color,
  divider_content_padding: vars.padding_md,
  divider_content_left_width: "10%",
  divider_content_right_width: "10%",

  // NavBar
  nav_bar_height: 46,
  nav_bar_background_color: vars.white,
  nav_bar_arrow_size: 16,
  nav_bar_icon_color: vars.primary_color,
  nav_bar_text_color: vars.primary_color,
  nav_bar_title_font_size: vars.font_size_lg,
  nav_bar_title_text_color: vars.text_color,
  nav_bar_z_index: 1,

  // NoticeBar
  notice_bar_height: 40,
  notice_bar_padding_horizontal: vars.padding_md,
  notice_bar_padding_vertical: 0,
  notice_bar_wrapable_padding_horizontal: vars.padding_md,
  notice_bar_wrapable_padding_vertical: vars.padding_xs,
  notice_bar_text_color: vars.orange_dark,
  notice_bar_font_size: vars.font_size_md,
  notice_bar_line_height: 24,
  notice_bar_background_color: vars.orange_light,
  notice_bar_icon_size: 16,
  notice_bar_icon_min_width: 24,

  // Rate
  rate_icon_size: 20,
  rate_icon_gutter: vars.padding_base,
  rate_icon_void_color: vars.gray_5,
  rate_icon_full_color: vars.danger_color,
  rate_icon_disabled_color: vars.gray_5,

  // Progress
  progress_height: 4,
  progress_color: vars.primary_color,
  progress_inactive_color: vars.gray_5,
  progress_background_color: vars.gray_3,
  progress_pivot_padding_horizontal: 5,
  progress_pivot_padding_vertical: 0,
  progress_pivot_text_color: vars.white,
  progress_pivot_font_size: vars.font_size_xs,
  progress_pivot_line_height: 1.6 * vars.font_size_xs,

  // Badge
  badge_size: 16,
  badge_color: vars.white,
  badge_padding_horizontal: 3,
  badge_padding_vertical: 0,
  badge_font_size: vars.font_size_sm,
  badge_font_weight: vars.font_weight_bold,
  badge_border_width: vars.border_width_base,
  badge_background_color: vars.danger_color,
  badge_dot_color: vars.danger_color,
  badge_dot_size: 8,

  // Circle
  circle_size: 100,
  circle_color: vars.primary_color,
  circle_layer_color: vars.white,
  circle_text_color: vars.text_color,
  circle_text_font_weight: vars.font_weight_bold,
  circle_text_font_size: vars.font_size_md,
  circle_text_line_height: vars.line_height_md,

  // Slider
  slider_active_background_color: vars.primary_color,
  slider_inactive_background_color: vars.gray_3,
  slider_disabled_opacity: vars.disabled_opacity,
  slider_bar_height: 2,
  slider_button_width: 24,
  slider_button_height: 24,
  slider_button_background_color: vars.white,

  // Swiper
  swiper_indicator_size: 6,
  swiper_indicator_margin: vars.padding_sm,
  swiper_indicator_active_opacity: 1,
  swiper_indicator_inactive_opacity: 0.3,
  swiper_indicator_active_background_color: vars.primary_color,
  swiper_indicator_inactive_background_color: vars.border_color,

  // Overlay
  overlay_background_color: "rgba(0, 0, 0, 0.7)",

  // Toast
  toast_max_width: 0.7 * windowWidth,
  toast_font_size: vars.font_size_md,
  toast_text_color: vars.white,
  toast_loading_icon_color: vars.white,
  toast_line_height: vars.line_height_md,
  toast_border_radius: vars.border_radius_lg,
  toast_background_color: "rgba(0, 0, 0, 0.7)",
  toast_icon_size: 36,
  toast_text_min_width: 96,
  toast_text_padding_vertical: vars.padding_xs,
  toast_text_padding_horizontal: vars.padding_sm,
  toast_default_padding: vars.padding_md,
  toast_default_width: 88,
  toast_default_min_height: 88,
  toast_position_top_distance: 0.2 * windowHeight,
  toast_position_bottom_distance: 0.2 * windowHeight,

  // Popup
  popup_background_color: vars.white,
  popup_round_border_radius: 16,
  popup_close_icon_size: 22,
  popup_close_icon_color: vars.gray_5,
  popup_close_icon_active_color: vars.gray_6,
  popup_close_icon_margin: 13,
  popup_title_font_size: vars.font_size_lg,
  popup_descrition_font_size: vars.font_size_md,
  popup_descrition_color: vars.gray_6,
  popup_header_font_size: vars.font_size_lg,
  popup_header_height: 48,

  // Typography
  typography_color: vars.text_color,
  typography_link_color: vars.primary_color,
  typography_font_size: vars.font_size_md,
  typography_line_height: vars.line_height_md,
  typography_primary_color: vars.primary_color,
  typography_danger_color: vars.danger_color,
  typography_success_color: vars.success_color,
  typography_warning_color: vars.warning_color,
  typography_secondary_color: vars.gray_6,
  typography_disabled_color: vars.gray_5,
  typography_light_color: vars.white,

  // ActionSheet
  action_sheet_max_height: 0.8 * windowHeight,
  action_sheet_description_color: vars.text_color_2,
  action_sheet_description_font_size: vars.font_size_md,
  action_sheet_description_line_height: vars.line_height_md,
  action_sheet_item_background: vars.background_2,
  action_sheet_item_font_size: vars.font_size_lg,
  action_sheet_item_line_height: vars.line_height_lg,
  action_sheet_item_text_color: vars.text_color,
  action_sheet_item_disabled_text_color: vars.text_color_3,
  action_sheet_subname_color: vars.text_color_2,
  action_sheet_subname_font_size: vars.font_size_sm,
  action_sheet_subname_line_height: vars.line_height_sm,
  action_sheet_close_icon_size: 22,
  action_sheet_close_icon_color: vars.gray_5,
  action_sheet_close_icon_padding_vertical: 0,
  action_sheet_close_icon_padding_horizontal: vars.padding_md,
  action_sheet_cancel_text_color: vars.gray_7,
  action_sheet_cancel_padding_top: vars.padding_xs,
  action_sheet_cancel_padding_color: vars.background,
  action_sheet_loading_icon_size: 22,

  // Tabs
  tab_text_color: vars.gray_7,
  tab_active_text_color: vars.text_color,
  tab_disabled_text_color: vars.text_color_3,
  tab_font_size: vars.font_size_md,
  tab_line_height: vars.line_height_md,
  tabs_default_color: vars.primary_color,
  tabs_line_height: 44,
  tabs_card_height: 30,
  tabs_nav_background: vars.background_2,
  tabs_bottom_bar_width: 40,
  tabs_bottom_bar_height: 3,
  tabs_bottom_bar_color: vars.primary_color,

  // Field
  field_label_width: 6.2 * 14,
  field_label_color: vars.text_color,
  field_label_margin_right: vars.padding_sm,
  field_input_text_color: vars.text_color,
  field_input_error_text_color: vars.danger_color,
  field_input_disabled_text_color: vars.text_color_3,
  field_placeholder_text_color: vars.text_color_3,
  field_icon_size: 16,
  field_clear_icon_size: 16,
  field_clear_icon_color: vars.gray_5,
  field_right_icon_color: vars.gray_6,
  field_error_message_color: vars.danger_color,
  field_error_message_font_size: 12,
  field_text_area_min_height: 60,
  field_word_limit_color: vars.gray_7,
  field_word_limit_font_size: vars.font_size_sm,
  field_word_limit_line_height: 16,
  field_disabled_text_color: vars.text_color_3,
  field_intro_color: vars.gray_6,

  // Dialog
  dialog_width: 320,
  dialog_small_screen_width: 0.9 * windowWidth,
  dialog_font_size: vars.font_size_lg,
  dialog_transition: vars.animation_duration_base,
  dialog_radius: 16,
  dialog_background: vars.background_2,
  dialog_header_font_weight: vars.font_weight_bold,
  dialog_header_line_height: 24,
  dialog_header_padding_top: 26,
  dialog_header_isolated_padding_vertical: vars.padding_lg,
  dialog_header_isolated_padding_horizontal: 0,
  dialog_message_padding: vars.padding_lg,
  dialog_message_font_size: vars.font_size_md,
  dialog_message_line_height: vars.line_height_md,
  dialog_message_max_height: 0.6 * windowHeight,
  dialog_has_title_message_text_color: vars.gray_7,
  dialog_has_title_message_padding_top: vars.padding_xs,
  dialog_button_height: 48,
  dialog_round_button_height: 36,
  dialog_confirm_button_text_color: vars.primary_color,

  // ActionBar
  action_bar_background: vars.background_2,
  action_bar_height: 50,
  action_bar_icon_width: 48,
  action_bar_icon_height: "100%",
  action_bar_icon_color: vars.text_color,
  action_bar_icon_size: 18,
  action_bar_icon_font_size: vars.font_size_xs,
  action_bar_icon_active_color: vars.active_color,
  action_bar_icon_text_color: vars.text_color,
  action_bar_icon_background: vars.background_2,
  action_bar_button_height: 40,
  action_bar_button_warning_color: vars.orange, // TODO: 需要为过渡色
  action_bar_button_danger_color: vars.red, // TODO: 需要为过渡色

  // Empty
  empty_padding_vertical: vars.padding_xl,
  empty_padding_horizontal: 0,
  empty_image_size: 160,
  empty_description_margin_top: vars.padding_md,
  empty_description_padding_vertical: 0,
  empty_description_padding_horizontal: 60,
  empty_description_color: vars.text_color_2,
  empty_description_font_size: vars.font_size_md,
  empty_description_line_height: vars.line_height_md,
  empty_bottom_margin_top: 24,

  // Notify
  notify_text_color: vars.white,
  notify_padding_horizontal: vars.padding_md,
  notify_padding_vertical: vars.padding_xs,
  notify_font_size: vars.font_size_md,
  notify_line_height: vars.line_height_md,
  notify_primary_background_color: vars.primary_color,
  notify_success_background_color: vars.success_color,
  notify_danger_background_color: vars.danger_color,
  notify_warning_background_color: vars.warning_color,

  // Grid
  grid_item_content_padding_vertical: vars.padding_md,
  grid_item_content_padding_horizontal: vars.padding_xs,
  grid_item_content_background: vars.background_2,
  grid_item_content_active_color: vars.active_color,
  grid_item_item_icon_size: 28,
  grid_item_text_color: vars.text_color,
  grid_item_text_font_size: vars.font_size_sm,

  // Stepper
  stepper_background: vars.active_color,
  stepper_button_icon_color: vars.text_color,
  stepper_button_disabled_color: vars.background,
  stepper_button_disabled_icon_color: vars.gray_5,
  stepper_button_round_theme_color: vars.primary_color,
  stepper_input_width: 32,
  stepper_input_height: 28,
  stepper_input_font_size: vars.font_size_md,
  stepper_input_text_color: vars.text_color,
  stepper_input_disabled_text_color: vars.text_color_3,
  stepper_input_disabled_background: vars.active_color,
  stepper_radius: vars.border_radius_md,

  // Picker
  picker_background: vars.background_2,
  picker_toolbar_height: 44,
  picker_title_font_size: vars.font_size_lg,
  picker_title_line_height: vars.line_height_md,
  picker_action_padding_vertical: 0,
  picker_action_padding_horizontal: vars.padding_md,
  picker_action_font_size: vars.font_size_md,
  picker_confirm_action_color: vars.link_color,
  picker_cancel_action_color: vars.text_color_2,
  picker_option_font_size: vars.font_size_lg,
  picker_option_padding_vertical: 0,
  picker_option_padding_horizontal: vars.padding_base,
  picker_option_text_color: vars.text_color,
  picker_option_disabled_opacity: 0.3,
  picker_loading_icon_color: vars.primary_color,
  picker_loading_mask_color: "rgba(255, 255, 255, 0.9)",
  picker_mask_top_color: [
    "rgba(255, 255, 255, 0.9)",
    "rgba(255, 255, 255, 0.4)",
  ],
  picker_mask_bottom_color: [
    "rgba(255, 255, 255, 0.4)",
    "rgba(255, 255, 255, 0.9)",
  ],

  // Calendar
  calendar_background: vars.background_2,
  calendar_popup_height: 0.8 * windowHeight,
  calendar_header_title_height: 44,
  calendar_header_title_font_size: vars.font_size_lg,
  calendar_header_subtitle_font_size: vars.font_size_md,
  calendar_weekdays_height: 30,
  calendar_weekdays_font_size: vars.font_size_sm,
  calendar_month_title_font_size: vars.font_size_md,
  calendar_month_mark_color: "rgba(242, 243, 245, 0.8)",
  calendar_month_mark_font_size: 160,
  calendar_day_height: 64,
  calendar_day_font_size: vars.font_size_lg,
  calendar_day_margin_bottom: 4,
  calendar_range_edge_color: vars.white,
  calendar_range_edge_background: vars.primary_color,
  calendar_range_middle_color: vars.primary_color,
  calendar_range_middle_background_opacity: 0.1,
  calendar_selected_day_size: 54,
  calendar_selected_day_color: vars.white,
  calendar_info_font_size: vars.font_size_xs,
  calendar_info_line_height: vars.line_height_xs,
  calendar_selected_day_background: vars.primary_color,
  calendar_day_disabled_color: vars.text_color_3,
  calendar_confirm_button_height: 36,
  calendar_confirm_button_margin_vertical: 7,
  calendar_confirm_button_margin_horizontal: 7,

  // Collapse
  collapse_item_content_padding_vertical: vars.padding_sm,
  collapse_item_content_padding_horizontal: vars.padding_md,
  collapse_item_content_font_size: vars.font_size_md,
  collapse_item_content_line_height: 1.5 * vars.font_size_md,
  collapse_item_content_text_color: vars.text_color_2,
  collapse_item_content_background_color: vars.background_2,

  // Popover
  popover_arrow_size: 6,
  popover_radius: vars.border_radius_lg,
  popover_action_width: 128,
  popover_action_height: 44,
  popover_action_font_size: vars.font_size_md,
  popover_action_line_height: vars.line_height_md,
  popover_action_icon_size: 20,
  popover_light_text_color: vars.text_color,
  popover_light_background: vars.background_2,
  popover_light_action_disabled_text_color: vars.text_color_3,
  popover_dark_text_color: vars.white,
  popover_dark_background: "#4a4a4a",
  popover_dark_action_disabled_text_color: vars.text_color_2,

  // Selector
  selector_color: vars.gray_2,
  selector_checkd_color: "#ecf9ff",
  selector_text_color: vars.text_color,
  selector_checked_text_color: vars.primary_color,
  selector_border_width: 0,
  selector_border_color: "transparent",
  selector_checkedborder_color: "transparent",
  selector_border_radius: vars.border_radius_sm,
  selector_padding_horizontal: vars.padding_md,
  selector_padding_vertical: vars.padding_xs,

  // // ImagePreview
  // ...imagePreviewDefaultVars(vars),

  // // ImagePicker
  // ...imagePickerDefaultVars(vars),

  // // IndexBar
  ...indexBarDefaultVars(vars),

  // // NumberKeyboard
  // ...numberKeyBoardDefaultVars(vars),

  // // Search
  // ...searchDefaultVars(vars),

  // // PasswordInput
  // ...passwordInputDefaultVars(vars),
});

export const defaultTheme = createDefaultTheme(_vars);
