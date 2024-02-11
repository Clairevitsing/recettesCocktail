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

const DrinkList = ({ drinksData, loadMoreItems }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    loadMoreItems();
  };

  const handleDetailsNavigation = (idDrink) => {
    navigation.navigate("Details",{ idDrink });
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  if (!drinksData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.cocktailContainer}>
      {drinksData ? (
        <FlatList
          data={drinksData}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: item.strDrinkThumb }}
                style={styles.image}
              />

              <View style={styles.informations}>
                <View style={styles.name}>
                  <Text style={styles.text}>{item.strDrink}</Text>
                </View>
                <TouchableOpacity
                  onPress={()=>handleDetailsNavigation(item.idDrink)}
                  style={styles.detailsLink}
                >
                  <Text style={styles.moreLink}>Learn More</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          // in order to keep the key unique
          keyExtractor={(item, index) => item.idDrink + index}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderLoader}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
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
  informations: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    flex: 1,
  },
  moreLink: {
    textDecorationLine: "underline",
    color:"blue"
  },
};

export default DrinkList;
