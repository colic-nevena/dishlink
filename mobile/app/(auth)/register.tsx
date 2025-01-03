// import React, { useState } from "react";
// import { StyleSheet, ImageBackground, SafeAreaView, View, Image, Alert } from "react-native";
// import AppTextInput from "@/components/AppTextInput";
// import AppButton from "@/components/AppButton";

// export default function RegisterScreen() {
//   const [fullName, setFullName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [verifyPassword, setVerifyPassword] = useState("");

//   const handleSubmit = () => {};

//   return (
//     <ImageBackground
//       style={styles.background}
//       source={require("../../assets/images/authScreen.png")}
//     >
//       <SafeAreaView style={styles.container}>
//         <View style={styles.logoContainer}>
//           <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
//         </View>

//         <View style={styles.formContainer}>
//           <AppTextInput
//             multiline={false}
//             icon="account"
//             placeholder="Full Name"
//             autoCapitalize="words"
//             autoCorrect={false}
//             maxLength={50}
//             onChangeText={(text) => setFullName(text)}
//             value={fullName}
//           />

//           <AppTextInput
//             multiline={false}
//             icon="email"
//             placeholder="Email"
//             autoCapitalize="none"
//             autoCorrect={false}
//             keyboardType="email-address"
//             textContentType="emailAddress"
//             maxLength={50}
//             onChangeText={(text) => setEmail(text)}
//             value={email}
//           />

//           <AppTextInput
//             multiline={false}
//             icon="lock"
//             placeholder="Password"
//             autoCapitalize="none"
//             autoCorrect={false}
//             secureTextEntry={true}
//             textContentType="password"
//             maxLength={50}
//             onChangeText={(text) => setPassword(text)}
//             value={password}
//           />

//           <AppTextInput
//             multiline={false}
//             icon="lock"
//             placeholder="Verify Password"
//             autoCapitalize="none"
//             autoCorrect={false}
//             secureTextEntry={true}
//             maxLength={50}
//             onChangeText={(text) => setVerifyPassword(text)}
//             value={verifyPassword}
//           />

//           <View style={styles.button}>
//             <AppButton title="Register" onPress={handleSubmit} />
//           </View>
//         </View>
//       </SafeAreaView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: "flex-start",
//     alignItems: "center",
//   },
//   container: {
//     flex: 1,
//     marginTop: "15%",
//     width: "100%",
//     alignItems: "center",
//   },
//   logoContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//   },
//   formContainer: {
//     width: "80%",
//     maxWidth: 400,
//     marginTop: 15,
//   },
//   button: {
//     marginTop: 20,
//     width: "100%",
//   },
// });


import React, { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView, View, Image, Alert, TouchableOpacity } from "react-native";
import AppTextInput from "@/components/AppTextInput";
import AppButton from "@/components/AppButton";
import { MaterialIcons } from "@expo/vector-icons";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [verifyPasswordVisible, setVerifyPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleVerifyPasswordVisibility = () => setVerifyPasswordVisible(!verifyPasswordVisible);

  const handleSubmit = () => {};

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/images/authScreen.png")}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
        </View>

        <View style={styles.formContainer}>
          <AppTextInput
            multiline={false}
            icon="account"
            placeholder="Full Name"
            autoCapitalize="words"
            autoCorrect={false}
            maxLength={50}
            onChangeText={(text) => setFullName(text)}
            value={fullName}
          />

          <AppTextInput
            multiline={false}
            icon="email"
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            maxLength={50}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

          <View style={styles.passwordContainer}>
            <AppTextInput
              multiline={false}
              icon="lock"
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!passwordVisible}
              textContentType="password"
              maxLength={50}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityToggle}>
              <MaterialIcons
                name={passwordVisible ? "visibility" : "visibility-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            <AppTextInput
              multiline={false}
              icon="lock"
              placeholder="Verify Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!verifyPasswordVisible}
              maxLength={50}
              onChangeText={(text) => setVerifyPassword(text)}
              value={verifyPassword}
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

          <View style={styles.button}>
            <AppButton title="Register" onPress={handleSubmit} />
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
    marginTop: "15%",
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
});
