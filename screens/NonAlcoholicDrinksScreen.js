import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

const NonAlcoholicDrinksScreen = () => {
  const [drinksData, setDrinksData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour récupérer les données filtrées
  const fetchAlcoholicDrinksData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`
      );
      const data = await response.json();
      setDrinksData(data.drinks);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAlcoholicDrinksData();
  }, []); // Appel une fois au chargement initial

  // Rendu de chaque élément de la FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{item.strDrink}</Text>
    </TouchableOpacity>
  );

  // Rendu du loader pendant le chargement
  const renderLoader = () => {
    return isLoading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contenu des boissons alcoolisées</Text>
      <FlatList
        data={drinksData}
        renderItem={renderItem}
        keyExtractor={(item) => item.idDrink}
        ListFooterComponent={renderLoader}
      />
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
});

export default NonAlcoholicDrinksScreen;
