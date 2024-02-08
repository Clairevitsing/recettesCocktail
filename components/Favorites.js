
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addToFavorites = async (item) => {
  try {
    
    const existingFavorites = await AsyncStorage.getItem("favorites");
    let favorites = existingFavorites ? JSON.parse(existingFavorites) : [];

    favorites.push(item);

    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.log("Error adding to favorites:", error);
  }
};
