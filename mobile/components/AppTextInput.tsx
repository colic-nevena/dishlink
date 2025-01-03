import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { View, StyleSheet, TextInput, KeyboardTypeOptions } from 'react-native'
import defaultStyles from "../constants/Styles"
import Styles from '../constants/Styles';

interface Props {
    icon?: any;
    placeholder: string;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
    autoCorrect?: boolean;
    keyboardType?: KeyboardTypeOptions | undefined;
    textContentType?: any;
    secureTextEntry?: boolean;
    maxLength?: number;
    multiline: boolean;
    numberOfLines?: number;
    width?: number;
    onChangeText: (text: string) => void;
    onBlur?: () => void;
    value: string;
}

export default function AppTextInput(props: Props) {
    return (
        <View style={[styles.container, { width: props.width || "100%" }]}>
            {props.icon && <MaterialCommunityIcons style={styles.icon} name={props.icon} size={20} color={defaultStyles.colors.mediumGrey} />}

            <TextInput
                placeholderTextColor={defaultStyles.colors.mediumGrey}
                style={defaultStyles.text}
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 35,
        borderColor: Styles.colors.mediumGrey,
        borderWidth: 1,
        flexDirection: "row",
        marginVertical: 10,
        paddingRight: 10
    },
    icon: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 12
    }
})