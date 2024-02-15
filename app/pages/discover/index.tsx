import Divider from "@/component/complex/Divider";
import ItemCard from "@/component/complex/ItemCard";
import ArrowRightIcon from "@/icons/common/arrow-right.svg";
import { themeColor } from "@/theme/light";
import { useNavigation, useRouter } from "expo-router";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, Image, View, Pressable } from "react-native";
const Discover = () => {
  const navigator = useNavigation();
  const { t } = useTranslation();

  const cardList = [
    {
      text: t("moments"),
      url: require("@/icons/discover/moments.png"),
      onPressHandler: () => {
        // router.push('pages/discover/moments/index')
        navigator.navigate("pages/discover/moments/index");
      },
    },
    {
      text: "Channels",
      url: require("@/icons/discover/channels.png"),
    },
    {
      text: "Live",
      url: require("@/icons/discover/live.png"),
    },
    {
      text: "Scan",
      url: require("@/icons/discover/scan-v2.png"),
    },
    {
      text: "Shake",
      url: require("@/icons/discover/shake.png"),
    },
    {
      text: "Top Stories",
      url: require("@/icons/discover/top-stories.png"),
    },
    {
      text: "Search",
      url: require("@/icons/discover/search.png"),
    },
    {
      text: "Nearby",
      url: require("@/icons/discover/nearby.png"),
    },
    {
      text: "Games",
      url: require("@/icons/discover/games.png"),
    },
    {
      text: "Mini Programs",
      url: require("@/icons/discover/mini-programs.png"),
    },
  ];
  return (
    <SafeAreaView>
      {cardList.map((card) => {
        const getDivider = () => {
          const gapFields = [
            "Channels",
            "Scan",
            "Top Stories",
            "Nearby",
            "Games",
            "Mini Programs",
          ];
          if (gapFields.includes(card.text)) {
            return <Divider key={card.text} />;
          }
          return null;
        };
        const visibleBoderFields = ["Channels", "Scan", "Top Stories"];
        return (
          <View key={card.text}>
            {getDivider()}
            <ItemCard
              onPress={() => {
                card.onPressHandler?.();
              }}
              borderVisible={visibleBoderFields.includes(card.text)}
              leftComp={() => {
                return (
                  <View>
                    <Image
                      style={{
                        marginLeft: 18,
                        marginRight: 4, // marginVertical: 8,
                        width: 24,
                        height: 24,
                      }}
                      borderRadius={4}
                      source={card.url}
                    />
                  </View>
                );
              }}
              text={card.text}
            />
          </View>
        );
      })}
    </SafeAreaView>
  );
};
export default Discover;
