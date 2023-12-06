import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import PlayerPage from "scenes/playerPage";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import RegisterForm from "scenes/loginPage/RegisterForm";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  console.log("isAUth", isAuth );
  const state = useSelector((state) => state);
  console.log("state", state);
  

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/home"
              {...console.log("isAuth", isAuth)}
              element={isAuth ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route path="/" element={isAuth ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/login" element={isAuth ? <HomePage /> : <LoginPage />} />
            <Route path="/register" element={isAuth ? <HomePage /> : <RegisterForm />} />
            <Route path="/players/:playerId" element={isAuth ? <PlayerPage /> : <Navigate to="/login" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
