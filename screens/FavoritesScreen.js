import { Text, View, StyleSheet, Image, FlatList, Button } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { removeFromFavorites } from "../components/Favorites";

function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

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

    const intervalId = setInterval(() => {
      getFavorites();
    }, 1000);
    
    return () => clearInterval(intervalId);
    // clearAsyncStorage();
  }, []);

  // const clearAsyncStorage = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log("AsyncStorage cleared successfully");
  //   } catch (error) {
  //     console.log("Error clearing AsyncStorage:", error);
  //   }
  // };

  const handleRemoveFromFavorites = async (item) => {
    try {
      if (item) {
        await removeFromFavorites(item.idDrink);
        // Mise à jour de la liste des favoris après la suppression
        const updatedFavoritesList = await AsyncStorage.getItem("favorites");
        if (updatedFavoritesList) {
          setFavorites(JSON.parse(updatedFavoritesList));
        }
        setIsFavorited(false);
      } else {
        console.log("Error removing from favorites: Invalid item ID");
      }
    } catch (error) {
      console.log("Error removing from favorites:", error);
    }
  };

  const renderFavoriteItem = ({ item, index }) => {
    // Vérifier si itemId est défini
    if (!item || !item.idDrink || !item.strDrinkThumb) {
      return (
        <View>
          <Text>Item invalide</Text>
        </View>
      );
    }

    // Extraire les propriétés idDrink et strDrinkThumb de itemId
    const { idDrink, strDrinkThumb } = item;

    // Retourner l'élément avec les propriétés extraites
    return (
      <View key={idDrink}>
        <Image source={{ uri: strDrinkThumb }} style={styles.image} />
        <Text>{idDrink}</Text>
        <Button
          title="Remove"
          onPress={() => handleRemoveFromFavorites(item)}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={favorites}
      renderItem={renderFavoriteItem}
      keyExtractor={(item, index) => `${item.idDrink}-${index}`}
      ListHeaderComponent={<Text>Favorites:</Text>}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
  },
  button: {
    marginLeft: "auto",
  },
  image: {
    width: hp(30),
    height: hp(30),
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default FavoritesScreen;
