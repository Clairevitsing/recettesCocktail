import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icons from "react-native-heroicons/solid";
import * as Icon from "react-native-feather";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import DrinkList from "../components/DrinkList";
import Axios from "axios";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [drinksData, setDrinksData] = useState([]);
  const [currentPage, setCurrentPage] = useState(97);
  const [isLoading, setIsLoading] = useState(true);
  const randomLetter = (_) =>
    String.fromCharCode(0 | (Math.random() * 26 + 97));

  const loadMoreItems = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getDrinksData();
  }, [currentPage]);

  const handleFavoritesList = () => {
    navigation.navigate('Favorites');
  }

   const handleSearchCocktails = () => {
     navigation.navigate("SearchCocktails");
   };

  const getDrinksData = async () => {
    try {
      setIsLoading(true);
      const response = await Axios.get(
        `http://www.thecocktaildb.com/api/json/v1/1/search.php?f=${randomLetter(
          currentPage
        )}`
      );
      setDrinksData((prevDrinksData) => [
        ...prevDrinksData,
        ...response.data.drinks,
      ]);
    } catch (error) {
      console.error("Error fetching Cocktail data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      {/* <StatusBar
        style={{ backgroundColor: "white", barStyle: "dark-content" }}
      /> */}
      {/* header */}
      <View style={styles.headerBar}>
        <View style={styles.slides}>
          <Icon.Sliders style={styles.slidesIcon} />
        </View>
        <TouchableOpacity
          title="Search Cocktails"
          onPress={handleSearchCocktails}
          style={styles.heartIconArea}
        >
          <Icon.Search style={styles.searchIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity
          title="Favorites list"
          onPress={handleFavoritesList}
          style={styles.heartIconArea}
        >
          <Icons.HeartIcon style={[styles.heartIcon]} />
        </TouchableOpacity>
        <Image
          source={require("../assets/images/admin.png")}
          resizeMode="cover"
          style={styles.adminImage}
        />
      </View>

      {/* main */}

      <View style={styles.drinksContainer}>
        <DrinkList
          drinksData={drinksData}
          loadMoreItems={loadMoreItems}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerBar: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 5,
    alignItems: "center",
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
  adminImage: {
    width: hp(5),
    height: hp(5),
    borderRadius: 20,
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
});

export default HomeScreen;
