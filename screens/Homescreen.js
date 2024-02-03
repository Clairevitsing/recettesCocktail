import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Button,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icons from "react-native-heroicons/solid";
import * as Icon from "react-native-feather";
import { StatusBar } from "expo-status-bar";
import Categories from "../components/randomList";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [drinksData, setDrinksData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    fetchDrinksData();
    handleSearchByIngredient();
  }, []);

  const handleSearchByIngredient = async () => { 
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchQuery}`);
    
     const { cocktails } = await response.json();
     setSearchResults(cocktails);

  }
  const fetchDrinksData = async () => {
    try {
      // const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`);
      // const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/randomselection.php`);
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail&p=${page}`
      );
      const { drinks } = await response.json();
      setDrinksData(drinks);
      console.log(drinks);
    } catch (error) {
      console.error("Error fetching Cocktail data:", error);
    }
  };

  if (!drinksData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <StatusBar
        style={{ backgroundColor: "blue", barStyle: "dark-content" }}
      />
      <View style={styles.searchArea}>
        {/* search bar */}
        <View style={styles.search}>
          <Icon.Search style={styles.searchIcon} />
          <TextInput placeholder="input" style={styles.input} />
        </View>
        <View style={styles.slides}>
          <Icon.Sliders style={styles.slidesIcon} />
        </View>
      </View>

      {/* main */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.categoriesContainer}>
        <Categories/>

      </ScrollView>


      <View style={styles.drinksContainer}>
        {/* <ImageBackground source={require('../assets/images/home.jpg')} resizeMode='cover' style={styles.image}> */}
        <FlatList
          data={drinksData}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: item.strDrinkThumb }}
                style={styles.image}
              />
              <Text style={styles.text}>Name: {item.strDrink}</Text>
              <Icons.HeartIcon />

              <Button
                title="Go to Détails"
                onPress={() => navigation.navigate("Details", { drink: item })}
              />
            </View>
          )}
          keyExtractor={(item) => item.idDrink}
        />
        {/* </ImageBackground> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 50,
    flex: 1,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  slides: {
    backgroundColor: "#FFB6C1",
    padding: 2,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  slidesIcon: {
    size: 60,
    color: "red",
    margin: 10,
  },
  categoriesContainer: {
    paddingBottom: 20,
  },
  drinksContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
  },
  text: {
    marginBottom: 5,
  },
});

export default HomeScreen;
