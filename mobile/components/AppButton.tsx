import React, { forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import colors from '@/constants/Colors';

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  color?: string;
}

const AppButton = forwardRef<any, AppButtonProps>(({ title, color = colors.primary, style, ...props }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      style={[styles.button, { backgroundColor: color }, style]}
      {...props}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 13,
    width: '100%',
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default AppButton;