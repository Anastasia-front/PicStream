import { Alert } from "react-native";

import { authSignOutUser } from "@redux";

export const exit = (dispatch) => {
  Alert.alert("Підтвердження!", "Ви дійсно хочете вийти з додатку?", [
    {
      text: "Ні",
      onPress: () => console.log("Cancel"),
    },
    {
      text: "Так",
      onPress: () => {
        dispatch(authSignOutUser());
      },
    },
  ]);
};
