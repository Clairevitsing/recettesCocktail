
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Alert, 
} from "react-native";
import * as Icon from "react-native-feather";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

// define SearchCocktailsScreen
const SearchCocktailsScreen = () => {
  const [searchQueryByIngredient, setSearchQueryByIngredient] = useState("");
  const [searchQueryByName, setSearchQueryByName] = useState("");
  const [cocktails, setCocktails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [drinks, setDrinks] = useState([]);

  const searchCocktailsByIngredient = async () => {
    if (!searchQueryByIngredient) {
      Alert.alert("Please enter an ingredient to search.");
      return;
    }

    setIsLoading(true);
    try {
      setDrinks([]);
      setCocktails([]);
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchQueryByIngredient}`
      );
      const data = await response.json();
      if (data.drinks) {
        setCocktails(data.drinks);
      } else {
        setCocktails([]);
      }
    } catch (error) {
      console.error("Error fetching cocktails lors de cherche:", error);
      Alert.alert("Error fetching cocktails. Please try again later.");
    }
    setIsLoading(false);
  };

  const searchCocktailsByName = async () => {
    if (!searchQueryByName) {
      Alert.alert("Please enter a name to search.");
      return;
    }

    setIsLoading(true);
    try {
      setDrinks([]);
      setCocktails([]);
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQueryByName}`
      );
      const data = await response.json();
      if (data.drinks) {
        setDrinks(data.drinks);
      } else {
        setDrinks([]);
      }
    } catch (error) {
      console.error("Error fetching cocktails lors de cherche:", error);
      Alert.alert("Error fetching cocktails. Please try again later.");
    }
    setIsLoading(false);
  };

  return (
    <View>
      {/* Search by ingredient */}
      <View style={styles.searchArea}>
        <View style={styles.search}>
          <TextInput
            placeholder="Search Your Favorite Cocktail by Ingredient"
            onChangeText={(text) => setSearchQueryByIngredient(text)}
            value={searchQueryByIngredient}
            style={styles.input}
          />
          <Icon.Search
            style={styles.searchIcon}
            onPress={searchCocktailsByIngredient}
            disabled={isLoading}
          />
        </View>
      </View>

      {/* Search by name */}
      <View style={styles.searchArea}>
        <View style={styles.search}>
          <TextInput
            placeholder="Search Your Favorite Cocktail By Name"
            onChangeText={(text) => setSearchQueryByName(text)}
            value={searchQueryByName}
            style={styles.input}
          />
          <Icon.Search
            style={styles.searchIcon}
            onPress={searchCocktailsByName}
            disabled={isLoading} 
          />
        </View>
      </View>

      {/* Loading indicator */}
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

      {/* Results */}
      <View style={styles.resultsContainer}>
        <Text>The results are as follows:</Text>
        <FlatList
          data={cocktails}
          keyExtractor={(item) => item.idDrink}
          renderItem={({ item }) => (
            <View>
              <Image
                source={{ uri: item.strDrinkThumb }}
                style={styles.image}
              />
              <Text>{item.strDrink}</Text>
            </View>
          )}
        />
        <FlatList
          data={drinks}
          keyExtractor={(item) => item.idDrink}
          renderItem={({ item }) => (
            <View>
              <Image
                source={{ uri: item.strDrinkThumb }}
                style={styles.image}
              />
              <Text>{item.strDrink}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginBottom: 20,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  image: {
    width: hp(30),
    height: hp(30),
    borderRadius: 50,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 20,
    color: "gray",
  },
});

export default SearchCocktailsScreen;
