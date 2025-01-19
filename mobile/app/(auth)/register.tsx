import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import AppTextInput from "@/components/AppTextInput";
import AppButton from "@/components/AppButton";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Routes } from "@/constants/Routes";
import { registerCommand } from "@/commands/auth";
import Snackbar from "react-native-snackbar";
import Styles from "@/constants/Styles";

export default function RegisterScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [verifyPasswordVisible, setVerifyPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleVerifyPasswordVisibility = () =>
    setVerifyPasswordVisible(!verifyPasswordVisible);

  const handleSubmit = async () => {
    const success = await registerCommand(fullName, email, password);
    if (success) {
      Snackbar.show({
        text: "Registration successful! You can now login.",
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: Styles.colors.primary,
        textColor: Styles.colors.white,
      });

      setTimeout(() => {
        router.push(Routes.LOGIN);
      }, 1000);
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/images/authScreen.png")}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.formContainer}>
          <AppTextInput
            multiline={false}
            icon="account"
            placeholder="Full Name"
            autoCapitalize="words"
            autoCorrect={false}
            maxLength={50}
            onChangeText={(text) => setFullName(text)}
            value={fullName}
          />

          <AppTextInput
            multiline={false}
            icon="email"
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            maxLength={50}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

          <View style={styles.passwordContainer}>
            <AppTextInput
              multiline={false}
              icon="lock"
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!passwordVisible}
              textContentType="password"
              maxLength={50}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.visibilityToggle}
            >
              <MaterialIcons
                name={passwordVisible ? "visibility" : "visibility-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            <AppTextInput
              multiline={false}
              icon="lock"
              placeholder="Verify Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!verifyPasswordVisible}
              maxLength={50}
              onChangeText={(text) => setVerifyPassword(text)}
              value={verifyPassword}
            />
            <TouchableOpacity
              onPress={toggleVerifyPasswordVisibility}
              style={styles.visibilityToggle}
            >
              <MaterialIcons
                name={verifyPasswordVisible ? "visibility" : "visibility-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <AppButton title="Register" onPress={handleSubmit} />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginTop: "10%",
    width: "100%",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 220,
    height: 200,
  },
  formContainer: {
    width: "80%",
    maxWidth: 400,
    marginTop: 15,
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  visibilityToggle: {
    position: "absolute",
    right: 10,
    top: "30%",
    zIndex: 1,
  },
  button: {
    marginTop: 20,
    width: "100%",
  },
});
