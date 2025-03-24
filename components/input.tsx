import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardTypeOptions,
  Platform,
  Image,
} from "react-native";

import { COLORS } from "../lib/constants";

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  error?: boolean;
  success?: boolean;
  isPassword?: boolean;
  label?: string;
  placeholderTextColor?: string;
  borderColor?: string;
  labelStyle?: object;
  onValidate?: (value: string) => boolean;
  numberOfLines?: number;
  maxLength?: number;
  multiline?: boolean;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  error = false,
  success = false,
  isPassword = false,
  label,
  placeholderTextColor = "#000",
  borderColor = "#4D9E70",
  labelStyle = {},
  onValidate,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isInputError = onValidate ? !onValidate(value) : error;
  const isInputSuccess = onValidate ? onValidate(value) : success;

  const getBorderColor = (): string => {
    if (isInputError) return "red";
    if (isInputSuccess) return "green";
    return borderColor;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text
          style={[styles.label, labelStyle, isInputError && styles.errorLabel]}
        >
          {label}
        </Text>
      )}
      <View style={[styles.container, { borderColor: getBorderColor() }]}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={isPassword && !passwordVisible}
          keyboardType={keyboardType}
          numberOfLines={6}
          maxLength={40}
          multiline={false}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.icon}
          >
            <Image
              source={
                passwordVisible
                  ? require("../assets/Show.png")
                  : require("../assets/Hide.png")
              }
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    width: 380,
    height: 60,
    paddingVertical: 18,
    paddingHorizontal: 236,
    paddingLeft: 16,
    borderRadius: 14,
    backgroundColor: "#F4F3F2",
    paddingRight: 16,
    borderColor: "blue",
  },
  input: {
    flex: 1,
    height: Platform.OS === "ios" ? 50 : 50,
    color: COLORS.black,
  },
  icon: { padding: 5 },
  wrapper: {
    margin: 12,
  },
  label: {
    marginLeft: 5,
    marginBottom: 5,
    color: "#24232A",
    fontFamily: "Inter",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 20,
  },
  errorLabel: {
    color: "red",
  },
});

export default Input;
