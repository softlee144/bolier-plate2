import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./_reducers";
import App from "./App";
import axios from "axios";
axios.defaults.withCredentials = true; // 모든 요청에 쿠키 포함되도록 설정

const store = configureStore({
  reducer: rootReducer,
  devTools: true, // thunk는 기본 내장이라 별도 설정 불필요
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
