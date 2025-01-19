import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import AppTextInput from "@/components/AppTextInput";
import AppButton from "@/components/AppButton";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { configureGoogleSignIn } from "../../googleSignInConfig";
import { loginCommand, signInWithGoogleCommand } from "@/commands/auth";
import { useRouter } from "expo-router";
import { Routes } from "@/constants/Routes";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const handleSubmit = async () => {
    await loginCommand(email, password);
    router.push(Routes.HOME);
  };

  const handleGoogleSignIn = async () => {
    const success = await signInWithGoogleCommand();
    if (success) {
      router.push(Routes.HOME);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        style={styles.background}
        source={require("../../assets/images/authScreen.png")}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            style={styles.formContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/images/logo.png")}
                style={styles.logo}
              />
            </View>

            <View style={styles.form}>
              <AppTextInput
                icon="email"
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                maxLength={50}
                onChangeText={setEmail}
                value={email}
              />

              <AppTextInput
                icon="lock"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                secureTextEntry
                maxLength={50}
                onChangeText={setPassword}
                value={password}
              />

              <View style={styles.button}>
                <AppButton title="Login" onPress={handleSubmit} />
              </View>

              <View style={styles.googleButton}>
                <GoogleSigninButton
                  size={GoogleSigninButton.Size.Icon}
                  color={GoogleSigninButton.Color.Light}
                  onPress={handleGoogleSignIn}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 220,
    height: 200,
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: "10%",
  },
  form: {
    width: "100%",
    maxWidth: 300,
  },
  button: {
    marginTop: 20,
    width: "100%",
  },
  googleButton: {
    marginTop: 20,
    alignItems: "center",
  },
});
