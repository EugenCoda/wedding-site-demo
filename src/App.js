import React, { useEffect } from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import Main from "./pages/Main";
import Admin from "./pages/Admin";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("appTitle");
  }, [t]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Main />
            </Layout>
          }
        />
        <Route
          path="/:code"
          element={
            <Layout>
              <Main />
            </Layout>
          }
        />
        <Route path={process.env.REACT_APP_ADMIN_URL} element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
