import React, { useState } from "react";

import { StyleSheet, TextInput, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { globalVariables } from "@styles";

export const InputComment = ({
  handleButtonClick,
  inputValue,
  setInputValue,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  return (
    <>
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        value={inputValue}
        onChangeText={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Коментувати..."
      />
      <View style={styles.arrowContainer}>
        <Ionicons
          name="arrow-up"
          size={25}
          color={globalVariables.color.white}
          style={styles.arrow}
          onPress={handleButtonClick}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 50,
    paddingLeft: 16,
    marginBottom: 16,
    backgroundColor: globalVariables.color.lightGrey1,
    borderColor: globalVariables.color.lightGrey2,
    borderWidth: globalVariables.border.main,
    borderRadius: globalVariables.radius.input,
  },
  inputFocused: {
    backgroundColor: globalVariables.color.white,
    borderColor: globalVariables.color.green,
  },
  arrowContainer: {
    width: 34,
    height: 34,
    backgroundColor: globalVariables.color.violet,
    borderRadius: globalVariables.radius.circle,
    position: "absolute",
    top: 10,
    right: 10,
  },
  arrow: {
    position: "absolute",
    top: 4,
    right: 4,
  },
});
