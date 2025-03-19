import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/landing/page'
import Dashboard from './pages/dashboard/page'

function App() {

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
   </Router>
  )
}

export default App
