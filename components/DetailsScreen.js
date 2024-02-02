import { Button, StyleSheet, Text, View,Image } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function DetailsScreen({ route, navigation }) {
  console.log("Received props:", { route, navigation });
  // Get the drink object passed from navigation
  const { drink } = route.params; 


  return (
    <View style={styles.container}>
      <Image source={{ uri: drink.strDrinkThumb }} style={styles.image} />
      <Text style={styles.text}>Nom: {drink.strDrink}</Text>
      <Text style={styles.text}>ID: {drink.idDrink}</Text>
      <Text style={styles.text}>Alcoolisé: {drink.strAlcoholic}</Text>
      <Text style={styles.text}>Catégorie: {drink.strCategory}</Text>
      <Text style={styles.text}>Verre: {drink.strGlass}</Text>
      <Text style={styles.text}>Ingrédients: {drink.strIngredient1}, {drink.strIngredient2}, ...</Text>
      <Text style={styles.text}>Instructions: {drink.strInstructions}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default DetailsScreen;
