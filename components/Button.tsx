import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { COLORS } from "../lib/constants";

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  titleColor?: string;
  borderColor?: string;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  backgroundColor,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: backgroundColor,
          borderColor: backgroundColor,
          opacity: disabled ? 0.9 : 1,
        },
      ]}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: COLORS.black }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 385,
    height: 60,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  text: {
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 19,
    letterSpacing: -0.08,
  },
});

export default Button;
