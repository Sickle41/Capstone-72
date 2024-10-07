
import { ApplicationViews } from './views/ApplicationViews'
import { Routes, Route} from "react-router-dom"
import './App.css'
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { AddNewScheme } from './components/paintScheme/PaintScheme'

function App() {

  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/add-new-scheme' element={<AddNewScheme />} />

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
