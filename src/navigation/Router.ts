import { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { authStateChangeUser, selectStateChange } from "@redux";
import { useDispatch, useSelector } from "react-redux";

import { useRoute } from "@navigation";

export const Router = () => {
  const stateChange = useSelector(selectStateChange);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return (
    <NavigationContainer independent={true}>{routing}</NavigationContainer>
  );
};
