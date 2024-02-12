import {
  StyleSheet,
  ImageBackground,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const loadMoreItems = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getDrinksData();
  }, [currentPage]);

  const getDrinksData = async () => {
    try {
      setIsLoading(true);
      const response = await Axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail&p=${currentPage}`
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
      <View style={styles.drinksContainer}>
        <ImageBackground
          source={require("../assets/images/cocktailHome.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          {/* main */}
            <DrinkList
              drinksData={drinksData}
              loadMoreItems={loadMoreItems}
              navigation={navigation}
            />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  drinksContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
