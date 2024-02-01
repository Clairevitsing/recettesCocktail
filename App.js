import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Axios from "axios";
import HomeScreen from './components/Homescreen';
import DetailsScreen from './components/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true);
  const [drinksData, setDrinksData] = useState(false);

  useEffect(() => {
     const fetchDrinksData = async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`);
        const { drinks } = await response.json();
        setDrinksData(drinks);
        console.log(drinks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDrinksData();
  }, []);

  


  return (
    <NavigationContainer>
      {/* initialRouteName="Home" pour définir la route par défault */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
           component={() => <HomeScreen drinksData={drinksData} />}
           
          // c'est une option, on peut essayer, par exemple il y a aussi une option "welcome"
          options={{ title: 'Overview' }}
        />
        {/* <Stack.Screen name="Home">
          {props => <HomeScreen {...props} extraData={drinksData} />}
        </Stack.Screen> */}
        <Stack.Screen name="Details" component={DetailsScreen} />
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
