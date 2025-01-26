// import React, { useEffect, useState } from "react"
// import {
//     StyleSheet,
//     SafeAreaView,
//     View,
//     Image,
//     KeyboardAvoidingView,
//     TouchableWithoutFeedback,
//     Keyboard,
//     Platform,
//     Text,
// } from "react-native"
// import { useForm, Controller } from "react-hook-form"
// import AppTextInput from "@/components/AppTextInput"
// import AppButton from "@/components/AppButton"
// import { GoogleSigninButton } from "@react-native-google-signin/google-signin"
// import { configureGoogleSignIn } from "../../googleSignInConfig"
// import {
//     loginCommand,
//     signInWithGoogleCommand,
//     resendVerificationEmailCommand,
// } from "@/commands/auth"
// import { useRouter } from "expo-router"
// import { Routes } from "@/constants/Routes"
// import Snackbar from "react-native-snackbar"
// import Styles from "@/constants/Styles"

// interface LoginFormInputs {
//     email: string
//     password: string
// }

// export default function LoginScreen() {
//     const router = useRouter()
//     const [isResendVisible, setIsResendVisible] = useState(false)
//     const [currentEmail, setCurrentEmail] = useState("")

//     const {
//         control,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<LoginFormInputs>({
//         defaultValues: {
//             email: "",
//             password: "",
//         },
//     })

//     useEffect(() => {
//         configureGoogleSignIn()
//     }, [])

//     const onSubmit = async (inputData: LoginFormInputs) => {
//         const { email, password } = inputData
//         setCurrentEmail(email)

//         const success = await loginCommand(email, password)
//         if (success.hasError === false) {
//             router.push(Routes.HOME)
//         } else
//             if (success.message === "Email not verified") {
//                 setIsResendVisible(true)
//             }
//             else
//                 setIsResendVisible(false)
//     }

//     const handleGoogleSignIn = async () => {
//         const success = await signInWithGoogleCommand()
//         if (success) {
//             router.push(Routes.HOME)
//         }
//     }

//     const handleResendVerification = async () => {
//         await resendVerificationEmailCommand(currentEmail)
//     }

//     return (
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//             <SafeAreaView style={styles.container}>
//                 <KeyboardAvoidingView
//                     style={styles.formContainer}
//                     behavior={Platform.OS === "ios" ? "padding" : "height"}
//                 >
//                     <View style={styles.logoContainer}>
//                         <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
//                     </View>

//                     <View style={styles.form}>
//                         <Controller
//                             control={control}
//                             name="email"
//                             rules={{
//                                 required: "Email is required",
//                                 pattern: {
//                                     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                                     message: "Invalid email address",
//                                 },
//                             }}
//                             render={({ field: { onChange, onBlur, value } }) => (
//                                 <AppTextInput
//                                     icon="email"
//                                     placeholder="Email"
//                                     autoCapitalize="none"
//                                     autoCorrect={false}
//                                     keyboardType="email-address"
//                                     textContentType="emailAddress"
//                                     onChangeText={onChange}
//                                     onBlur={onBlur}
//                                     value={value}
//                                 />
//                             )}
//                         />
//                         {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

//                         <Controller
//                             control={control}
//                             name="password"
//                             rules={{
//                                 required: "Password is required",
//                                 minLength: {
//                                     value: 6,
//                                     message: "Password must be at least 6 characters",
//                                 },
//                             }}
//                             render={({ field: { onChange, onBlur, value } }) => (
//                                 <AppTextInput
//                                     icon="lock"
//                                     placeholder="Password"
//                                     autoCapitalize="none"
//                                     autoCorrect={false}
//                                     secureTextEntry
//                                     textContentType="password"
//                                     onChangeText={onChange}
//                                     onBlur={onBlur}
//                                     value={value}
//                                 />
//                             )}
//                         />
//                         {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

//                         <View style={styles.button}>
//                             <AppButton title="Login" onPress={handleSubmit(onSubmit)} />
//                         </View>

//                         {isResendVisible && (
//                             <View style={styles.button}>
//                                 <AppButton title="Resend Email" onPress={handleResendVerification} size="small" />
//                             </View>
//                         )}

//                         <View style={styles.googleButtonContainer}>
//                             <GoogleSigninButton
//                                 size={GoogleSigninButton.Size.Wide}
//                                 color={GoogleSigninButton.Color.Light}
//                                 onPress={handleGoogleSignIn}
//                             />
//                         </View>
//                     </View>
//                 </KeyboardAvoidingView>
//             </SafeAreaView>
//         </TouchableWithoutFeedback>
//     )
// }

// const styles = StyleSheet.create({
//     background: {
//         flex: 1,
//         justifyContent: "center",
//     },
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         backgroundColor: Styles.colors.white,
//     },
//     logoContainer: {
//         alignItems: "center",
//         marginBottom: 20,
//         marginTop: "10%",
//     },
//     logo: {
//         width: 130,
//         height: 130,
//     },
//     formContainer: {
//         flex: 1,
//         justifyContent: "flex-start",
//         alignItems: "center",
//         paddingHorizontal: 20,
//         marginTop: "10%",
//     },
//     form: {
//         width: "100%",
//         maxWidth: 300,
//     },
//     button: {
//         marginTop: 20,
//         width: "100%",
//     },
//     googleButtonContainer: {
//         marginTop: 20,
//         alignItems: "center",
//     },
//     errorText: {
//         color: "red",
//         fontSize: 12,
//         marginTop: 5,
//     },
// })







import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Text,
    TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import AppTextInput from "@/components/AppTextInput";
import AppButton from "@/components/AppButton";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { configureGoogleSignIn } from "../../googleSignInConfig";
import {
    loginCommand,
    signInWithGoogleCommand,
    resendVerificationEmailCommand,
} from "@/commands/auth";
import { useRouter } from "expo-router";
import { Routes } from "@/constants/Routes";
import Snackbar from "react-native-snackbar";
import Styles from "@/constants/Styles";

interface LoginFormInputs {
    email: string;
    password: string;
}

export default function LoginScreen() {
    const router = useRouter();
    const [isResendVisible, setIsResendVisible] = useState(false);
    const [currentEmail, setCurrentEmail] = useState("");

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
        setCurrentEmail(email);

        const success = await loginCommand(email, password);
        if (success.hasError === false) {
            router.push(Routes.HOME);
        } else if (success.message === "Email not verified") {
            setIsResendVisible(true);
        } else {
            setIsResendVisible(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const success = await signInWithGoogleCommand();
        if (success) {
            router.push(Routes.HOME);
        }
    };

    const handleResendVerification = async () => {
        await resendVerificationEmailCommand(currentEmail);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                                    multiline={true}
                                    textContentType="emailAddress"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            )}
                        />
                        {errors.email && (
                            <Text style={styles.errorText}>{errors.email.message}</Text>
                        )}

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
                        {errors.password && (
                            <Text style={styles.errorText}>{errors.password.message}</Text>
                        )}

                        <View style={styles.button}>
                            <AppButton title="Login" onPress={handleSubmit(onSubmit)} />
                        </View>

                        {isResendVisible && (
                            <TouchableOpacity
                                onPress={handleResendVerification}
                                style={styles.resendTextContainer}
                            >
                                <Text style={styles.resendText}>Resend Email</Text>
                            </TouchableOpacity>
                        )}

                        <View style={styles.googleButtonContainer}>
                            <GoogleSigninButton
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Light}
                                onPress={handleGoogleSignIn}
                            />
                        </View>
                    </View>
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
        justifyContent: "center",
        backgroundColor: Styles.colors.white,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 20,
        marginTop: "10%",
    },
    logo: {
        width: 130,
        height: 130,
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
    googleButtonContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
    },
    resendTextContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    resendText: {
        color: Styles.colors.primary,
        fontSize: 16,
        textDecorationLine: "underline",
    },
});
