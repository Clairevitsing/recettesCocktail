import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
  
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
import { heightPercentageToDP as hp} from "react-native-responsive-screen";
import RandomList from "../components/randomList";
import DrinkList from "../components/DrinkList";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [drinksData, setDrinksData] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrinksData();
    // handleSearchByIngredient();
  }, []);

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
        <Image
          source={require("../assets/images/admin.png")}
          resizeMode="cover"
          style={styles.adminImage}
        />
      </View>
      <View style={styles.searchArea}>
        {/* search bar */}
        <View style={styles.search}>
          <TextInput
            placeholder="Search Your Favorite Cocktail"
            style={styles.input}
          />

          <Icon.Search style={styles.searchIcon} />
        </View>
      </View>

      {/* main */}

      <View style={styles.drinksContainer}>
        <DrinkList drinksData={drinksData} navigation={navigation} />
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

  adminImage: {
    width: hp(5),
    height: hp(5),
    borderRadius: 20,
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

});

export default HomeScreen;
