import axios from "axios"
import * as SecureStore from "expo-secure-store"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { GoogleSignin } from "../googleSignInConfig"
import { auth } from "../firebaseConfig"
import Snackbar from "react-native-snackbar"
import Styles from "@/constants/Styles"

export async function signInWithGoogleCommand(): Promise<boolean> {
    try {
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()

        if (userInfo.data && userInfo.data.idToken) {
            await storeToken(userInfo.data.idToken)
            return true
        }

        return false
    } catch (error) {
        console.log(error)
        showNotification("Google sign in failed. Please try again.", Styles.colors.danger)
        return false
    }
}

export async function loginCommand(email: string, password: string): Promise<{ hasError: boolean, message: string }> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        if (!userCredential.user.emailVerified) {
            showNotification("Email not verified. Please check your inbox or resend the verification email.", Styles.colors.danger)
            return { hasError: true, message: "Email not verified" }
        }

        const idToken = await userCredential.user.getIdToken()
        await storeToken(idToken)
        return { hasError: false, message: "Login successful" }
    }
    catch (error: any) {
        handleErrorNotification(error)
        return { hasError: true, message: "Login failed" }
    }
}

export async function registerCommand(fullName: string, email: string, password: string): Promise<boolean> {
    try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_API_URL}/auth/register`, {
            fullName,
            email,
            password,
        })

        if (response.status === 201) {
            showNotification("Registration successful! Please verify your email before logging in.", Styles.colors.secondary)
        }

        return true
    }
    catch (error) {
        showNotification("Registration failed. Please try again.", Styles.colors.danger)
        return false
    }
}

export async function resendVerificationEmailCommand(email: string): Promise<void> {
    try {
        await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_API_URL}/auth/resend-verification-email`, {
            email,
        })
        showNotification("Verification email resent! Check your inbox.", Styles.colors.secondary)
    }
    catch (error) {
        showNotification("Failed to resend verification email. Try again later.", Styles.colors.danger)
    }
}

export async function logoutCommand() {
    try {
        await signOut(auth)
        // TODO: add logic somewhere to check if user is signed in and if not, redirect to login screen
    } catch (error) {
        console.error("Logout failed:", (error as Error).message)
        showNotification("Logout failed. Please try again later.", Styles.colors.danger)
    }
}

async function storeToken(token: string) {
    try {
        await SecureStore.setItemAsync("userToken", token)
    } catch (error) {
        console.error("Error storing token:", error)
    }
}

async function handleErrorNotification(error: any) {
    if (error.message.includes("user-not-found")) {
        showNotification("User not found. Please check your email and try again.", Styles.colors.danger)
    }
    else if (error.message.includes("wrong-password")) {
        showNotification("Incorrect password. Please try again.", Styles.colors.danger)
    }
    else if (error.message.includes("Email not verified")) {
        showNotification("Email not verified. Please check your inbox or resend the verification email.", Styles.colors.danger)
    }
    else {
        showNotification("Login failed. Please try again later.", Styles.colors.danger)
    }
}

async function showNotification(text: string, backgroundColor: string) {
    Snackbar.show({
        text,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor,
        textColor: Styles.colors.white,
    })
}