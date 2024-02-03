import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const ringPadding1 = useSharedValue(0);
  const ringPadding2 = useSharedValue(0);
  const width = useSharedValue(100);

  const navigation = useNavigation();

  useEffect(() => {
    ringPadding1.value = withSpring(hp(5), { damping: 10, stiffness: 100 });
    ringPadding2.value = withSpring(hp(5.5), { damping: 10, stiffness: 100 });
  }, []);

  setTimeout(() => navigation.navigate("Home"), 2500);
  const goToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <TouchableOpacity onPress={goToHome} style={styles.touchableContainer}>
        <View style={styles.circleContainer}>
          <Animated.View
            style={[
              styles.circle,
              {
                width: ringPadding1,
                height: ringPadding1,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.innerCircle,
                {
                  width: ringPadding2,
                  height: ringPadding2,
                },
              ]}
            >
              <Image
                source={require("../assets/images/cocktail.jpg")}
                style={styles.image}
                resizeMode="stretch"
              />
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.title}>CooKtail</Text>
        <Text style={styles.introduction}>Enjoy your life</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#FFB6C1",
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: wp(100),
    height: hp(50),
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    borderRadius: hp(50), 
    backgroundColor: "blue", 
  },
  innerCircle: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    borderRadius: hp(50), 
    backgroundColor: "black",
  },
  image: {
    width: hp(20),
    height: hp(20),
    borderRadius: hp(10), 
  },
  textContainer: {
    height: "35%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  introduction: {
    fontSize: 18,
    color: "#555",
  },
  touchableContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomeScreen;
