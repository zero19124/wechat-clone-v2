import React, { useMemo } from "react";
import View from "../View/index";
import type { ActionBarProps } from "./type";
import ActionBarContext from "./ActionBarContext";
import { useThemeFactory } from "../Theme";
import { createBarStyles } from "./style";
import * as THEME_VARIABLE from "@/theme/styles/variables";

const ActionBar: React.FC<ActionBarProps> = (props) => {
  const { safeAreaInsetBottom = true } = props;
  const styles = createBarStyles(THEME_VARIABLE as any);

  // const { styles } = useThemeFactory(createBarStyles);
  const children = useMemo(
    () => React.Children.toArray(props.children),
    [props.children]
  );

  return (
    <ActionBarContext.Provider value={{ parent: { children } }}>
      <View style={[styles.bar, props.style]} useSafeArea={safeAreaInsetBottom}>
        {React.Children.toArray(props.children)
          .filter(React.isValidElement)
          .map((child: React.ReactElement, index) =>
            React.cloneElement(child, {
              index,
            })
          )}
      </View>
    </ActionBarContext.Provider>
  );
};

export default ActionBar;
