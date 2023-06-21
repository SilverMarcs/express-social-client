import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode); // we use useSelector to get the mode from the state from the store
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // we use useMemo to create the theme based on the mode
  const isAuth = useSelector((state) => state.token); // we use useSelector to get the isAuth from the state from the store. used below to protect the homepage and profile page routes. token is null if the user is not logged in

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* CssBaseline is used to reset the css */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
