import { useCallback } from "react";
import { Animated, Easing, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
export default () => {
  const fadeAnim = new Animated.Value(1);
  const verticalPosition = new Animated.Value(-200);
  const startAnimation = useCallback(() => {
    console.log("startAnimation");
    Animated.loop(
      Animated.parallel([
        Animated.timing(verticalPosition, {
          toValue: 200,
          duration: 2500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),

        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start(() => {
      // 重置动画
      verticalPosition.setValue(-200);
      fadeAnim.setValue(0.5);
      startAnimation();
    });
  }, [verticalPosition, fadeAnim]);
  startAnimation();

  return (
    <Animated.View
      style={[
        { width: "100%", position: "absolute", top: "30%", zIndex: 1 },
        { transform: [{ translateY: verticalPosition }], opacity: fadeAnim },
      ]}
    >
      <LinearGradient
        colors={[
          "transparent",
          "rgba(89, 237, 90,0.05)",
          "rgba(89, 237, 90,0.1)",
          "rgba(89, 237, 90,0.9)",
        ]}
        // colors={["transparent", themeColor.primary, "transparent"]}
        style={{ width: "100%", height: 250 }}
      />
    </Animated.View>
  );
};
