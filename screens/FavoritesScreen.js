
import { Text, View, StyleSheet,Image } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";


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
      {favorites.map(
        (item, index) =>
          item && (
             //ensure that each key in the list is unique
            <View key={`${item.idDrink}-${index}`}>
              <Image
                source={{ uri: item.strDrinkThumb }}
                style={styles.image}
              />
              <Text key={index}> {item.strDrink}</Text>
            </View>
          )
      )}
    </View>
  ); 
};


const styles = StyleSheet.create({
  image: {
    width: hp(30),
    height: hp(30),
    borderRadius: 50,
    marginBottom: 10,
  },
});


export default FavoritesScreen;



