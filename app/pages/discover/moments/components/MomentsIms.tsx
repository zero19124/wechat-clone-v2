import ImagePreview from "@/component/base/ImagePreview";
import { Image, View, Text, Pressable } from "react-native";
import { getSize } from "utils";
interface IMomentsImgPros {
  imgList: string[];
}
const MomentsImg = (props: IMomentsImgPros) => {
  const { imgList } = props;
  console.log(imgList, "imgList");
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
          <Pressable
            key={index}
            onPress={() => {
              console.log(1, ImagePreview);

              ImagePreview.open({
                showIndex: false,

                showIndicators: true,
                images: imgList,
                onChange: (index) => console.log(`当前展示第${index + 1}张`),
              });
            }}
          >
            <Image
              style={{ width: getSize(80), height: 80 }}
              key={index}
              source={{ uri: imgUri }}
            />
          </Pressable>
        );
      })}
    </View>
  );
};
export default MomentsImg;
