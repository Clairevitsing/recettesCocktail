import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addToFavorites = async (item) => {
  try {
    console.log("ItemID before addToFavorites:", item);

    if (!item || !item.idDrink) {
      console.log("Item ID is null or undefined");
      return;
    }

    const favoritesList = await AsyncStorage.getItem("favorites");
    console.log("favorites list:", favoritesList);
    let favorites = favoritesList ? JSON.parse(favoritesList) : [];

    // Vérifier si l'élément est déjà favori
    const isAlreadyFavorite = favorites.some(
      (favorite) => favorite.idDrink === item.idDrink
    );

    if (!isAlreadyFavorite) {
      // Si l'élément n'est pas déjà favori, l'ajouter à la liste
      const newFavoritesList = [...favorites, item];
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavoritesList));
    } else {
      console.log("Item is already in favorites");
      alert("This drink is already in favorites");
    }
  } catch (error) {
    console.log("Error adding to favorites:", error);
  }
};

export const removeFromFavorites = async (itemId) => {
  try {
    const favoritesList = await AsyncStorage.getItem("favorites");

    if (favoritesList) {
      let favorites = JSON.parse(favoritesList);

      const updatedFavorites = favorites.filter(
        (favorite) => favorite.idDrink !== itemId
      );

      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      console.log("Item removed from favorites successfully");
    } else {
      console.log("Favorites list is empty or undefined");
    }
  } catch (error) {
    console.log("Error removing from favorites:", error);
  }
};
