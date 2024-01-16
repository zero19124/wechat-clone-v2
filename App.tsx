import { ThemeProvider } from "./theme/useTheme";
import IndexPage from "./view/index";
import Test from "./view/about/test";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import {
  Stack,
  NavigationContainer,
  createNativeStackNavigator,
} from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
const Stack = createNativeStackNavigator();
export default function App() {
  console.log("app1");
  return (
    <RootSiblingParent>
      <ThemeProvider>
        {/* <NavigationContainer> */}
        {/* <IndexPage /> */}
        {/* <Stack.Navigator> */}
        {/* <Stack.Screen name="/about" component={IndexPage} /> */}
        {/* <Stack.Screen name="/view/about/test" component={Test} /> */}
        {/* </Stack.Navigator> */}
        {/* </NavigationContainer> */}
      </ThemeProvider>
    </RootSiblingParent>
  );
}
