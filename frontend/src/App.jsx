import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Dashboard from "./pages/Dashboard";
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-black p-6">
      <Dashboard />
    </div>
  );
}

export default App;