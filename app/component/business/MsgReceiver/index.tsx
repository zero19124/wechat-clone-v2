import { Text, View, Image, TouchableOpacity } from "react-native";
import ImagePreview from "@/component/base/ImagePreview";
import { getSize } from "utils";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/theme/useTheme";
import { useUser } from "app/store/user";
import TransferCard from "./component/TransferCard";
import { getMsgTypeMap } from "./component/common";
import { Audio } from "expo-av";
import { useMemo, useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CopyOutline from "@/icons/chats/copy-outline.svg";
import PreviousOutline from "@/icons/chats/previous-outline.svg";
import * as Clipboard from "expo-clipboard";

import {
  Popover,
  PopoverAction,
  PopoverInstance,
} from "@/component/base/Popover";
import Toast from "@/component/base/Toast";
import useSendMsg from "@/hooks/useSendMsg";
import { useChatList } from "app/store/chatList";
const MsgWrapper = ({
  msgType = "text",
  type = "left",
  text,
  msgId,
  msgSenderId,
}: {
  type?: "left" | "right";
  text: string;
  msgId: string;
  msgSenderId: string;
  msgType: string;
}) => {
  const { sendMsgHandler } = useSendMsg();
  const { chatListStore } = useChatList();
  const { themeColor } = useTheme();
  const userInfo = useUser().userStore.userInfo;
  const msgTypeMap = getMsgTypeMap(themeColor);
  const navigator = useNavigation();
  const [durationMillis, setDurationMillis] = useState(0);
  const { t } = useTranslation();
  const popover = useRef<PopoverInstance>(null);
  const iconActions: PopoverAction[] = useMemo(() => {
    const iconActionsList = [
      {
        text: t("Recall"),
        icon: (
          <PreviousOutline width={20} height={20} fill={themeColor.white} />
        ),
      },
      {
        text: t("Copy"),
        icon: <CopyOutline width={20} height={20} fill={themeColor.white} />,
      },
    ];
    if (msgSenderId + "" !== userInfo?._id + "") {
      iconActionsList.shift();
    }
    return iconActionsList;
  }, [msgSenderId]);
  const select = async (option: PopoverAction) => {
    Toast.info(option.text);
    if (option.text === "Recall") {
      sendMsgHandler({
        val: "recallMsg+" + "recalled+" + msgId,
        userId: userInfo?._id + "",
        type: "recallMsg",
        convoId: chatListStore.curConvo?.convoId + "",
        doneHandler: () => {},
      });
    }
    await Clipboard.setStringAsync(text);
    Toast.success("copied");
    popover.current?.hide();
  };
  const TextWrapper = ({ children }) => {
    return (
      <View
        key={msgId}
        style={[
          msgTypeMap[type === "left" ? "itemLeftWrapper" : "itemRightWrapper"],
          {
            alignSelf: "flex-start",
            maxWidth: getSize(250),
            // padding算距离
            borderRadius: 4,
            position: "relative",
          },
        ]}
      >
        {children}
      </View>
    );
  };
  // transId+amount+userid
  const getContent = () => {
    console.log(msgType, "msgType");
    if (msgType === "recallMsg") {
      return (
        <Text style={{ padding: 12, justifyContent: "center" }}>
          {t("recalled a message")}
        </Text>
      );
    }
    if (msgType === "voice") {
      const sound = new Audio.Sound();
      const getSta = async () => {
        await sound.unloadAsync();
        // 加载音频文件，这里假设你有一个有效的音频文件URI
        await sound.loadAsync({ uri: text + "" });
        // 获取音频状态
        sound.getStatusAsync().then((status) => {
          // console.log(status, "status11");
          if (status.isLoaded) {
            const tempDurationMillis = status.durationMillis; // 音频总时长，以毫秒为单位
            setDurationMillis(Number(tempDurationMillis) / 1000);
            console.log(`音频时长：${durationMillis} 毫秒`);
          } else {
            console.log("音频文件未成功加载");
          }
        });
      };
      getSta();

      return (
        <TouchableOpacity
          style={{
            width:
              Number(durationMillis).toFixed() < 6
                ? getSize(100) + Number(durationMillis).toFixed() * 10
                : getSize(230),
            flexDirection: "row",
            padding: 12,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          onLongPress={() => {
            popover.current?.show();
          }}
          onPress={async () => {
            try {
              console.log(text, "tempUri");
              // 卸载之前的音频，以防重复播放

              // 播放音频
              await sound.playAsync();
            } catch (error) {
              // 错误处理
              console.error("播放音频时发生错误", error);
            }
          }}
        >
          <Text>voice {Number(durationMillis).toFixed()}"</Text>
          <MaterialCommunityIcons
            style={{ transform: [{ rotate: "85deg" }], marginLeft: 8 }}
            name="wifi"
            size={16}
            color="black"
          />
        </TouchableOpacity>
      );
    }
    if (msgType === "transfer") {
      let accepted = false;
      if (
        // receiver accepted the transfer
        text.includes("[accepted]") ||
        // the originMsg need Update to accepted
        text.includes("isTransferAccepted")
      ) {
        accepted = true;
      }

      const transId = text.split("+")[0];
      const amount = text.split("+")[1];
      console.log(text, "texttexttexttext", amount);

      return (
        <TransferCard
          onLongPress={() => {
            popover.current?.show();
          }}
          originMsgId={msgId}
          accepted={accepted}
          amount={amount}
          transId={transId}
          msgSenderId={msgSenderId}
          type={type}
        />
      );
    }
    if (msgType === "img") {
      console.log(text, "text-img");

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
              uri:
                // "https://placekitten.com/302/302"
                // ||
                text,
            }}
            style={{ width: 180, height: 100 }}
          />
        </TouchableOpacity>
      );
    }
    return (
      <>
        <View
          style={msgTypeMap[type === "left" ? "itemLeft" : "itemRight"]}
        ></View>
        <TouchableOpacity
          onLongPress={() => {
            popover.current?.show();
          }}
        >
          <Text
            style={{
              alignSelf: "flex-start",
              marginVertical: 8,
              marginHorizontal: 12,
            }}
          >
            {text}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <Popover ref={popover} theme="dark">
        <View style={{ flexDirection: "row" }}>
          {iconActions.map((action) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  select(action);
                }}
                key={action.text}
                style={{
                  padding: 12,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {action.icon}
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 8,
                    color: themeColor.white,
                  }}
                >
                  {action.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Popover>
      <TextWrapper>{getContent()}</TextWrapper>
    </>
  );
};
export default MsgWrapper;
