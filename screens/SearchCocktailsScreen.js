import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Modal,
  Button,
} from "react-native";
import * as Icon from "react-native-feather";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const SearchCocktailsScreen = () => {
  const [searchQueryByIngredient, setSearchQueryByIngredient] = useState("");
  const [searchQueryByName, setSearchQueryByName] = useState("");
  const [cocktails, setCocktails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isNoResultModalVisible, setIsNoResultModalVisible] = useState(false);
  const [isEmptyInputModalVisible, setIsEmptyInputModalVisible] =
    useState(false);

  const toggleErrorModal = () => {
    setIsErrorModalVisible(!isErrorModalVisible);
  };

  const toggleNoResultModal = () => {
    setIsNoResultModalVisible(!isNoResultModalVisible);
  };

  const toggleEmptyInputModal = () => {
    setIsEmptyInputModalVisible(!isEmptyInputModalVisible);
  };

  const searchCocktailsByIngredient = async () => {
    if (!searchQueryByIngredient) {
      toggleEmptyInputModal();
      return;
    }

    setIsLoading(true);
    try {
      setDrinks([]);
      setCocktails([]);
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchQueryByIngredient}`
      );
      const data = await response.json();
      if (data.drinks) {
        setCocktails(data.drinks);
      } else {
        setCocktails([]);
        toggleNoResultModal();
      }
    } catch (error) {
      console.error("Error fetching cocktails lors de cherche:", error);
      toggleErrorModal();
    }
    setIsLoading(false);
  };

  const searchCocktailsByName = async () => {
    if (!searchQueryByName) {
      toggleEmptyInputModal();
      return;
    }

    setIsLoading(true);
    try {
      setDrinks([]);
      setCocktails([]);
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQueryByName}`
      );
      const data = await response.json();
      if (data.drinks) {
        setDrinks(data.drinks);
      } else {
        setDrinks([]);
        toggleNoResultModal();
      }
    } catch (error) {
      //console.error("Error fetching cocktails lors de cherche:", error);
      toggleErrorModal();
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      {/* Search by ingredient */}
      <View style={styles.searchArea}>
        <View style={styles.search}>
          <TextInput
            placeholder="Search Your Favorite Cocktail by Ingredient"
            onChangeText={(text) => setSearchQueryByIngredient(text)}
            value={searchQueryByIngredient}
            style={styles.input}
          />
          <Icon.Search
            style={styles.searchIcon}
            onPress={searchCocktailsByIngredient}
            disabled={isLoading}
          />
        </View>
      </View>

      {/* Search by name */}
      <View style={styles.searchArea}>
        <View style={styles.search}>
          <TextInput
            placeholder="Search Your Favorite Cocktail By Name"
            onChangeText={(text) => setSearchQueryByName(text)}
            value={searchQueryByName}
            style={styles.input}
          />
          <Icon.Search
            style={styles.searchIcon}
            onPress={searchCocktailsByName}
            disabled={isLoading}
          />
        </View>
      </View>

      {/* Loading indicator */}
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

      {/* Results */}
      <View style={styles.resultsContainer}>
        {cocktails.length > 0 || drinks.length > 0 ? (
          <Text>The results are as follows:</Text>
        ) : null}
        <FlatList
          data={cocktails}
          keyExtractor={(item) => item.idDrink}
          renderItem={({ item }) => (
            <View>
              <Image
                source={{ uri: item.strDrinkThumb }}
                style={styles.image}
              />
              <Text>{item.strDrink}</Text>
            </View>
          )}
        />
        <FlatList
          data={drinks}
          keyExtractor={(item) => item.idDrink}
          renderItem={({ item }) => (
            <View>
              <Image
                source={{ uri: item.strDrinkThumb }}
                style={styles.image}
              />
              <Text>{item.strDrink}</Text>
            </View>
          )}
        />
      </View>

      {/* Error Modal */}
      <Modal
        visible={isErrorModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, styles.errorBackground]}>
            <Text style={styles.modalText}>
              Error fetching cocktails. Please try again later.
            </Text>
            <Button title="Close" onPress={toggleErrorModal} color="white" />
          </View>
        </View>
      </Modal>

      {/* No Result Modal */}
      <Modal
        visible={isNoResultModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, styles.errorBackground]}>
            <Text style={styles.modalText}>
              No results found. Please try again with different input.
            </Text>
            <Button title="Close" onPress={toggleNoResultModal} color="white" />
          </View>
        </View>
      </Modal>

      {/* Empty Input Modal */}
      <Modal
        visible={isEmptyInputModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, styles.errorBackground]}>
            <Text style={styles.modalText}>Please enter a valid input.</Text>
            <Button
              title="Close"
              onPress={toggleEmptyInputModal}
              color="white"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
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
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
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
  resultsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: hp(30),
    height: hp(30),
    borderRadius: 50,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 20,
    color: "gray",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "red",
    padding: 22,
    borderRadius: 4,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
  },
  errorBackground: {
    backgroundColor: "green",
  },
});

export default SearchCocktailsScreen;
