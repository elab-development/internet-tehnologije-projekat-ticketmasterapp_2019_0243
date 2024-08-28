import React from "react";
import "./App.css";
import { AuthProvider } from "./context/auth-context";
import { AxiosProvider } from "./context/axios-context";
import MainContent from "./components/MainContent/MainContent";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AxiosProvider>
        <MainContent />
      </AxiosProvider>
    </AuthProvider>
  );
};

export default App;
