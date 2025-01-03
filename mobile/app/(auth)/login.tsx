import React, { useState } from "react"
import { StyleSheet, ImageBackground, SafeAreaView, View, Image, Alert } from 'react-native';
import AppTextInput from "@/components/AppTextInput";
import AppButton from "@/components/AppButton";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
      if (email && password) {
        Alert.alert("Success", `Email: ${email}\nPassword: ${password}`);
      } else {
        Alert.alert("Error", "Please fill in both fields.");
      }
  };

  return (
    <ImageBackground style={styles.background} source={require("../../assets/images/authScreen.png")}>
      <SafeAreaView style={styles.container}>

        <View style={styles.logoContainer}>
          <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
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
    marginTop: "20%",
    width: "100%",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
  },
  formContainer: {
    width: "80%",
    maxWidth: 400,
    marginTop: 15,
  },
  button: {
    marginTop: 20,
    width: "100%",
  }
});