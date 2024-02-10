import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const CategoryScreen = () => {
  const [ordinaryDrinkData, setOrdinaryDrinkData] = useState([]);
  const [cocktailData, setCocktailData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDrinksData = async (type) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${type}`
      );
      const data = await response.json();
      if (type === "Cocktail") {
        setOrdinaryDrinkData(data.drinks);
      } else {
        setCocktailData(data.drinks);
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDrinksData("Cocktail");
    fetchDrinksData("Ordinary_Drink");
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>{item.strDrink}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLoader = () => {
    return isLoading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : null;
  };

  return (
    <View style={styles.container}>
      {cocktailData && cocktailData.length > 0 ? (
        <View>
          <Text style={styles.text}>Cocktail</Text>
          <FlatList
            data={cocktailData}
            renderItem={renderItem}
            keyExtractor={(item) => item.idDrink}
            ListFooterComponent={renderLoader}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.text}>Ordinary Drink</Text>
          <FlatList
            data={ordinaryDrinkData}
            renderItem={renderItem}
            keyExtractor={(item) => item.idDrink}
            ListFooterComponent={renderLoader}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
  },
  image: {
    width: hp(30),
    height: hp(30),
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default CategoryScreen;
