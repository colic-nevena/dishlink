import axios from "axios"
import * as SecureStore from "expo-secure-store"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { GoogleSignin } from "../googleSignInConfig"
import { auth } from "../firebaseConfig"

export async function signInWithGoogleCommand(): Promise<boolean> {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        if (userInfo.data && userInfo.data.idToken) {
            await storeToken(userInfo.data.idToken);
            return true
        }

        return false
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function loginCommand(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        const idToken = await userCredential.user.getIdToken()
        await storeToken(idToken)
    }
    catch (error) {
        console.error("Login failed:", (error as Error).message);
        throw error;
    }
}

export async function registerCommand(fullName: string, email: string, password: string): Promise<boolean> {
    try {
        const response = await axios.post(
            `${process.env.EXPO_PUBLIC_BACKEND_API_URL}/auth/register`,
            {
                fullName,
                email,
                password,
            }
        )

        if (response.status !== 201) return false

        return true
    }
    catch (error) {
        console.error("Register failed:", (error as Error).message);
        throw error;
    }
}

export async function logoutCommand() {
    try {
        await signOut(auth);
        // TODO: redirect to welcome screen
    } catch (error) {
        console.error("Logout failed:", (error as Error).message);
        throw error;
    }
}

async function storeToken(token: string) {
    try {
        await SecureStore.setItemAsync("userToken", token);
    } catch (error) {
        console.error("Error storing token:", error);
    }
}