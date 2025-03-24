import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { COLORS, ROUTES } from "../../lib/constants";
import Input from "../../components/input";
import Button from "../../components/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthContext } from "../../context/AuthContext";

interface RegisterProps {
  navigation: StackNavigationProp<any, any>;
}

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const { signup } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleReg = async (data: {
    firstName: string;
    email: string;
    password: string;
  }) => {
    try {
      const success = await signup(data.firstName, data.email, data.password);
      if (success) {
        navigation.navigate(ROUTES.HOME);
      } else {
        Alert.alert("Error", "Registration failed. Try again.");
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
              We'll use this to create an account if you don’t have one yet.
            </Text>

            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Name"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your name"
                  borderColor={
                    errors.firstName ? COLORS.red : COLORS.backgroundDark
                  }
                  labelStyle={styles.label}
                />
              )}
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName.message}</Text>
            )}

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter email"
                  keyboardType="email-address"
                  borderColor={
                    errors.email ? COLORS.red : COLORS.backgroundDark
                  }
                  labelStyle={styles.label}
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
                  placeholder="Make up a password (>6 characters)"
                  secureTextEntry
                  isPassword
                  borderColor={
                    errors.password ? COLORS.red : COLORS.backgroundDark
                  }
                  labelStyle={styles.label}
                />
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}

            <Button
              title="Next"
              onPress={handleSubmit(handleReg)}
              backgroundColor={isValid ? COLORS.primary : COLORS.gray}
              borderColor={isValid ? COLORS.primary : COLORS.gray}
              disabled={!isValid}
            />
          </View>

          <View style={styles.bottomTextContainer}>
            <Text style={styles.textDont}>
              Already have an account?
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.LOGIN)}
              >
                <Text style={styles.textSign}> Log in</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  avoidView: {
    flex: 1,
  },
  parentContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  label: {
    marginLeft: 5,
    marginBottom: 5,
    color: COLORS.backgroundDark,
    fontSize: 14,
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
    fontSize: 14,
  },
  textSign: {
    color: COLORS.primary,
    fontSize: 14,
    marginBottom: -3,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default Register;
