import { useTheme } from "@/theme/useTheme";
import { Pressable, Text, View } from "react-native";
import SearchIcon from "@/icons/common/search.svg";
import { useTranslation } from "react-i18next";

const SearchBar = ({ placeholder = "Search", onPress = () => {} }) => {
  const { themeColor } = useTheme();
  const { t } = useTranslation();
  placeholder = t(placeholder);
  return (
    <View
      style={{
        backgroundColor: themeColor.fillColor,
      }}
    >
      <Pressable
        onPress={onPress}
        className="flex-row justify-center items-center rounded-md"
        style={{
          height: 36,
          backgroundColor: themeColor.white,
          margin: 8,
        }}
      >
        <SearchIcon fill={themeColor.text3} />
        <Text style={{ color: themeColor.text3 }}>{placeholder}</Text>
      </Pressable>
    </View>
  );
};
export default SearchBar;
