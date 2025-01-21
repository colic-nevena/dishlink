import React, { useEffect } from "react";
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
  Text,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import AppTextInput from "@/components/AppTextInput";
import AppButton from "@/components/AppButton";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { configureGoogleSignIn } from "../../googleSignInConfig";
import { loginCommand, signInWithGoogleCommand } from "@/commands/auth";
import { useRouter } from "expo-router";
import { Routes } from "@/constants/Routes";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const onSubmit = async (inputData: LoginFormInputs) => {
    const { email, password } = inputData;
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
              <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <AppTextInput
                    icon="email"
                    placeholder="Email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <AppTextInput
                    icon="lock"
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    textContentType="password"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

              <View style={styles.button}>
                <AppButton title="Login" onPress={handleSubmit(onSubmit)} />
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
