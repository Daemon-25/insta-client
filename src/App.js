import './App.css';
import React from "react";
import Routing from './routes/Routing';
import AuthentificationState from "./contexts/auth/Auth.state"

function App() {
  localStorage.setItem("user", "asdf")
  return (
    <AuthentificationState>
      <Routing/>
    </AuthentificationState>
  );
}

export default App;
