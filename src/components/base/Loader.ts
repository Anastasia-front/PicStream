import { View, ActivityIndicator, StyleSheet } from "react-native";

import { globalVariables } from "@styles";

export const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={styles.loader.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  loader: {
    color: globalVariables.color.green,
  },
});
