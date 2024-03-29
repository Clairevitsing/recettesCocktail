import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
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

    //in order to refrech automatically
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
        // Update the favorites list after deletion
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
    // Check if itemId is defined
    if (!item || !item.idDrink || !item.strDrinkThumb) {
      return (
        <View>
          <Text>Item invalide</Text>
        </View>
      );
    }

    // Extract the properties idDrink and strDrinkThumb from itemId
    const { idDrink, strDrink, strDrinkThumb } = item;

    // Return the element with the extracted properties
    return (
      <View key={idDrink} style={styles.itemContainer}>
        <Image source={{ uri: strDrinkThumb }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{strDrink}</Text>
          <TouchableOpacity
            onPress={() => handleRemoveFromFavorites(item)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.favoritesContainer}>
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item, index) => `${item.idDrink}`}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "black",
    marginTop: 10,
  },
  favoritesContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "column",
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: hp(30),
    height: hp(30),
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default FavoritesScreen;
