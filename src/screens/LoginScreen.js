import { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { authSignInUser, authStateChange } from "@redux";
import { useDispatch } from "react-redux";

import {
  ButtonCustom,
  Input,
  LinkCustom,
  Loader,
  OverlayImage,
  Title,
} from "@components";

import {
  useKeyboardListener,
  usePasswordVisibility,
  validateEmail,
  validatePassword,
} from "@utils";

import { globalVariables } from "@styles";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { keyboardHeight } = useKeyboardListener(100);

  const [isShowLoader, setIsShowLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const { showPassword, hidden, togglePasswordVisibility } =
    usePasswordVisibility(false, password);

  const handleSubmit = () => {
    validateEmail(email, setValidationError);
    validatePassword(password, setValidationError);

    if (
      (validationError === "" || !validationError) &&
      password !== "" &&
      email !== ""
    ) {
      setIsShowLoader(true);
      dispatch(authSignInUser(email, password)).then((data) => {
        if (data === undefined || !data.user) {
          setIsShowLoader(false);
          alert(`Вхід не виконано!`);
          return;
        }
        dispatch(authStateChange({ stateChange: true }));
      });
    }
  };

  if (isShowLoader) {
    return <Loader />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../images/background/seaSunset.jpg")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View
            style={[styles.overlayContainer, { paddingBottom: keyboardHeight }]}
          >
            <OverlayImage top={535} />
            <View style={styles.formContainer}>
              <Title title={"Увійти"} top={200} />
              <View style={{ paddingBottom: keyboardHeight }}>
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                  <Input
                    inputMode="email"
                    placeholder="Адреса електронної пошти"
                    value={email}
                    onChangeText={setEmail}
                    onBlur={validateEmail}
                  />
                  <Input
                    inputMode="text"
                    placeholder="Пароль"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    onBlur={validatePassword}
                    style={{ position: "relative" }}
                  />
                  <TouchableOpacity
                    style={{ position: "absolute", top: 82, right: 20 }}
                    onPress={togglePasswordVisibility}
                  >
                    <Text style={{ color: hidden }}>
                      {showPassword ? "Сховати" : "Показати"}
                    </Text>
                  </TouchableOpacity>
                </KeyboardAvoidingView>
              </View>

              <ButtonCustom
                color={globalVariables.color.orangeMain}
                width={343}
                text="Увійти"
                onPress={handleSubmit}
              />
              <View style={styles.text}>
                <Text style={styles.textColor}>Немає акаунту?</Text>
                <LinkCustom
                  color={globalVariables.color.blue}
                  top={0}
                  left={10}
                  text="Зареєструватися"
                  onPress={() => navigation.navigate("Registration")}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFill,
  },
  imageBackground: {
    flex: 1,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    position: "absolute",
    top: 32,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textColor: {
    color: globalVariables.color.blue,
  },
});
