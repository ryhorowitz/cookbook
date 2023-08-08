import React, { useContext, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AppContext from './AppContext'
import Login from "./components/Login";
function App() {
  const { user, setUser } = useContext(AppContext)
  const navigate = useNavigate()
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
