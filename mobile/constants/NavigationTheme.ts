import { DefaultTheme } from "@react-navigation/native"
import colors from "./Colors"

const myTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.primary,
        background: colors.white
    }
}

export default myTheme;