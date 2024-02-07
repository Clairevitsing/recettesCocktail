import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Axios from "axios";
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/Homescreen';
import DetailsScreen from './screens/DetailsScreen';
import AlcoholicDrinksScreen from "./screens/AlcoholicDrinksScreen";
import NonAlcoholicDrinksScreen from "./screens/NonAlcoholicDrinksScreen";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      {/* initialRouteName="Home" pour définir la route par défault */}
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* // c'est une option, on peut essayer, par exemple il y a aussi une option "welcome"
          options={{ title: 'Overview' }}
        /> */}
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen
          name="AlcoholicDrinks"
          component={AlcoholicDrinksScreen}
        />
        <Stack.Screen
          name=" NonAlcoholicDrinksScreen"
          component={NonAlcoholicDrinksScreen}
        />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
