import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
// import { useNavigation } from "@react-navigation/native";

const GetStarted = () => {
//   const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton}>
        <Pressable>
          <Icon name="arrow-right" size={20} color="#FFFFFF" />
        </Pressable>
      </TouchableOpacity>
      <Text style={styles.title}>CityWatch</Text>
      <Text style={styles.subtitle}>Stay connected, stay informed</Text>
      <Image
        style={styles.image}
        source={require("../assets/images/location.png")}
      />
      <Text style={styles.msg}>
        Your community is always at your fingertips.
      </Text>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 50,
    color: "#2E073F",
    fontWeight: "700",
    letterSpacing: 1,
  },
  image: {
    height: 300,
    width: 393,
    marginTop: 15,
  },
  subtitle: {
    color: "#2E073F",
    fontWeight: "500",
    fontSize: 15,
  },
  msg: {
    marginTop: 15,
    fontSize: 19,
    color: "#2E073F",
    fontWeight: "500",
    textAlign: "center",
  },
  iconButton: {
    backgroundColor: "#2F9C95",
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 270,
    marginBottom: 5,
  },
});