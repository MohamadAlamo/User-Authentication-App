import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { COLORS, ROUTES } from "../../lib/constants";
import Input from "../../components/input";
import Button from "../../components/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthContext } from "../../context/AuthContext";
import { Alert } from "react-native";
interface LoginProps {
  navigation: StackNavigationProp<any, any>;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const success = await login(data.email, data.password);
      if (success) {
        navigation.navigate(ROUTES.HOME);
      } else {
        Alert.alert("Error", "Invalid email or password.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.avoidView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={styles.parentContainer}>
        <View style={styles.container}>
          <View style={styles.inputscontainer}>
            <Text style={styles.textStarted}>
              To get started, please enter your email and password
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  borderColor={
                    errors.email ? COLORS.red : COLORS.backgroundDark
                  }
                  labelStyle={styles.label}
                  placeholderTextColor={COLORS.gray}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your password"
                  secureTextEntry
                  isPassword
                  borderColor={
                    errors.password ? COLORS.red : COLORS.backgroundDark
                  }
                  labelStyle={styles.label}
                  placeholderTextColor={COLORS.gray}
                />
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
            <Button
              title="Next"
              onPress={handleSubmit(handleLogin)}
              backgroundColor={isValid ? COLORS.primary : COLORS.gray}
              titleColor={COLORS.brown}
              borderColor={isValid ? COLORS.primary : COLORS.gray}
              disabled={!isValid}
            />
          </View>

          <View style={styles.bottomTextContainer}>
            <Text style={styles.textDont}>
              Don’t have an account?
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.REGISTER)}
              >
                <Text style={styles.textSign}> Sign up</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  avoidView: { flex: 1 },
  parentContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    backgroundColor: COLORS.white,
  },
  label: {
    marginLeft: 5,
    marginBottom: 5,
    color: COLORS.backgroundDark,
    fontFamily: "Inter",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 20,
  },
  inputscontainer: {
    flex: 1,
    top: 90,
  },
  textStarted: {
    marginBottom: 20,
    marginTop: 5,
    left: 10,
    color: COLORS.gray,
  },
  bottomTextContainer: {
    justifyContent: "flex-end",
    marginBottom: 40,
  },
  textDont: {
    color: COLORS.gray,
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
  },
  textSign: {
    color: COLORS.primary,
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    marginBottom: -3,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default Login;
