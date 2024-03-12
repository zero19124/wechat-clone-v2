import DeviceInfo from "react-native-device-info";

export default (model: string, fn: () => void) => {
  const deviceModel = DeviceInfo.getModel();

  if (deviceModel === model) {
    console.log("model=", model);
    fn();
  }
};
