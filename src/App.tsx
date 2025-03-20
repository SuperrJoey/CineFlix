import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/landing/page'
import Dashboard from './pages/dashboard/page'
import Movies from './pages/movies/page'
import Seats from './pages/seats/page'
import Staff from './pages/staff/page'

function App() {

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/movies" element={<Movies/>} />
      <Route path="/seats" element={<Seats/>} />
      <Route path="/staff" element={<Staff/>} />

    </Routes>
   </Router>
  )
}

export default App
