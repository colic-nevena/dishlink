import Toast, { BaseToast, ErrorToast, ToastConfigParams } from "react-native-toast-message"

const toastConfig = {
    success: (props: ToastConfigParams<any>) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: "#8BC34A",
                backgroundColor: "#8BC34A",
            }}
            contentContainerStyle={{ flexWrap: "wrap" }}
            text1Style={{
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: "bold",
                flexWrap: "wrap",
            }}
            text1NumberOfLines={0}
        />
    ),
    error: (props: ToastConfigParams<any>) => (
        <ErrorToast
            {...props}
            style={{
                borderLeftColor: "#FF5252",
                backgroundColor: "#FF5252",
            }}
            contentContainerStyle={{ flexWrap: "wrap" }}
            text1Style={{
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: "bold",
                flexWrap: "wrap",
            }}
            text1NumberOfLines={0}
        />
    ),
}

const AppToast = () => {
    return <Toast config={toastConfig} />
}

export default AppToast