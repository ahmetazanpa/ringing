import React, { Suspense } from "react";
import AppRoutes from "./routes";
import { HashRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<CircularProgress />}>
        <Router>
          <AppRoutes />
        </Router>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
