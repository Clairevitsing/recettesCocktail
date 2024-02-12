import React from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DrinkItem from "../components/DrinkItem";

const DrinkList = ({ drinksData, loadMoreItems }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    loadMoreItems();
  };

  const handleDetailsNavigation = (idDrink) => {
    navigation.navigate("Details", { idDrink });
  };

  // two methods for loading 1,
  const renderLoader = () => {
    return isLoading ? (
      <View style={[styles.loadingContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };
  // two methods for loading 2,
  // if (!drinksData) {
  //   return (
  //     <View style={[styles.loadingContainer, styles.horizontal]}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />

      <View style={styles.informations}>
        <View style={styles.name}>
          <Text style={styles.text}>{item.strDrink}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleDetailsNavigation(item.idDrink)}
          style={styles.detailsLink}
        >
          <Text style={styles.moreLink}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.cocktailContainer}>
      {drinksData ? (
        <FlatList
          data={drinksData}
          renderItem={({ item }) => <DrinkItem item={item} />}
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
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  cocktailContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
};

export default DrinkList;
