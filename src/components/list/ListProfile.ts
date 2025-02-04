import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { PostProfile } from "@components";

import { globalVariables } from "@styles";

export const ListProfile = ({ navigation, posts, route }) => {
  if (posts.length === 0) {
    return (
      <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 20 }}>
        <Text style={styles.text}>
          Зараз у тебе немає публікацій, але ти можеш їх створити - тисни на цю
          кнопку👇🏻
        </Text>

        <TouchableOpacity
          style={styles.buttonCapture}
          onPress={() => navigation.navigate("Create")}
        >
          <MaterialIcons
            name="add"
            size={24}
            color={globalVariables.color.white}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.paddingBottom}
      data={posts}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <PostProfile post={item} navigation={navigation} route={route} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 24,
  },
  paddingBottom: {
    paddingBottom: 200,
  },
  text: { textAlign: "center" },
  buttonCapture: {
    marginTop: 30,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: globalVariables.radius.circle,
    backgroundColor: globalVariables.color.green,
  },
});
