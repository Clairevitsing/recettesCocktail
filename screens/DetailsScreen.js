import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import * as Icon from "react-native-feather";
import * as Icons from "react-native-heroicons/solid";
import { useState, useEffect } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import {addToFavorites} from "../components/Favorites";





function DetailsScreen({ route, navigation }) {
  console.log("Received props:", { route, navigation });
  console.log("Données de la boisson:", drink);
  // Get the drink object passed from navigation
  
  const { drink } = route.params;
  const [isFavorited, setIsFavorited] = useState(false);

  const handleAlcoholicPress = () => {
  navigation.navigate("AlcoholicDrinksScreen"); 
};

  const handleAddToFavorites = ({ }) => { 
    addToFavorites(drink);
     setIsFavorited(true);
  };
  
  useEffect(() => {
    handleAlcoholicPress();
  }, []);
  
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
          title="Save to Favorites" onPress={handleAddToFavorites}
          style={styles.heartIconArea}
        >
          <Icons.HeartIcon
            style={[styles.heartIcon, isFavorited && styles.favoritedColor]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.description}>
        <Image source={{ uri: drink.strDrinkThumb }} style={styles.image} />
        <Text style={styles.text}>{drink.strDrink}</Text>
        <Text style={styles.text}>{drink.idDrink}</Text>
        <TouchableOpacity onPress={handleAlcoholicPress}>
          <Text style={styles.text}>
            Alcoolisé: {drink.strAlcoholic}
          </Text>
        </TouchableOpacity>
        <Text style={styles.text}>Catégorie: {drink.strCategory}</Text>
        <Text style={styles.text}>Verre: {drink.strGlass}</Text>
        <Text style={styles.text}>Ingrédients:</Text>
        {Object.keys(drink).map((key) => {
          if (key.startsWith("strIngredient") && drink[key]) {
            return (
              <View key={key} style={styles.ingredientItem}>
                <View style={styles.pinkSquare}></View>
                <View style={styles.ingredientTextContainer}>
                  <Text style={styles.ingredientText}>{drink[key]}</Text>
                </View>
              </View>
            );
          }
        })}
        <Text style={styles.text}>Instructions: {drink.strInstructions}</Text>
      </View>
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
  chevronLeftIcon: {
    width: hp(5),
    height: hp(5),
    size: 15,
    borderRadius: 20,
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
  favoritedColor: {
    color: "red",
  },
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
  }
});

export default DetailsScreen;
