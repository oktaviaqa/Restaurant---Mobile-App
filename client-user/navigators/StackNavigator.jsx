import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomePage from "../pages/HomePage";
import MenuPage from "../pages/MenuPage";
import DetailPage from "../pages/DetailPage";
import { Text } from "react-native";

export default function StackNavigator() {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="menu"
        component={MenuPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={DetailPage} />
    </Stack.Navigator>
  );
}
