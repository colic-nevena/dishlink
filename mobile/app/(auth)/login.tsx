import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  View,
  Image,
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
    await signInWithGoogleCommand();
    router.push(Routes.HOME);
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
            icon="email"
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            secureTextEntry={false}
            maxLength={50}
            multiline={false}
            numberOfLines={1}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

          <AppTextInput
            icon="lock"
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            textContentType="password"
            secureTextEntry={true}
            maxLength={50}
            multiline={false}
            numberOfLines={1}
            onChangeText={(text) => setPassword(text)}
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
    width: "100%",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    marginBottom: "5%",
  },
  logo: {
    width: 220,
    height: 200,
  },
  formContainer: {
    width: "80%",
    maxWidth: 400,
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
