import { useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from "react-native";

import { globalVariables } from "@styles";

export const InputCreatePost = ({ placeholder, onChangeText, value }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: globalVariables.containerPercent.full,
    height: 50,
    paddingLeft: 36,
    marginBottom: 16,
    backgroundColor: globalVariables.color.white,
    borderBottomColor: globalVariables.color.lightGrey2,
    borderBottomWidth: 1,
    borderRadius: globalVariables.radius.main,
  },
  inputFocused: {
    borderBottomColor: globalVariables.color.green,
  },
});
