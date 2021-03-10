import React, { createContext, useContext } from "react";
import useReducerWithSideEffects, {
  UpdateWithSideEffect,
} from "use-reducer-with-side-effects";
import { getStorageItem, setStorageItem } from "utils/useLocalStorage";

const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

export const setToken = (token) => ({ type: SET_TOKEN, payload: token });
export const deleteToken = () => ({ type: DELETE_TOKEN });

const reducer = (prevState, action) => {
  const { type, payload: jwtToken } = action;
  switch (type) {
    case SET_TOKEN:
      return UpdateWithSideEffect({ ...prevState, jwtToken }, () => {
        setStorageItem("jwtToken", jwtToken);
      });
    case DELETE_TOKEN:
      return UpdateWithSideEffect({ ...prevState, jwtToken: "" }, () => {
        setStorageItem("jwtToken", "");
      });
    default:
      return prevState;
  }
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [store, dispatch] = useReducerWithSideEffects(reducer, {
    jwtToken: getStorageItem("jwtToken", ""),
  });
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
