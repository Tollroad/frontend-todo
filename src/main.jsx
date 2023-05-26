import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

export const server = "https://todo-app-4djd.onrender.com/api/v1";

export const Context = createContext({ isAuthenticated: false });

const AppWraper = () => {
  const [isAuthenticated,setisAuthenticated] = useState(false);
  return (
    <Context.Provider value = {{
      isAuthenticated,
      setisAuthenticated
    }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWraper/>
  </React.StrictMode>
);
