import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import * as Icons from "react-native-heroicons/solid";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { addToFavorites, removeFromFavorites } from "../components/Favorites";
import AsyncStorage from "@react-native-async-storage/async-storage";

function DetailsScreen({ route, navigation }) {
  const { idDrink, drink } = route.params;
  console.log("Item extracted from route.params:", idDrink);
  const [isFavorited, setIsFavorited] = useState();
  const [drinkDetails, setDrinksDetails] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const fetchDetailsData = async (idDrink) => {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`
      );
      const data = response.data;
      setDrinksDetails(data.drinks[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const checkIfFavorited = async () => {
    try {
      const favoritesList = await AsyncStorage.getItem("favorites");
      // console.log("favoritesList", favoritesList);
      if (favoritesList) {
        const favorites = JSON.parse(favoritesList);
        const isFavorited = favorites.some(
          (favorite) => favorite.idDrink === idDrink
        );
        setIsFavorited(isFavorited);
        // console.log("Favorited", isFavorited);
      }
    } catch (error) {
      console.log("Error checking if favorited:", error);
    }
  };

  useEffect(() => {
    if (idDrink) {
      fetchDetailsData(idDrink);
      checkIfFavorited();
      console.log("drinkDetailsData: ", drinkDetails);
    }
  }, [idDrink]);

  const handleAlcoholicPress = () => {
    navigation.navigate("AlcoholicDrinksScreen");
  };

  const handleCategoryPress = () => {
    navigation.navigate("Category");
  };

  const handleAddToFavorites = async () => {
    if (drinkDetails) {
      await addToFavorites(drinkDetails);
      setIsFavorited(true);
    }
  };

  // const handleRemoveFromFavorites = async () => {
  //   if (drinkDetails) {
  //     await removeFromFavorites(drinkDetails);
  //     setIsFavorited(false);
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

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.barIcon}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.chevronLeft}
        >
          <ChevronLeftIcon />
        </TouchableOpacity>
        <TouchableOpacity
          title="Add to Favorites"
          onPress={() => {
            if (isFavorited) {
              handleRemoveFromFavorites(drinkDetails);
            } else {
              handleAddToFavorites();
            }
            setIsFavorited(!isFavorited);
          }}
          style={styles.heartIconArea}
        >
          <Icons.HeartIcon
            // style={[styles.heartIcon, isFavorited && styles.favoritedColor]}
            style={[styles.heartIcon, { color: isFavorited ? "red" : "gray" }]}
          />
        </TouchableOpacity>
      </View>
      {drinkDetails && (
        <View style={styles.description}>
          <Image
            source={{ uri: drinkDetails.strDrinkThumb }}
            style={styles.image}
          />
          <Text style={styles.text}>{drinkDetails.strDrink}</Text>
          <Text style={styles.text}>{drinkDetails.idDrink}</Text>
          <TouchableOpacity onPress={handleAlcoholicPress}>
            <Text style={styles.text}>
              Alcoolisé: {drinkDetails.strAlcoholic}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCategoryPress}>
            <Text style={styles.text}>
              Category: {drinkDetails.strCategory}
            </Text>
          </TouchableOpacity>
          <Text style={styles.text}>Verre: {drinkDetails.strGlass}</Text>
          <Text style={styles.text}>Ingrédients:</Text>
          {Object.keys(drinkDetails).map((key) => {
            if (key.startsWith("strIngredient") && drinkDetails[key]) {
              return (
                <View key={key} style={styles.ingredientItem}>
                  <View style={styles.pinkSquare}></View>
                  <View style={styles.ingredientTextContainer}>
                    <Text style={styles.ingredientText}>
                      {drinkDetails[key]}
                    </Text>
                  </View>
                </View>
              );
            }
          })}
          <Text style={styles.text}>
            Instructions: {drinkDetails.strInstructions}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  barIcon: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 5,
    alignItems: "center",
  },
  heartIcon: {
    width: hp(5),
    height: hp(5),
    borderRadius: 20,
  },
  chevronLeft: {
    backgroundColor: "#FFB6C1",
    padding: 6,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  heartIconArea: {
    backgroundColor: "#FFB6C1",
    padding: 6,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 10,
  },
  // favoritedColor: {
  //   color: "red",
  // },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  pinkSquare: {
    width: 20,
    height: 20,
    backgroundColor: "pink",
    marginRight: 10,
  },
  ingredientTextContainer: {
    flex: 1,
  },
  ingredientText: {
    fontSize: 16,
  },
  instructionsText: {
    textAlign: "center",
  },
  underline: {
    textDecorationLine: "underline",
  },
});

export default DetailsScreen;
