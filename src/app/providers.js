"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import { store } from "./store/store";

export function Providers({ children }) {

  return (
    <Provider store={store}>
      <ThemeWrapper>
        {children}
      </ThemeWrapper>
    </Provider>
  )
}

function ThemeWrapper({ children }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return children;
}