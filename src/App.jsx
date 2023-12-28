import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import 'animate.css'
import Home from './pages/Home'
import AppRouter from './router/AppRouter';
import { AuthContext, AuthProvider } from './components/User/AuthContext';


// import './css/App.css'

function App() {
  const { initializationDone } = useContext(AuthContext);
  if (!initializationDone) {
    return ; 
  }


  return (
    <AppRouter />

  )
}

export default App
