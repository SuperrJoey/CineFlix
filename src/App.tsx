import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import Home from './pages/landing/page'
import Dashboard from './pages/dashboard/page'
import Movies from './pages/movies/page'
import Seats from './pages/seats/page'
import Staff from './pages/staff/page'
import Header from './components/Header'
import Customer from './pages/customer/page'
import Report from './pages/report/page'
import Maintenance from './pages/maintenance/page'


const HeaderLayout = () => {
  return (
    <>
      <Header />
      <Outlet />

    
    </>
  );
}

const DefaultLayout = () => {
  return <Outlet />
}


function App() {

  return (
   <Router>
    <Routes>
      <Route element={<DefaultLayout/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Route>

      <Route element={<HeaderLayout/>}>
        <Route path="/movies" element={<Movies/>} />
        <Route path="/seats" element={<Seats/>} />
        <Route path="/staff" element={<Staff/>} />
        <Route path="/customer" element={<Customer/>} />
        <Route path="/maintenance" element={<Maintenance/>} />
        <Route path="/report" element={<Report/>} />
      </Route>

    </Routes>
   </Router>
  )
}

export default App
