import { StyleSheet, SafeAreaView, FlatList, ActivityIndicator, Button, ImageBackground, TouchableOpacity, Image, ScrollView, Text, View } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Icons from "react-native-heroicons/solid";


const HomeScreen = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [drinksData, setDrinksData] = useState(false);

  useEffect(() => {
     const fetchDrinksData = async () => {
      try {
        // const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`);
        // const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/randomselection.php`);
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail&p=${page}`);
        
        const { drinks } = await response.json();
        setDrinksData(drinks);
        console.log(drinks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDrinksData();
  }, []);

      if (!drinksData) {
                return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
                );
            }


    return (
      
      <SafeAreaView style={styles.safeAreaViewContainer}>
      
            <View style={styles.drinksContainer}>
                {/* <ImageBackground source={require('../assets/images/home.jpg')} resizeMode='cover' style={styles.image}> */}
                <FlatList
                    data={drinksData} 
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                        <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
                        <Text style={styles.text}>Name: {item.strDrink}</Text>
                        <Icons.HeartIcon />

                        
                        <Button title="Go to Détails"
                          onPress={() => navigation.navigate('Details', { drink: item })} />
                        
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
    backgroundColor: '#fff', 
  },
  drinksContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    borderRadius: 10,
  },
  text: {
    marginBottom: 5,
  },
  
});

export default HomeScreen;