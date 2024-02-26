import React, { forwardRef, memo, useState, useCallback } from "react";
import { Text, View } from "react-native";
import isNil from "lodash-es/isNil";
import toNumber from "lodash-es/toNumber";
import isNumber from "lodash-es/isNumber";
import type { LayoutChangeEvent } from "react-native";
import type { BadgeProps } from "./type";
import { useThemeFactory } from "../Theme";
import { createStyle } from "./style";
import * as THEME_VARIABLE from "@/theme/styles/variables";

const Badge = forwardRef<View, BadgeProps>((props, ref) => {
  const {
    style,
    color,
    dot = false,
    showZero = true,
    content,
    max,
    children,
    offset,
    ...rest
  } = props;
  const [offsetX = 0, offsetY = 0] = offset ?? [];
  // const { styles } = useThemeFactory(createStyle, { color });
  const styles = createStyle(THEME_VARIABLE as any, { color });

  const [badgeOffset, setBadgeOffset] = useState<{
    top: number;
    right: number;
  }>({
    top: 0,
    right: 0,
  });

  const onBadgeLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      // 四舍五入，防止出现小数导致 onBadgeLayout 多次触发
      const newX = Math.round(-width / 2 + offsetX);
      const newY = Math.round(-height / 2 + offsetY);

      if (badgeOffset.top !== newY || badgeOffset.right !== newX) {
        setBadgeOffset({ top: newY, right: newX });
      }
    },
    [badgeOffset, offsetX, offsetY]
  );

  const hasContent = () => {
    if (content) {
      return true;
    }
    return !isNil(content) && content !== "" && (showZero || +content !== 0);
  };

  const renderContent = () => {
    if (!dot && hasContent()) {
      if (
        !isNil(max) &&
        isNumber(toNumber(content)) &&
        toNumber(content) > max
      ) {
        return `${max}+`;
      }

      return content;
    }

    return null;
  };

  const renderBadge = () => {
    if (hasContent() || dot) {
      return (
        <View
          ref={ref}
          style={[
            styles.badgeContainer,
            !!children && styles.fixed,
            children
              ? badgeOffset
              : { marginTop: offsetY, marginLeft: offsetX },
            !children && style,
          ]}
          onLayout={onBadgeLayout}
        >
          {React.isValidElement(content) ? (
            <View style={styles.badge}>{renderContent()}</View>
          ) : (
            <Text style={[styles.badge, dot && styles.dot]}>
              {renderContent()}
            </Text>
          )}
        </View>
      );
    }

    return null;
  };

  if (!children) return renderBadge();

  return (
    <View style={[styles.wrapper, style]} {...rest}>
      {children}
      {renderBadge()}
    </View>
  );
});

Badge.displayName = "Badge";

export default memo(Badge);
