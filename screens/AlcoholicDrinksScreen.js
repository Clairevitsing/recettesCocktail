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

const AlcoholicDrinksScreen = () => {
  const [alcoholicDrinksData, setAlcoholicDrinksData] = useState([]);
  const [nonAlcoholicDrinksData, setNonAlcoholicDrinksData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Alcoholic"); 

  const fetchDrinksData = async (type) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${type}`
      );
      const data = await response.json();
      if (type === "Alcoholic") {
        setAlcoholicDrinksData(data.drinks);
      } else {
        setNonAlcoholicDrinksData(data.drinks);
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDrinksData("Alcoholic");
    fetchDrinksData("Non_Alcoholic");
  }, []);

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
          onPress={() => setSelectedCategory("Alcoholic")}
          style={[
            styles.categoryTitle,
            selectedCategory === "Alcoholic" && styles.selectedCategory,
          ]}
        >
          Alcoholic Drinks
        </Text>
        <Text
          onPress={() => setSelectedCategory("Non_Alcoholic")}
          style={[
            styles.categoryTitle,
            selectedCategory === "Non_Alcoholic" && styles.selectedCategory,
          ]}
        >
          Non-alcoholic Drinks
        </Text>
        <FlatList
          data={
            selectedCategory === "Alcoholic"
              ? alcoholicDrinksData
              : nonAlcoholicDrinksData
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

export default AlcoholicDrinksScreen;
