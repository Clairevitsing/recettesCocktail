import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import DrinkItem from "../components/DrinkItem";

const CategoryScreen = () => {
  const [ordinaryDrinkData, setOrdinaryDrinkData] = useState([]);
  const [cocktailData, setCocktailData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Cocktail"); 

  const fetchDrinksData = async (type) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${type}`
      );
      const data = await response.json();
      if (type === "Cocktail") {
        setCocktailData(data.drinks);
      } else {
        setOrdinaryDrinkData(data.drinks);
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDrinksData(selectedCategory);
  }, [selectedCategory]);

  const renderLoader = () => {
    return isLoading ? (
      <View style={[styles.loadingContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : null;
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.categoryContainer}>
        <Text style={styles.title}>Categories</Text>
        <Text
          onPress={() => setSelectedCategory("Cocktail")}
          style={[
            styles.categoryTitle,
            selectedCategory === "Cocktail" && styles.selectedCategory,
          ]}
        >
          Cocktail
        </Text>
        <Text
          onPress={() => setSelectedCategory("Ordinary_Drink")}
          style={[
            styles.categoryTitle,
            selectedCategory === "Ordinary_Drink" && styles.selectedCategory,
          ]}
        >
          Ordinary Drink
        </Text>
        <FlatList
          data={
            selectedCategory === "Cocktail" ? cocktailData : ordinaryDrinkData
          }
          renderItem={({ item }) => <DrinkItem item={item} />}
          keyExtractor={(item) => item.idDrink}
          ListFooterComponent={renderLoader}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  categoryContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: "white",
  },
  categoryTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "white",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  selectedCategory: {
    fontWeight: "bold",
  },
});

export default CategoryScreen;
