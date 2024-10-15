import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { globalVariables } from "@styles";

export const ButtonCustom = ({ text, width, onPress }) => {
  const buttonStyle = StyleSheet.compose(styles.btn, {
    width: width,
  });
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: globalVariables.color.green,
    borderRadius: globalVariables.radius.button,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    marginVertical: 16,
  },
  text: {
    textAlign: "center",
    fontWeight: globalVariables.font.weight.normal,
    fontSize: globalVariables.font.size.md,
    color: globalVariables.color.white,
  },
});
