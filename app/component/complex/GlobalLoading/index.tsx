import Loading from "@/component/base/Loading";
import Overlay from "@/component/base/Overlay";
import { useLoadingStore } from "app/store/globalLoading";
import { useEffect } from "react";
import { Text, View } from "react-native";
const Index = ({ children }) => {
  const { globalLoading, setLoadingStore } = useLoadingStore();
  useEffect(() => {
    console.log(globalLoading, "globalLoading-provider");
  },[globalLoading]);
  return (
    <View style={{ flex: 1 }}>
      <Overlay visible={globalLoading.loading} onBackdropPress={() => {}}>
        <Loading size={24}>{globalLoading.text || "Loading..."}</Loading>
      </Overlay>
      {children}
    </View>
  );
};
export default Index;
