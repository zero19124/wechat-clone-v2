import React, { memo } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TouchableOpacity from "../TouchableOpacity";
import Popup from "../Popup";
import Loading from "../Loading";
import { useThemeFactory } from "../Theme";
import { createStyle } from "./style";
import * as THEME_VARIABLE from "@/theme/styles/variables";
import type { ActionSheetProps, ActionSheetAction } from "./type";

const ActionSheet = (props: ActionSheetProps): JSX.Element => {
  const {
    actions = [],
    cancelText,
    description,
    children,
    onSelect,
    onCancel,
    onClose,
    ...rest
  } = props;
  const styles = createStyle(THEME_VARIABLE as any);
  console.log(styles, "stylesstylesstyles");
  const insets = useSafeAreaInsets();
  const activeBackground = THEME_VARIABLE.active_color;

  const handleCancel = () => {
    onClose?.();
    onCancel?.();
  };

  const handleSelect: ActionSheetProps["onSelect"] = (action, index) => {
    action?.callback?.(action);
    onSelect?.(action, index);
    onClose?.();
  };

  const renderItem = (it: ActionSheetAction, index: number) => (
    <TouchableOpacity
      style={[styles.item, it.style]}
      key={it.name}
      onPress={() => handleSelect(it, index)}
      activeBackgroundColor={activeBackground}
      disabled={it.disabled || it.loading}
    >
      {it.loading ? (
        <Loading
          // size={theme.action_sheet_loading_icon_size}
          // color={theme.action_sheet_item_disabled_text_color}
        />
      ) : (
        <>
          <Text
            style={[
              styles.name,
              { color: it.color },
              it.disabled && styles.disabled,
            ]}
          >
            {it.name}
          </Text>
          {!!it.subname && <Text style={styles.subname}>{it.subname}</Text>}
        </>
      )}
    </TouchableOpacity>
  );

  return (
    <Popup round position="bottom" onClose={onClose} {...rest}>
      {children || (
        <View style={{ paddingBottom: insets.bottom }}>
          {!!description && (
            <>
              <Text style={styles.description}>{description}</Text>
              <View style={styles.descriptionGap} />
            </>
          )}

          {actions.map(renderItem)}

          {!!cancelText && (
            <>
              <View style={styles.gap} />
              <TouchableOpacity
                style={styles.cancel}
                onPress={handleCancel}
                activeBackgroundColor={activeBackground}
              >
                <Text style={styles.cancelText}>{cancelText}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </Popup>
  );
};

export default memo(ActionSheet);
