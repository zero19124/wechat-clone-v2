import Button from "@/component/base/Button/Button";
import BottomWidthDivider from "@/component/complex/BottomWidthDivider";
import ItemCard from "@/component/complex/ItemCard";
import { useTheme } from "@/theme/useTheme";
import { useTranslation } from "react-i18next";
import LocationIcon from "@/icons/discover/location.svg";
import AtIcon from "@/icons/discover/at.svg";
import MeIcon from "@/icons/tabs/me.svg";

import {
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "expo-router";
const PostMoments = () => {
  const { t } = useTranslation();
  const navigator = useNavigation();
  const { themeColor } = useTheme();
  const PostMomentsHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          onPress={() => {
            navigator.goBack();
          }}
        >
          <Text style={{ fontSize: 18 }}>{t("Cancel")}</Text>
        </Pressable>
        <TouchableOpacity
          style={{
            backgroundColor: themeColor.primary,
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}
        >
          <Text style={{ fontSize: 18, color: themeColor.white }}>
            {t("Post")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const OptionsSection = () => {
    return (
      <View style={{ marginTop: 32 }}>
        <BottomWidthDivider />
        <ItemCard
          style={{
            backgroundColor: "transparent",
          }}
          onPress={() => {}}
          borderVisible={false}
          leftComp={() => {
            return (
              <LocationIcon style={{ marginLeft: 24 }} width={24} height={24} />
            );
          }}
          text={t("Location")}
        />
        <BottomWidthDivider />
        <ItemCard
          style={{
            backgroundColor: "transparent",
          }}
          onPress={() => {}}
          borderVisible={false}
          leftComp={() => {
            return <AtIcon style={{ marginLeft: 24 }} width={24} height={24} />;
          }}
          text={t("Mention")}
        />
        <BottomWidthDivider />
        <ItemCard
          style={{
            backgroundColor: "transparent",
          }}
          onPress={() => {}}
          borderVisible={false}
          leftComp={() => {
            return <MeIcon style={{ marginLeft: 24 }} width={24} height={24} />;
          }}
          text={t("Visible To")}
        />
        <BottomWidthDivider />
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View style={{ padding: 16 }}>
        <PostMomentsHeader />
        <View style={{ padding: 12 }}>
          <TextInput
            placeholder={t("Say something")}
            selectionColor={themeColor.primary}
          />
          <View style={{ marginVertical: 24 }}>
            <Text>img</Text>
          </View>
        </View>
        <OptionsSection />
      </View>
    </SafeAreaView>
  );
};
export default PostMoments;
