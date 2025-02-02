import React, { useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Platform,
    Text,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import AppTextInput from "@/components/AppTextInput";
import AppButton from "@/components/AppButton";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Routes } from "@/constants/Routes";
import { registerCommand } from "@/commands/auth";
import Styles from "@/constants/Styles";

interface RegisterFormInputs {
    fullName: string;
    email: string;
    password: string;
    verifyPassword: string;
}

export default function RegisterScreen() {
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterFormInputs>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            verifyPassword: "",
        },
    });
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [verifyPasswordVisible, setVerifyPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
    const toggleVerifyPasswordVisibility = () => setVerifyPasswordVisible(!verifyPasswordVisible);

    const onSubmit = async (data: RegisterFormInputs) => {
        const { fullName, email, password } = data;
        const success = await registerCommand(fullName, email, password);
        if (success) {
            setTimeout(() => {
                router.push(Routes.LOGIN);
            }, 1000);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.keyboardAvoidingView}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.logoContainer}>
                            <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
                        </View>

                        <View style={styles.form}>
                            <Controller
                                control={control}
                                name="fullName"
                                rules={{
                                    required: "Full name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Full name must be at least 2 characters",
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <AppTextInput
                                        icon="account"
                                        placeholder="Full Name"
                                        autoCapitalize="words"
                                        autoCorrect={false}
                                        maxLength={50}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}

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
                                render={({ field: { onChange, value } }) => (
                                    <AppTextInput
                                        icon="email"
                                        placeholder="Email"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="email-address"
                                        textContentType="emailAddress"
                                        maxLength={50}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

                            <View style={styles.passwordContainer}>
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
                                    render={({ field: { onChange, value } }) => (
                                        <AppTextInput
                                            icon="lock"
                                            placeholder="Password"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            secureTextEntry={!passwordVisible}
                                            textContentType="password"
                                            maxLength={50}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
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
                            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

                            <View style={styles.passwordContainer}>
                                <Controller
                                    control={control}
                                    name="verifyPassword"
                                    rules={{
                                        required: "Please confirm your password",
                                        validate: (value) => value === watch("password") || "Passwords do not match",
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <AppTextInput
                                            icon="lock"
                                            placeholder="Verify Password"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            secureTextEntry={!verifyPasswordVisible}
                                            maxLength={50}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
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
                            {errors.verifyPassword && (
                                <Text style={styles.errorText}>{errors.verifyPassword.message}</Text>
                            )}

                            <View style={styles.button}>
                                <AppButton title="Register" onPress={handleSubmit(onSubmit)} />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
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
        backgroundColor: Styles.colors.white,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 20,
        marginTop: -50,
    },
    logo: {
        width: 130,
        height: 130,
    },
    form: {
        width: "100%",
        maxWidth: 300,
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
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
    },
});
