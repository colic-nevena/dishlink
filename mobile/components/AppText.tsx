import React from 'react'
import { Text } from 'react-native'
import defaultStyles from "../constants/Styles"

interface Props {
    text: string;
    style?: object;
    numberOfLines?: number
}

export default function AppText(props: Props) {
    return (
        <Text style={[defaultStyles.text, props.style]} {...props}>
            {props.text}
        </Text>
    )
}