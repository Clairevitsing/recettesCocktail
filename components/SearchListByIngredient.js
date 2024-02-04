import React from "react";
import { ScrollView, Image,Text,StyleSheet,View } from "react-native";
import DetailsScreen from "../screens/DetailsScreen";

const SearchListByIngredient = ({ searchResultsByIngredient }) => {
  return (
    <ScrollView style={styles.scrollView}>
      {searchResultsByIngredient.map(
        (cocktail) => (
          <View key={cocktail.idDrink}>
            <Image
              source={{ uri: cocktail.strDrinkThumb }}
              style={styles.image}
            />
            <Text>{cocktail.strDrink}</Text>
          </View>
        )
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({});

export default SearchListByIngredient;
