import ImagePreview from "@/component/base/ImagePreview";
import { Text, View, Image, TouchableOpacity } from "react-native";

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
  return (
    <TouchableOpacity
      onLongPress={() => {
        popover.current?.show();
      }}
      onPress={openPreview}
    >
      <Image
      
        source={{
          cache:'only-if-cached',
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
