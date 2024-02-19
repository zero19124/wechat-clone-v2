import { Image, View, Text } from "react-native";
import { getSize } from "utils";
interface IMomentsImgPros {
  imgList: string[];
}
const MomentsImg = (props: IMomentsImgPros) => {
  const { imgList } = props;
  // console.log(imgList, "imgList");
  return (
    <View
      style={{
        width: getSize(248),
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 4,
      }}
    >
      {imgList.map((imgUri, index) => {
        return (
          <Image
            style={{ width: getSize(80), height: 80 }}
            key={index}
            source={{ uri: imgUri }}
          />
        );
      })}
    </View>
  );
};
export default MomentsImg;
