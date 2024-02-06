import React from "react";
import {
  View,
  Image,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Icons from "react-native-heroicons/solid";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const DrinkList = ({ drinksData, navigation }) => {
    const [isFavorited, setIsFavorited] = useState(false);

  if (!drinksData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.cocktailContainer}>
      <FlatList
        data={drinksData}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Details", { drink: item })}
            >
              <Image
                source={{ uri: item.strDrinkThumb }}
                style={styles.image}
              />
            </TouchableOpacity>
            <View style={styles.description}>
              <Text style={styles.text}>{item.strDrink}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.idDrink}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = {
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cocktailContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: hp(30),
    height: hp(30),
    borderRadius: 50,
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
  },
  description: {
    marginBottom: 20,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 5,
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flex: 1,
    marginBottom: 5,
  },
};

export default DrinkList;
