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

const AlcoholicDrinksScreen = () => {
  const [drinksData, setDrinksData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour récupérer les données filtrées
  const fetchAlcoholicDrinksData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`
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
  }, []); 

  
  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>{item.strDrink}</Text>
      </TouchableOpacity>
      <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
    </View>
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
  image: {
    width: hp(30),
    height: hp(30),
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default AlcoholicDrinksScreen;
