import { StatusBar } from "expo-status-bar";
import { StyleSheet, LogBox,Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Axios from "axios";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import AlcoholicDrinksScreen from "./screens/AlcoholicDrinksScreen";
import CategoryScreen from "./screens/CategoryScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import SearchCocktailsScreen from "./screens/SearchCocktailsScreen";
import TabNavigator from "./navigation/TabNavigator";

const Stack = createNativeStackNavigator();


LogBox.ignoreLogs(
  [
    'Non-serializable values were found in the navigation state'
  ]
)
export default function App() {
  return (
    <NavigationContainer>
      {/* initialRouteName="Home" pour définir la route par défault */}
      <Stack.Navigator initialRouteName="Welcome">
        {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
        <Stack.Screen name=" " component={TabNavigator} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen
          name="AlcoholicDrinksScreen"
          component={AlcoholicDrinksScreen}
        />
        <Stack.Screen name="Category" component={CategoryScreen} />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
