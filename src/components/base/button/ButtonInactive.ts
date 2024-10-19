import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { globalVariables } from "@styles";

export const ButtonInactive = ({ text, width, onPress }) => {
  const buttonStyle = StyleSheet.compose(style.btn, {
    width: width,
  });
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={style.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  btn: {
    backgroundColor: globalVariables.color.lightGrey1,
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
    color: globalVariables.color.lightGrey3,
  },
});
