import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as React from 'react';
import { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import * as Icon from "react-native-feather";
import * as Icons from "react-native-heroicons/solid";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

function DetailsScreen({ route, navigation }) {
  console.log("Received props:", { route, navigation });
  // Get the drink object passed from navigation
  const { drink } = route.params; 
  const [isFavorited, setIsFavorited] = useState(false);


  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.barIcon}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.chevronLeft}
        >
          <ChevronLeftIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavorited(!isFavorited)}
          style={styles.heartIconArea}
        >
          <Icons.HeartIcon
            style={[styles.heartIcon, , isFavorited && styles.favoritedColor]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.description}>
        <Image source={{ uri: drink.strDrinkThumb }} style={styles.image} />
        <Text style={styles.text}>{drink.strDrink}</Text>
        <Text style={styles.text}>{drink.idDrink}</Text>
        <Text style={styles.text}>Alcoolisé: {drink.strAlcoholic}</Text>
        <Text style={styles.text}>Catégorie: {drink.strCategory}</Text>
        <Text style={styles.text}>Verre: {drink.strGlass}</Text>
        <Text style={styles.text}>
          Ingrédients: {drink.strIngredient1}, {drink.strIngredient2}, ...
        </Text>
        <Text style={styles.text}>Instructions: {drink.strInstructions}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },

  barIcon: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 5,
    alignItems: "center",
  },
  heartIcon: {
    width: hp(5),
    height: hp(5),
    borderRadius: 20,
  },
  chevronLeft: {
    backgroundColor: "#FFB6C1",
    padding: 6,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  chevronLeftIcon: {
    width: hp(5),
    height: hp(5),
    size: 15,
    borderRadius: 20,
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
  description: {
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 10,
  },
  favoritedColor: {
    color: "red", 
  },
});


export default DetailsScreen;
