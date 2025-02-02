import axios from "axios"
import * as SecureStore from "expo-secure-store"
import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { GoogleSignin } from "../googleSignInConfig"
import { auth } from "../firebaseConfig"
import Styles from "@/constants/Styles"
import Notifications from "@/constants/Notifications"
import Toast from "react-native-toast-message"

export async function signInWithGoogleCommand(): Promise<boolean> {
    try {
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()

        if (userInfo && userInfo.data) {
            const googleCredential = GoogleAuthProvider.credential(userInfo.data.idToken)
            const userCredential = await signInWithCredential(auth, googleCredential)
            await storeToken(userCredential.user.uid)

            await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_API_URL}/auth/login`, {
                email: userCredential.user.email,
            })

            return true
        }
        return false
    } catch (error) {
        showNotification(Notifications.LOGIN_FAILED, Styles.colors.danger)
        return false
    }
}

export async function loginCommand(email: string, password: string): Promise<{ hasError: boolean, message: string }> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        if (!userCredential.user.emailVerified) {
            showNotification(Notifications.EMAIL_NOT_VERIFIED, Styles.colors.danger)
            return { hasError: true, message: "Email not verified" }
        }

        const idToken = await userCredential.user.getIdToken()
        await storeToken(idToken)

        await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_API_URL}/auth/login`, {
            email
        })

        return { hasError: false, message: "Login successful" }
    } catch (error: any) {
        handleErrorNotification(error)
        return { hasError: true, message: Notifications.LOGIN_FAILED }
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
            showNotification(Notifications.REGISTRATION_SUCCESS, Styles.colors.secondary)
        }

        return true
    } catch (error) {
        showNotification(Notifications.REGISTRATION_FAILED, Styles.colors.danger)
        return false
    }
}

export async function resendVerificationEmailCommand(email: string): Promise<void> {
    try {
        await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_API_URL}/auth/resend-verification-email`, { email })
        showNotification(Notifications.VERIFICATION_EMAIL_RESENT, Styles.colors.secondary)
    } catch (error) {
        showNotification(Notifications.VERIFICATION_EMAIL_FAILED, Styles.colors.danger)
    }
}

export async function logoutCommand() {
    try {
        await signOut(auth)
        // TODO: add logic somewhere to check if user is signed in and if not, redirect to login screen
    } catch (error) {
        console.error("Logout failed:", (error as Error).message)
        showNotification(Notifications.LOGOUT_FAILED, Styles.colors.danger)
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
        showNotification(Notifications.USER_NOT_FOUND, Styles.colors.danger)
    } else if (error.message.includes("wrong-password")) {
        showNotification(Notifications.WRONG_PASSWORD, Styles.colors.danger)
    } else if (error.message.includes("Email not verified")) {
        showNotification(Notifications.EMAIL_NOT_VERIFIED, Styles.colors.danger)
    } else {
        showNotification(Notifications.LOGIN_FAILED, Styles.colors.danger)
    }
}

async function showNotification(text: string, backgroundColor: string) {
    return Toast.show({
        type: backgroundColor === Styles.colors.danger ? "error" : "success",
        text1: text,
        visibilityTime: 3000,
        position: "bottom",
    })
}