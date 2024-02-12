import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const DrinkItem = ({ item }) => {
  const navigation = useNavigation();

  const handleDetailsNavigation = (idDrink) => {
    navigation.navigate("Details", { idDrink });
  };

  return (
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
};

const styles = {
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
  },
  informations: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    flex: 1,
  },
  moreLink: {
    textDecorationLine: "underline",
    color: "blue",
  },
  image: {
    width: hp(30),
    height: hp(30),
    borderRadius: 50,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
};

export default DrinkItem;
