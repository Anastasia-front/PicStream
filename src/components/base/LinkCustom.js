import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { globalVariables } from "@styles";

export const LinkCustom = ({ top, left, color, text, onPress }) => {
  const linkStyle = StyleSheet.compose(styles.link, {
    paddingTop: top,
    paddingLeft: left,
    color,
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={linkStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    textDecorationLine: globalVariables.textDecoration,
  },
});
