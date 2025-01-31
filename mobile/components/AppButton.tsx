import React, { forwardRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'
import colors from '@/constants/Colors'

interface AppButtonProps extends TouchableOpacityProps {
    title: string
    color?: string
    size?: 'small' | 'medium' | 'large'
}

const AppButton = forwardRef<any, AppButtonProps>(
    ({ title, color = colors.primary, size = 'large', style, ...props }, ref) => {
        const sizeStyles = getSizeStyles(size)

        return (
            <TouchableOpacity
                ref={ref}
                style={[styles.button, sizeStyles.button, { backgroundColor: color }, style]}
                {...props}
            >
                <Text style={[styles.text, sizeStyles.text]}>{title}</Text>
            </TouchableOpacity>
        )
    }
)

const getSizeStyles = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
        case 'small':
            return {
                button: {
                    padding: 6,
                    borderRadius: 20,
                    width: '50%' as ViewStyle['width'],
                },
                text: {
                    fontSize: 14,
                },
            }
        case 'medium':
            return {
                button: {
                    padding: 8,
                    borderRadius: 22,
                    width: '75%' as ViewStyle['width'],
                },
                text: {
                    fontSize: 16,
                },
            }
        case 'large':
        default:
            return {
                button: {
                    padding: 10,
                    borderRadius: 25,
                    width: '100%' as ViewStyle['width'],
                },
                text: {
                    fontSize: 18,
                },
            }
    }
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    text: {
        color: colors.white,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
})

export default AppButton