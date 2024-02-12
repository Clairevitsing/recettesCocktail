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
          title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
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
            style={[styles.heartIcon, { color: isFavorited ? "red" : "gray" }]}
          />
        </TouchableOpacity>
      </View>
      {drinkDetails && (
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Image
              source={{ uri: drinkDetails.strDrinkThumb }}
              style={styles.image}
            />
            <Text style={styles.titleText}>{drinkDetails.strDrink}</Text>
          </View>
          <View style={styles.cardBody}>
            <TouchableOpacity onPress={handleAlcoholicPress}>
              <Text style={[styles.cardText, styles.underlinedText]}>
                Alcoholic: {drinkDetails.strAlcoholic}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCategoryPress}>
              <Text style={[styles.cardText, styles.underlinedText]}>
                Category: {drinkDetails.strCategory}
              </Text>
            </TouchableOpacity>
            <Text style={styles.cardText}>Glass: {drinkDetails.strGlass}</Text>
            <Text style={styles.cardTitle}>Ingredients:</Text>
            <View style={styles.cardIngredients}>
              {Object.keys(drinkDetails).map((key) => {
                if (key.startsWith("strIngredient") && drinkDetails[key]) {
                  return (
                    <View key={key} style={styles.cardIngredient}>
                      <View style={styles.cardBullet}></View>
                      <Text style={styles.cardText}>{drinkDetails[key]}</Text>
                    </View>
                  );
                }
              })}
            </View>
            <View style={styles.cardInstructions}>
              <Text style={styles.cardTitle}>Instructions:</Text>
              <Text style={styles.cardText}>
                {drinkDetails.strInstructions}
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  textContainer: {
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

  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: hp(35),
    height: hp(35),
    borderRadius: 50,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 12,
  },
  underlinedText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardIngredients: {
    marginBottom: 10,
  },
  cardIngredient: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  cardBullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "pink",
    marginRight: 10,
  },
});

export default DetailsScreen;
