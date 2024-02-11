import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
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
    const [alcoholicDrinksData, setAlcoholicDrinksData] = useState([]);
    const [nonAlcoholicDrinksData, setNonAlcoholicDrinksData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
      <SafeAreaView style={styles.safeAreaViewContainer}>
        {alcoholicDrinksData && alcoholicDrinksData.length > 0 ? (
          <View style={styles.alcoholicContainer}>
            <Text style={styles.text}>Boissons alcoolisées</Text>
            <FlatList
              data={alcoholicDrinksData}
              renderItem={renderItem}
              keyExtractor={(item) => item.idDrink}
              ListFooterComponent={renderLoader}
            />
          </View>
        ) : (
          <View style={styles.alcoholicContainer}>
            <Text style={styles.text}>Boissons non alcoolisées</Text>
            <FlatList
              data={nonAlcoholicDrinksData}
              renderItem={renderItem}
              keyExtractor={(item) => item.idDrink}
              ListFooterComponent={renderLoader}
            />
          </View>
        )}
      </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
  },
  alcoholicContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
