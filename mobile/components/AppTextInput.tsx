import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import defaultStyles from "../constants/Styles";
import Styles from "../constants/Styles";

interface Props {
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  placeholder: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  textContentType?:
    | "none"
    | "URL"
    | "emailAddress"
    | "password"
    | "telephoneNumber"
    | "username";
  secureTextEntry?: boolean;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  width?: number | "auto";
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  value: string;
}

const AppTextInput: React.FC<Props> = React.memo((props) => {
  const { icon, placeholder, width = "auto", ...otherProps } = props;

  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          style={styles.icon}
          name={icon}
          size={20}
          color={defaultStyles.colors.mediumGrey}
        />
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={defaultStyles.colors.mediumGrey}
        style={[defaultStyles.text, styles.text]}
        {...otherProps}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 35,
    borderColor: Styles.colors.mediumGrey,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
});

export default AppTextInput;
