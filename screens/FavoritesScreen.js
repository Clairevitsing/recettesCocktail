
import { Text, View, StyleSheet } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


function FavoritesScreen () {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const favoritesList = await AsyncStorage.getItem("favorites");
        if (favoritesList) {
          setFavorites(JSON.parse(favoritesList));
        }
      } catch (error) {
        console.log("Error retrieving favorites:", error);
      }
    };

    getFavorites();
  }, []);

  return (
    <View>
      <Text>Favorites:</Text>
      {favorites.map((item, index) => (
        item &&< Text key = { index } > { item.strDrink }</Text>
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
    
});


export default FavoritesScreen;



