import React, { useEffect, useContext } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { COLORS } from "../../lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";

interface HomeProps {
  navigation: StackNavigationProp<any, any>;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

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

  const logoSource = require("../../assets/LogOut.png");
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome , {user?.name}!</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Image source={logoSource} style={styles.icon} />
        <Text style={styles.logoutButtonText}>LOG_OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BackgroundLight,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  welcomeContainer: {
    alignSelf: "center",
  },
  welcomeText: {
    color: COLORS.primary,
    textAlign: "center",
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700",
  },
  logoutButton: {
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.black,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    marginTop: 50,
    marginBottom: 50,
  },
  logoutButtonText: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: "500",
    marginLeft: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Home;
