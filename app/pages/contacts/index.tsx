import { useEffect, useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
const Contacts = () => {
  const [value, onChangeText] = useState("");
  const toast = useToast();

  useEffect(() => {
    toast.show("Hello World333");
  }, []);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{ flex: 1 }}>
        <TextInput
          // autoFocus={true}
          value={value}
          onChangeText={onChangeText}
          keyboardType="number-pad"
        />
        <Text>contacts</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Contacts;
