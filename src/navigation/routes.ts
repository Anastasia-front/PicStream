import { StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import { Feather } from "@expo/vector-icons";

import {
  CommentsScreen,
  HomeScreen,
  LoginScreen,
  MapScreen,
  RegistrationScreen,
} from "@screens";

import { globalVariables } from "@styles";

const styles = StyleSheet.create({
  header: {
    colorPrimary: globalVariables.color.black,
    secondaryColor: globalVariables.color.grey,
  },
  headerTitle: {
    flex: 1,
    marginTop: 9,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: globalVariables.font.weight.medium,
    fontSize: globalVariables.font.size.lg,
  },
  headerContainerItem: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 11,
    paddingHorizontal: 16,
  },
});

const MainStack = createStackNavigator();

const screenOptions = ({ navigation }) => ({
  headerShown: true,
  headerTintColor: styles.header.colorPrimary,
  headerTitleAlign: styles.headerTitle.alignItems,
  headerTitleStyle: styles.headerTitle,
  headerTitleContainerStyle: styles.headerContainerItem,
  headerRightContainerStyle: styles.headerContainerItem,
  headerLeftContainerStyle: styles.headerContainerItem,
  headerLeft: () => (
    <Feather
      name="arrow-left"
      size={24}
      color={styles.header.secondaryColor}
      onPress={navigation.goBack}
    />
  ),
});

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator
        initialRouteName="Login"
        screenOptions={screenOptions}
      >
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </MainStack.Navigator>
    );
  }

  return (
    <MainStack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <MainStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerRight: null,
        }}
      />

      <MainStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
          headerRight: null,
        }}
      />
    </MainStack.Navigator>
  );
};
