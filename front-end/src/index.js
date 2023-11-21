import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import {
  BrowserRouter
} from "react-router-dom";
import App from "./App";
import { Provider } from 'react-redux';
import store from './store';


const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>

      <BrowserRouter>
        <App />
      </BrowserRouter>

    </Provider>


  </StrictMode>
);