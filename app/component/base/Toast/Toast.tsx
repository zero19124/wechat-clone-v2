import React, { useState, useEffect } from "react";
import { View, Text, LayoutChangeEvent, Dimensions } from "react-native";
import Icon, { IconNames } from "@pingtou/rn-vant-icons";
import { useThemeFactory } from "../Theme";
import type { ToastProps } from "./type";
import createStyle from "./style";
import Transitions from "../Transitions";
import Loading from "../Loading";
import { isDef } from "@/utils/typeof";
import * as THEME_VARIABLE from "@/theme/styles/variables";
import { defaultTheme } from "@/theme/styles";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export type TimoutTimer = ReturnType<typeof setTimeout>;

const Toast = (
  props: ToastProps & { clearTimer: React.MutableRefObject<TimoutTimer> }
): JSX.Element => {
  const {
    position = "middle",
    message,
    icon,
    type = "info",
    loadingType = "circular",
    duration = 2000,
    clearTimer,
  } = props;
  const [visible, setVisible] = useState<boolean>(true);
  const [layoutStyle, setLayoutStyle] = useState<{ left: number; top: number }>(
    {
      left: 0,
      top: 0,
    }
  );
  // const { styles, theme } = useThemeFactory(createStyle);
  const styles = createStyle(THEME_VARIABLE as any);
  const theme = defaultTheme;
  const renderIcon = () => {
    const hasIcon = icon || type === "success" || type === "fail";

    if (hasIcon) {
      const iconSize = props.iconSize || theme.toast_icon_size;

      if (React.isValidElement(icon)) return icon;

      return (
        <Icon
          name={(icon as IconNames) || (type === "fail" ? "cross" : type)}
          size={iconSize}
          color={theme.toast_text_color}
          style={{ marginBottom: theme.padding_xs }}
        />
      );
    }

    if (type === "loading") {
      return (
        <Loading
          type={loadingType}
          color={theme.toast_loading_icon_color}
          style={{
            padding: theme.padding_base,
            marginBottom: theme.padding_xs,
          }}
        />
      );
    }

    return null;
  };

  const renderMessage = () => {
    if (isDef(message) && message !== "") {
      return <Text style={styles.text}>{message}</Text>;
    }

    return null;
  };

  useEffect(() => {
    if (duration && duration > 0) {
      clearTimer.current = setTimeout(() => {
        setVisible(false);
      }, duration);
    }
  }, []);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    const left = (windowWidth - width) / 2;
    let top = (windowHeight - height) / 2;

    if (position === "top") {
      top = theme.toast_position_top_distance;
    } else if (position === "bottom") {
      top = windowHeight - height - theme.toast_position_bottom_distance;
    }

    setLayoutStyle({ left, top });
  };

  return (
    <View style={[styles.wrapper, layoutStyle]} onLayout={onLayout}>
      <Transitions.Fade
        visible={visible}
        entryDuration={300}
        exitDuration={300}
        onTransitionComplete={(status: any) => {
          if (status === "exited") {
            props.onClose?.();
          } else {
            props.onOpened?.();
          }
        }}
      >
        <View
          style={[
            styles.toast,
            type === "info" && !icon ? styles.info : styles.default,
          ]}
        >
          {renderIcon()}
          {renderMessage()}
        </View>
      </Transitions.Fade>
    </View>
  );
};

export default Toast;
