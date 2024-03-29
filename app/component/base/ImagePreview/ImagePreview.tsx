import React, { useState, useEffect } from "react";
import isFunction from "lodash-es/isFunction";
import { Clear } from "@pingtou/rn-vant-icons";
import { View, Text, Modal, Pressable, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Image from "../Image";
import Swiper from "../Swiper";
import { useThemeFactory } from "../Theme";
import constants from "@/utils/constants";
import { cloneReactNode } from "@/utils/cloneReactNode";
import { createStyle, imagePreviewDefaultVars } from "./style";
import type { ImagePreviewProps } from "./type";
import { defaultTheme } from "@/theme/styles";
import * as THEME_VARIABLE from "@/theme/styles/variables";
import { BarCodeScanner } from "expo-barcode-scanner";
import Dialog from "../Dialog";
import { useTranslation } from "react-i18next";
import Toast from "../Toast";
import { useNavigation } from "expo-router";
import { jumpSomeWhereAfterGotQrcodeData } from "@/utils/saveToImg";

const defaultProps = {
  overlay: true,
  showIndex: true,
  images: [],
  swipeDuration: 300,
  startPosition: 0,
  closeIconPosition: "top-right" as const,
  showIndicators: false,
  closeOnlyClickCloseIcon: false,
  maxZoom: 3,
  // closeIcon: <Clear />,
  closeIcon: <Text>clear</Text>,
};

const ImagePreview = (_props: ImagePreviewProps): JSX.Element => {
  const props = { ...defaultProps, ..._props };
  const navigator = useNavigation();
  const { beforeClose, closeIcon } = props;
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(() => props.visible);
  const [active, setActive] = useState(() => props.startPosition);
  // const { styles, theme } = useThemeFactory(createStyle);
  const theme = imagePreviewDefaultVars(defaultTheme);
  const styles = createStyle(theme);
  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const handleClose = async (closeByIcon = false) => {
    if (!closeByIcon && props.closeOnlyClickCloseIcon) return;

    const couldClose = isFunction(beforeClose)
      ? await Promise.resolve(beforeClose(active))
      : true;

    if (couldClose) {
      setVisible(false);
      props.onClose?.();
    }
  };
  console.log(props.images, "props.images");
  const renderImages = () => {
    const getSwiperItem = () => {
      const getQrCodeData = async (img: string) => {
        const barCodeResult = await BarCodeScanner.scanFromURLAsync(img);
        console.log(
          barCodeResult[0].data,
          "BarCodeScanner-datadatadatadata--------"
        );
        const qrcodeTextData = `///${barCodeResult[0].data}/// `;
        if (qrcodeTextData) {
          console.log(qrcodeTextData, "barCodeResult--------");
          // Toast.info("222");
          handleClose();
          let dialogTitle = t("Detected QrCode");
          // todo  if dont close it Dialog wont show ???
          setTimeout(() => {
            const dataType = jumpSomeWhereAfterGotQrcodeData(
              qrcodeTextData + ` (((getType)))`
            );
            console.log(dataType, "dataType------");
            if (dataType === "friend") {
              dialogTitle = t("Detected FriendQdCode");
            } else if (dataType === "transfer") {
              dialogTitle = t("Detected TransferQdCode");
            }

            Dialog.confirm({
              title: dialogTitle,
              message: t("Do u wanna go to Check?"),
              cancelButtonText: t("No thanks"),
              confirmButtonText: t("Yes do it"),
            })
              .then(() => {
                // on confirm
                setTimeout(() => {
                  jumpSomeWhereAfterGotQrcodeData(qrcodeTextData, navigator, t);
                }, 700);
              })
              .catch(() => {
                // on cancel
              });
          });
        }
      };
      if (props.images.length === 1) {
        const image = props.images[0];
        return (
          <Swiper.Item
            key={image}
            style={{ height: constants.screenHeight }}
            onPress={() => handleClose()}
            onLongPress={async () => {
              getQrCodeData(image);
            }}
          >
            <Image
              source={{ uri: image }}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          </Swiper.Item>
        );
      }
      return props.images.map((image, index) => (
        <Swiper.Item
          key={image + index}
          style={{ height: constants.screenHeight }}
          onPress={() => handleClose()}
          onLongPress={async () => {
            getQrCodeData(image);
          }}
        >
          <Image
            source={{ uri: image }}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </Swiper.Item>
      ));
    };
    return (
      <Swiper
        initialSwipe={active}
        indicator={props.showIndicators}
        loop
        onChange={setActive}
      >
        {getSwiperItem()}
      </Swiper>
    );
  };

  const renderIndex = () => {
    if (props.showIndex) {
      return (
        <View
          style={[
            styles.index,
            { top: insets.top + THEME_VARIABLE.padding_md },
          ]}
        >
          <Text style={styles.indexText}>
            {props.indexRender
              ? props.indexRender({ index: active, len: props.images.length })
              : `${active + 1} / ${props.images.length}`}
          </Text>
        </View>
      );
    }
    return null;
  };

  const renderCloseIcon = () => {
    if (!props.closeable) return null;

    return (
      <TouchableOpacity
        style={[
          styles.icon,
          { top: insets.top + theme.image_preview_close_icon_margin },
        ]}
        activeOpacity={THEME_VARIABLE.active_opacity}
        onPress={() => handleClose(true)}
      >
        {cloneReactNode(closeIcon, {
          size: theme.image_preview_close_icon_size,
          color: theme.image_preview_close_icon_color,
        })}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={() => handleClose()}
      onDismiss={props.onClosed}
      testID={props.testID}
    >
      <Pressable style={styles.wrapper} onPress={() => handleClose()}>
        {renderImages()}
        {renderIndex()}
        {renderCloseIcon()}
      </Pressable>
    </Modal>
  );
};

export default ImagePreview;
