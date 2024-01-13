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
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <ThemeProvider>
      {/* <NavigationContainer> */}
      {/* <IndexPage /> */}
      {/* <Stack.Navigator> */}
      {/* <Stack.Screen name="/about" component={IndexPage} /> */}
      {/* <Stack.Screen name="/view/about/test" component={Test} /> */}
      {/* </Stack.Navigator> */}
      {/* </NavigationContainer> */}
    </ThemeProvider>
  );
}
