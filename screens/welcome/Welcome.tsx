import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { COLORS, ROUTES } from "../../lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface WelcomeProps {
  navigation: StackNavigationProp<any, any>;
}

const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  const logoSource = require("../../assets/reactNative.png");
  useEffect(() => {
    const checkAllUsers = async () => {
      const usersData = await AsyncStorage.getItem("users");
      console.log("All Registered Users:", usersData);
    };
    const checkStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        console.log("Stored User Data:", userData);
      } catch (error) {
        console.error("Error reading AsyncStorage:", error);
      }
    };
    checkStorage();
    checkAllUsers();
  }, []);
  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={logoSource} style={styles.logo} />
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
      </View>
      <TouchableOpacity
        style={styles.signInContainer}
        onPress={() => navigation.navigate(ROUTES.REGISTER)}
      >
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginContainer}
        onPress={() => navigation.navigate(ROUTES.LOGIN)}
      >
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    flexDirection: "column",
  },
  header: {
    alignSelf: "stretch",
    paddingHorizontal: 16,
    paddingVertical: 0,
  },
  timeContainer: {
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  timeText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 21,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  image: {
    width: 18,
    height: 27,
    aspectRatio: 1.5,
  },
  logo: {
    alignSelf: "center",
    marginTop: 221,
    width: 160,
    height: 160,
    aspectRatio: 1,
  },
  welcomeContainer: {
    alignSelf: "center",
    marginTop: 20,
  },
  welcomeText: {
    color: COLORS.backgroundDark,
    textAlign: "center",
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700",
  },
  signInContainer: {
    alignSelf: "center",
    marginTop: 24,
    width: "100%",
    maxWidth: 358,
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.backgroundDark,
    borderRadius: 14,
  },
  signInText: {
    color: COLORS.backgroundDark,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "600",
  },
  loginContainer: {
    alignSelf: "center",
    marginTop: 8,
    width: "100%",
    maxWidth: 358,
    paddingVertical: 17,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
  },
  loginText: {
    color: COLORS.brown,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "600",
  },
});

export default Welcome;
