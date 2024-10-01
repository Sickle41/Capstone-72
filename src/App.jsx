import { useState } from 'react'
import { ApplicationViews } from './views/ApplicationViews'
import { Routes, Route} from "react-router-dom"
import './App.css'

function App() {

  return (
    <Routes>
      <Route 
      path="*"
      element= {
        <ApplicationViews />
      }
    />
    </Routes>
  )
}

export default App
