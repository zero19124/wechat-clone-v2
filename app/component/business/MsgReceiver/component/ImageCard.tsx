import ImagePreview from "@/component/base/ImagePreview";
import { TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
const ImageCard = ({ text, popover }) => {
  const openPreview = () => {
    console.log(text, "text-im1g");

    ImagePreview.open({
      showIndex: false,
      showIndicators: false,
      images: [text],
      onChange: (index) => console.log(`当前展示第${index + 1}张`),
    });
  };
  console.log("imige-------");
  return (
    <TouchableOpacity
      onLongPress={() => {
        popover.current?.show();
      }}
      onPress={openPreview}
    >
      <FastImage
      
        defaultSource={require("@/assets/loading-image.png")}
        source={{
          uri:
            // "https://placekitten.com/302/302"
            // ||
            text,
        }}
        style={{ width: 180, height: 100 }}
      />
    </TouchableOpacity>
  );
};
export default ImageCard;
