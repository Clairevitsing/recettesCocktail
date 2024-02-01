import { StyleSheet, SafeAreaView, FlatList, ActivityIndicator, Button, ImageBackground,TouchableOpacity, Image, ScrollView,Text, View } from 'react-native';
import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';






const HomeScreen = ({ drinksData,navigation }) => {

    
      if (!drinksData) {
                return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
                );
            }


    return (
      
      <SafeAreaView style={styles.safeAreaViewContainer}>
            <View style={styles.container}>
                {/* <ImageBackground source={require('../assets/images/home.jpg')} resizeMode='cover' style={styles.image}> */}
                <FlatList
                    data={drinksData} 
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                        <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
                            <Text style={styles.text}>Nom: {item.strDrink}</Text>
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
  container: {
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