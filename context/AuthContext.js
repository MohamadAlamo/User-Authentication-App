import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await AsyncStorage.getItem("currentUser");
      if (currentUser) {
        setUser(JSON.parse(currentUser));
      }
    };
    loadUser();
  }, []);

  const signup = async (name, email, password) => {
    const newUser = { name, email, password };

    const existingUsers = await AsyncStorage.getItem("users");
    const users = existingUsers ? JSON.parse(existingUsers) : [];

    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      return false;
    }

    users.push(newUser);
    await AsyncStorage.setItem("users", JSON.stringify(users));

    await AsyncStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const login = async (email, password) => {
    const existingUsers = await AsyncStorage.getItem("users");
    const users = existingUsers ? JSON.parse(existingUsers) : [];

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      await AsyncStorage.setItem("currentUser", JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    }

    return false;
  };

  const logout = async () => {
    await AsyncStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
