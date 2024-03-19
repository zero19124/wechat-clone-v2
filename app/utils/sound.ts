import { Audio } from "expo-av";

const playSound = async (uri = "") => {
  // if (!init) return;
  console.log("playSound");
  Audio.setAudioModeAsync({ allowsRecordingIOS: false });
  const sound = new Audio.Sound();
  sound.loadAsync( require("@/assets/ding-short.mp3"), {
    shouldPlay: true,
  });
};
export { playSound };
