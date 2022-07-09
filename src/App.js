import './App.css';
import React from "react";
import Routing from './routes/Routing';
import AuthentificationState from "./contexts/auth/Auth.state"

function App() {
  return (
    <AuthentificationState>
      <Routing/>
    </AuthentificationState>
  );
}

export default App;
