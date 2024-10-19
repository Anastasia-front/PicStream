import { StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import { ListPosts } from "@components";

import { globalVariables } from "@styles";

const PostStack = createStackNavigator();

const screenOptions = () => ({
  ...styles,
  title: "Публікації",
  headerRight: () => {},
});

export const PostsScreen = () => {
  return (
    <PostStack.Navigator screenOptions={screenOptions}>
      <PostStack.Screen name="Posts" component={ListPosts} />
    </PostStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTintColor: globalVariables.color.black,
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontWeight: globalVariables.font.weight.medium,
    fontSize: globalVariables.font.size.md,
  },
  headerTitleContainerStyle: {
    justifyContent: "flex-end",
    paddingBottom: 11,
    paddingHorizontal: 16,
  },
  headerRightContainerStyle: {
    justifyContent: "flex-end",
    paddingBottom: 11,
    paddingHorizontal: 16,
  },
  headerLeftContainerStyle: {
    justifyContent: "flex-end",
    paddingBottom: 11,
    paddingHorizontal: 16,
  },
});
