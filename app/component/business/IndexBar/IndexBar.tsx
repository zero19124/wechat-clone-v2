import React, {
  forwardRef,
  useState,
  useMemo,
  useRef,
  useImperativeHandle,
  useEffect,
} from "react";
import type { ReactNode, ReactElement } from "react";
import {
  View,
  Text,
  ScrollView,
  UIManager,
  findNodeHandle,
  PanResponder,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useHeaderHeight } from "@react-navigation/elements";
import type { ScrollViewProps } from "react-native";
import isNumber from "lodash-es/isNumber";
import { useThemeFactory } from "@/theme/index";
import { Portal } from "../Portal";
import { useRefs } from "@/hooks/index";
import constants, { COMPONENT_TYPE_KEY } from "@/utils/constants";
import type {
  IndexBarProps,
  IndexBarInstance,
  IndexAnchorInstance,
  LayoutRectangle,
} from "./types";
import { Vars } from "@/theme/styles/index";

import IndexBarContext from "./IndexBarContext";
import { INDEX_ANCHORE_KEY } from "./IndexAnchor";
import { createStyle } from "./style";
import { useNavigation } from "expo-router";
import { getSize } from "utils";
import { themeColor } from "@/theme/light";
import { useTheme } from "@/component/base/Theme";

const genAlphabet = () => {
  const indexList = [];
  const charCodeOfA = "A".charCodeAt(0);

  for (let i = 0; i < 26; i += 1) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }

  return indexList;
};

const IndexBar = forwardRef<IndexBarInstance, IndexBarProps>((props, ref) => {
  const {
    children,
    sticky = true,
    zIndex,
    highlightColor,
    indexList = genAlphabet(),
    onChange,
    onSelect,
    ...rest
  } = props;
  console.log(indexList, "indexList");
  const headerHeight = useHeaderHeight();
  const theme = useTheme();
  const fadeAmimation = useRef(new Animated.Value(0)).current;
  const transYAmimation = useRef(new Animated.ValueXY()).current;
  const [showIndicator, setShowInicator] = useState(false);
  const { styles } = useThemeFactory((theme) => {
    return createStyle(theme, headerHeight);
  });
  const [activeAnchor, setActiveAnchor] = useState<string | number>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [refs, setRefs] = useRefs<IndexAnchorInstance>();

  // 获取 ScrollView 相对屏幕的位置
  const getScrollViewOffset = () => {
    return new Promise<{ left: number; top: number }>((resolve) => {
      UIManager.measure(
        findNodeHandle(scrollViewRef.current)!,
        (_x, _y, _width, _height, pageX, pageY) => {
          resolve({ left: pageX, top: pageY });
        }
      );
    });
  };

  const getActiveAnchor = (scrollViewTop: number, rects: LayoutRectangle[]) => {
    const relativeTops = rects.map((it) => it.pageY - scrollViewTop);
    return relativeTops.filter((it) => it < 0).length - 1;
  };

  const getAnchorRects = () =>
    Promise.all(Object.values(refs).map((anchor) => anchor.getRect()));

  const onScroll: ScrollViewProps["onScroll"] = async () => {
    const rects = await getAnchorRects();
    const { top: scrollViewTop, left: scrollViewLeft } =
      await getScrollViewOffset();

    const active = getActiveAnchor(scrollViewTop, rects);
    setActiveAnchor(indexList[active]);

    if (sticky) {
      Object.values(refs).forEach((item, index) => {
        const currentRect = rects[index];
        const currentState = item.state;
        const isActive = active === index;
        if (isActive === currentState.active) return;

        item.updateState({
          top: scrollViewTop,
          left: scrollViewLeft,
          width: currentRect.width,
          height: currentRect.height,
          active: isActive,
        });
      });
    }
  };
  // 这里用英文字母找到对应索引 然后用ref跳到对应的索引
  const scrollTo = async (index: number | string) => {
    const activeIndex = indexList.findIndex((it) => it === index);

    if (isNumber(activeIndex)) {
      onSelect?.(index);
      // 列表标题的高度
      const rects = await getAnchorRects();
      const activeRect = rects[activeIndex];
      scrollViewRef.current?.scrollTo({ y: activeRect.y + 1, animated: false });
    }
  };

  useImperativeHandle(ref, () => ({
    scrollTo,
  }));

  useEffect(() => {
    activeAnchor && onChange?.(activeAnchor);
    console.log("highlight changed");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, [activeAnchor]);

  const handleMapChildren = ($children: ReactNode): any => {
    return React.Children.toArray($children)
      .filter(React.isValidElement)
      .map((child: ReactElement) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (child.type?.[COMPONENT_TYPE_KEY] === INDEX_ANCHORE_KEY) {
          return React.cloneElement(child, {
            ref: setRefs(child.props.index),
          });
        }
        if (child.props?.children) {
          const deepMap = handleMapChildren(child.props.children);
          return deepMap.length ? deepMap : child;
        }
        return child;
      });
  };

  const memoChildren = useMemo(() => handleMapChildren(children), [children]);

  const renderSidebar = () => {
    const sidebarHeight = styles.index.lineHeight! * indexList.length;
    const offsetTop = (constants.screenHeight - sidebarHeight) / 2;
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (e, s) => {
          console.log(111, e, s);
          Animated.timing(fadeAmimation, {
            useNativeDriver: true,
            toValue: 1,
            duration: 200,
          }).start();
        },
        onPanResponderRelease: (e, s) => {
          console.log(333, s.dy);
          Animated.timing(fadeAmimation, {
            useNativeDriver: true,
            toValue: 0,
            duration: 200,
          }).start();
        },
        onPanResponderMove: (e, s) => {
          const navigatorHeight = 8.5 * 26;
          const curTop = Dimensions.get("screen").height / 2 - navigatorHeight;
          // s.moveY 包含了header的高度 但是curtop没有
          const moveY = s.moveY - headerHeight;
          const index = Math.round((moveY - curTop) / 8.5);
          const jumpTo = indexList[Math.round(index / 1.5)];
          //  如果高于或者低于则不执行 不然会超出导航自身高度
          const textPosition = moveY - curTop;
          if (curTop < moveY && textPosition + navigatorHeight < moveY) {
            Animated.timing(transYAmimation, {
              useNativeDriver: true,
              toValue: textPosition,
              duration: 50,
            }).start();
          }
          console.log(
            curTop,
            "curTop",
            moveY,
            "moveY",
            index,
            "alphbet",
            jumpTo
          );
          console.log(
            "s.dy  第一次直到松手的距离",

            s.dy,
            "s.y0 第一次按的位置",

            s.y0,
            "s.moveY 松手",
            s.moveY
          );

          if (jumpTo) {
            scrollTo(jumpTo);
          }
        },
      })
    ).current;
    return (
      <View
        //  {...panResponderA.panHandlers}
        style={[styles.sidebar, { backgroundColor: "blue" }]}
      >
        <Animated.Text
          style={{
            position: "absolute",
            zIndex: 2,
            top: 0,
            right: 50,
            opacity: fadeAmimation,
            transform: [{ translateY: transYAmimation.y }],
          }}
        >
          {activeAnchor}
        </Animated.Text>
        {indexList?.map((index) => {
          const active = index === activeAnchor;
          const highlightStyle = highlightColor
            ? { color: highlightColor, backgroundColor: themeColor.primary }
            : null;

          return (
            <View
              {...panResponder.panHandlers}
              style={{ backgroundColor: "red" }}
            >
              <Text
                key={index}
                suppressHighlighting
                onPress={() => {
                  console.log(222);
                  scrollTo(index);
                }}
                style={[
                  styles.index,
                  // { top: offsetTop },
                  active && styles.indexActive,
                  active && highlightStyle,
                ]}
              >
                {index}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <IndexBarContext.Provider value={{ zIndex, highlightColor, sticky }}>
      <ScrollView
        {...rest}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        style={[styles.wrapper, rest.style]}
        scrollEventThrottle={16}
        onScroll={onScroll}
      >
        {<Portal hostName="ContactsPortalHost">{renderSidebar()}</Portal>}

        {memoChildren}
      </ScrollView>
    </IndexBarContext.Provider>
  );
});

export default IndexBar;
