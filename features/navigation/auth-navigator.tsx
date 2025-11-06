import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/sign-in";

const Stack = createNativeStackNavigator();
export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: "Acesso" }}
      />
    </Stack.Navigator>
  );
}
