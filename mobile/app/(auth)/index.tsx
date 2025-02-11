import React from "react";
import { ActivityIndicator, ImageBackground, StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import { useFonts } from "expo-font";
import colors from "@/constants/Colors";
import { Routes } from "@/constants/Routes";
import AppButton from "@/components/AppButton";
import Styles from "@/constants/Styles";

export default function WelcomeScreen() {
    const [fontsLoaded] = useFonts({
        Pacifico: require("../../assets/fonts/Pacifico-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={colors.primary || "#000"} />
            </View>
        );
    }

    return (
        <ImageBackground
            style={styles.background}
            source={require("../../assets/images/wallpaper2.png")}
            resizeMode="contain"
        >

            <View style={styles.buttonContainer}>
                <Link href={Routes.LOGIN} asChild>
                    <AppButton title="Login" color={colors.secondary} />
                </Link>

                <Link href={Routes.REGISTER} asChild style={{ marginTop: 0 }}>
                    <AppButton color={colors.primary} title="Register" />
                </Link>
            </View>
        </ImageBackground>
    );
}

WelcomeScreen.options = {
    headerShown: false,
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    buttonContainer: {
        padding: 20,
        width: "100%",
        position: "absolute",
        bottom: -10,
    },
    logoContainer: {
        position: "absolute",
        top: "19%",
        alignItems: "center",
    },
    logo: {
        width: 150,
        height: 150,
    },
});
