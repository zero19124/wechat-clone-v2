import Button from "@/component/base/Button/Button";
import { useTranslation } from "react-i18next";
import { ImageBackground, Text, View, StyleSheet } from "react-native";
import { getSize } from "utils";

const LandingPage = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/splash.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View
          style={{
            position: "absolute",
            bottom: "15%",
            width: getSize(375),
            paddingHorizontal: 24,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button onPress={() => {}} type="primary">
            {t("Login")}
          </Button>
          <Button onPress={() => {}} type="default">
            {t("Sign Up")}
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
export default LandingPage;
