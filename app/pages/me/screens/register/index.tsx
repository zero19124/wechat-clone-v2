import React, { useLayoutEffect, useRef, useTransition } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import UserAvatar from "@/component/complex/UserAvatar";
import Form, { FormInstance } from "@/component/base/Form";
import Cell from "@/component/base/Cell";
import Button from "@/component/base/Button/Button";
import Input from "@/component/base/Input";
import Radio from "@/component/base/Radio";
import { useTranslation } from "react-i18next";
import axios from "axios";
import config from "@/config/index";
import { useNavigation, useRouter } from "expo-router";
import Toast from "@/component/base/Toast";
import { uploadImages } from "@/hooks/useImagePicker";
import {
  TNavigationOptions,
  useCommonNavigateProps,
} from "@/component/complex/CommonNavigateTitle";
import { useTheme } from "@/theme/useTheme";

interface FormValue {
  username: string;
  password: string;
  gender: string;
  avatar: string | null;
  bio: string;
}
const defaultValues = {
  username: "",
  password: "",
  gender: "male",
  bio: "",
  avatar: "",
  email: "",
};

const RegisterScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    register,
  } = useForm({
    defaultValues,
  });
  // https://react-hook-form.com/get-started#ReactNative
  const router = useRouter();
  const watchAvatar = watch("avatar");
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  if (!permissionResponse?.granted) {
    requestPermission();
  }

  const pickImage = async () => {
    if (!permissionResponse?.granted) {
      alert("permission is not granted");
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setValue("avatar", result.assets[0].uri);
    }
  };

  const onSubmit = async (data: typeof defaultValues) => {
    console.log("Form Data:", data);
    if (!data.avatar) {
      Toast.fail(t("choose avatar!"));
      return;
    }
    const uploadedphotos = await uploadImages([
      {
        uri: data.avatar,
        name: `user_avatar_${data.username}` + ".jpg",
        type: "image",
      },
    ]);
    // upload img
    const image = uploadedphotos[0];
    await axios
      .post(config.apiDomain + "/api/user/register", {
        act: data.username,
        psw: data.password,
        gender: data.gender,
        image,
        bio: data.bio,
        email: data.email,
        type: "register",
      })
      .then((res) => {
        console.log(res.data?.data, "res.data?.data");
        if (res.data?.data?.existUser) {
          alert("user existed");
          return;
        }
        Toast.success(t("register successfully"));
        setTimeout(() => {
          router.back();
        }, 500);
      });
  };
  const { themeColor } = useTheme();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const formRef = useRef<FormInstance<FormValue>>(null);
  console.log(errors, "errors");
  useLayoutEffect(() => {
    const navigatorProps = useCommonNavigateProps({
      rightComp: () => <></>,
      title: t("Register") as string,
    });
    navigation.setOptions({
      ...navigatorProps,
      headerStyle: { backgroundColor: themeColor.white },
      headerShadowVisible: false,
    } as TNavigationOptions);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: themeColor.white,
      }}
    >
      <TouchableOpacity onPress={pickImage}>
        <UserAvatar
          rounded
          source={
            watchAvatar
              ? { uri: watchAvatar }
              : require("@/assets/img-default.png")
          }
          style={{ width: 75, height: 75 }}
        />
      </TouchableOpacity>
      <Button
        size="small"
        type="default"
        onPress={pickImage}
        style={{ marginVertical: 12 }}
      >
        {t("Choose Avatar")}
      </Button>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{
              width: "80%",
              borderWidth: 1,
              borderRadius: 8,
              padding: 10,
            }}
          />
        )}
        name="username"
        rules={{
          required: "username is required",
        }}
        defaultValue=""
      />
      {errors && errors.username && (
        <Text style={{ color: "red" }}>{errors.username.message}</Text>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{
              width: "80%",
              marginVertical: 12,
              borderWidth: 1,
              borderRadius: 8,
              padding: 10,
            }}
          />
        )}
        name="email"
        rules={{
          required: "email is required",
        }}
        defaultValue=""
      />
      {errors && errors.email && (
        <Text style={{ color: "red" }}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{
              width: "80%",
              borderWidth: 1,
              borderRadius: 8,
              padding: 10,
            }}
          />
        )}
        name="password"
        rules={{ required: "password is required" }}
        defaultValue=""
      />
      {errors && errors.password && (
        <Text style={{ color: "red" }}>{errors.password.message}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Radio.Group
            style={{ flexDirection: "row", marginVertical: 16, gap: 12 }}
            defaultValue={value}
            onChange={(val) => {
              console.log(val, 2222);
              onChange(val);
            }}
          >
            <Radio value={"male"}>{t("male")}</Radio>
            <Radio value={"female"}>{t("female")}</Radio>
          </Radio.Group>
        )}
        rules={{ required: "gender is required" }}
        name="gender"
      />
      {errors && errors.gender && (
        <Text style={{ color: "red" }}>{errors.gender.message}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="bio"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{
              width: "80%",
              marginBottom: 10,
              borderWidth: 1,
              borderRadius: 8,
              padding: 10,
            }}
          />
        )}
        name="bio"
        defaultValue=""
      />

      <Button
        type="primary"
        style={{ width: "90%" }}
        onPress={handleSubmit((val) => {
          console.log("handleSubmit");
          onSubmit(val);
        })}
      >
        Register
      </Button>
    </View>
  );
};

export default RegisterScreen;