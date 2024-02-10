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
} from "react-native";
import * as Icon from "react-native-feather";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";


const SearchCocktailsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchCocktails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchQuery}`
      );
      const data = await response.json();
      if (data.drinks) {
        setCocktails(data.drinks);
      } else {
        setCocktails([]);
      }
    } catch (error) {
      console.error("Error fetching cocktails lors de cherche:", error);
    }
    setLoading(false);
  };


  return (
    <View>
      <View style={styles.searchArea}>
        {/* search bar */}
        <View style={styles.search}>
          <TextInput
            placeholder="Search Your Favorite Cocktail"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
            style={styles.input}
          />
          <Icon.Search style={styles.searchIcon} onPress={searchCocktails} />
        </View>
      </View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <View style={styles.resultsContainer}>
        <Text>The resultats are as follows:</Text>
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
