import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import * as light from "../../theme/light";
import { getSize } from "../../utils";
import CloseIcon from "@/icons/common/close.svg";
import CoinIcon from "@/icons/common/coin.svg";
import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigation } from "expo-router";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import PaymentKeyBoard from "./component/PaymentInput";
import AmountText from "app/component/complex/AmountText";
const defaultPayTo = "Pay to Bella (***)";
const InputKeyboard = (props) => {
  console.log("InputKeyboard", new Date().getTime());
  const { onChange, onDelete, amount } = props;
  const [payTo, setPayTo] = useState(defaultPayTo);
  const [psw, setPsw] = useState("");
  const navigator = useNavigation();
  const numberList = Array.from({ length: 9 }, (_, i) => i + 1); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
  numberList.push(0);
  numberList.push(".");
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
    setPsw("");
    setPayTo(defaultPayTo);
    bottomSheetRef.current?.present();
  };
  const snapPoints = useMemo(() => ["65%"], []);
  const { dismiss } = useBottomSheetModal();
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  const getPasswordInput = (num: number) => {
    return (
      <View
        style={{
          backgroundColor: light.themeColor.bg3,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
        }}
      >
        {psw.length > num && (
          <View
            style={{
              backgroundColor: "black",
              width: 8,
              height: 8,
              borderRadius: 4,
            }}
          />
        )}
      </View>
    );
  };
  return (
    <View
      style={{
        paddingVertical: 8,
        flexDirection: "row",
        paddingBottom: 48,
        backgroundColor: light.themeColor.fillColor,
      }}
    >
      <BottomSheetModal
        handleIndicatorStyle={{ display: "none" }}
        backgroundStyle={
          {
            // backgroundColor: light.themeColor.fillColor,
            // borderRadius: 0,
          }
        }
        // containerStyle={{ flex: 1 }}
        overDragResistanceFactor={0}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <View
          style={{
            padding: 12,
            paddingTop: 0,
            paddingBottom: 0,
            backgroundColor: light.themeColor.white,
            // marginBottom: 12,
          }}
        >
          <Pressable
            style={{
              width: 30,
            }}
            onPress={() => {
              dismiss();
            }}
          >
            <CloseIcon width={getSize(28)} height={getSize(28)} />
          </Pressable>
          <View style={{ alignItems: "center" }}>
            <Pressable
              onPress={async () => {
                const content = await Clipboard.getStringAsync();
                console.log(content, "content");
                setPayTo(content || defaultPayTo);
              }}
            >
              <Text style={{ fontSize: 16, marginBottom: 8 }}>{payTo}</Text>
            </Pressable>
            <AmountText amount={amount} />
          </View>
          {/* paymethod  */}
          <View
            style={{
              borderTopColor: light.themeColor.fillColor,
              borderTopWidth: StyleSheet.hairlineWidth,
              justifyContent: "space-between",
              flexDirection: "row",
              paddingVertical: 24,
              marginTop: 12,
            }}
          >
            <Text style={{ color: light.themeColor.text1 }}>
              Payment Method
            </Text>
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CoinIcon />
              <Text style={{ color: light.themeColor.text1, marginRight: 2 }}>
                Balance
              </Text>
              <AntDesign name="down" size={10} color={light.themeColor.text1} />
            </View>
          </View>
        </View>
        {/* password section  */}
        <View
          style={{
            paddingBottom: 24,
            backgroundColor: light.themeColor.white,
            flexDirection: "row",
            justifyContent: "center",
            columnGap: 8,
          }}
        >
          <View>{getPasswordInput(0)}</View>
          <View>{getPasswordInput(1)}</View>
          <View>{getPasswordInput(2)}</View>
          <View>{getPasswordInput(3)}</View>
          <View>{getPasswordInput(4)}</View>
          <View>{getPasswordInput(5)}</View>
        </View>
        {/* keyboard  */}
        <PaymentKeyBoard
          onChange={(num: number) => {
            if (psw.length === 5) {
              dismiss();
              // todo why push cannot find the page?
              navigator.navigate("component/business/PayDone/index", {
                amount,
              });
              return;
            }
            setPsw((val) => val + num);
          }}
          onDelete={() => {
            console.log("onDelete", psw);
            setPsw((preV) => preV.slice(0, -1));
          }}
        />
      </BottomSheetModal>
      <View
        style={{
          width: getSize(290),
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {numberList.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => {
              onChange(item);
            }}
            style={{
              margin: 4,

              borderRadius: 4,
              justifyContent: "center",
              alignItems: "center",
              width: item === 0 ? getSize(183) : getSize(87),
              height: getSize(50),
              backgroundColor: "#fff",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flex: 1, margin: 4, marginLeft: 0 }}>
        <TouchableOpacity
          onPress={() => {
            onDelete();
          }}
          style={{
            height: getSize(50),
            justifyContent: "center",
            backgroundColor: "#fff",
            marginBottom: 8,
            borderRadius: 4,
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="backspace" size={24} color="black" />
        </TouchableOpacity>
        {/* <Toast /> */}
        <TouchableOpacity
          onPress={() => {
            openModal();
          }}
          style={{
            borderRadius: 4,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            backgroundColor: light.themeColor.primary,
          }}
        >
          <Text style={{ color: "#fff" }}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default InputKeyboard;
