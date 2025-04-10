import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/landing/page'
import Dashboard from './pages/dashboard/page'
import ClientDashboard from './pages/clientDashboard/page'
import { Movies } from './pages/movies/page'
import {MovieDetails} from './pages/movies/movieDetails'
import Seats from './pages/seats/page'
import Staff from './pages/staff/page'
import Header from './components/Header'
import Customer from './pages/customer/page'
import Report from './pages/report/page'
import Maintenance from './pages/maintenance/page'
import { useEffect, useState } from 'react'
import Signin from './pages/auth/Login'
import Register from './pages/auth/Register'
import AuthLayout from './pages/authLayout/page'

// Protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: 'admin' | 'user' | null;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const userRole = localStorage.getItem('user');
  
  if (!localStorage.getItem('token')) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

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
  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    const role = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    console.log("from useEffect- ",localStorage.getItem('user'));
    console.log("from useEffect - ", localStorage.getItem('token'));

    setUserRole(role);
  }, []);

  return (
   <Router>
    <Routes>
      {/* Public routes without header */}
      <Route element={<DefaultLayout/>}>
        <Route path="/" element={<Home/>} />
      </Route>

      {/* Auth routes */}
      <Route element={<AuthLayout/>}>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/register' element={<Register/>}/>
      </Route>

      {/* All routes that need header */}
      <Route element={<HeaderLayout/>}>
        {/* Admin Dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute requiredRole="admin">
            <Dashboard/>
          </ProtectedRoute>
        } />
        
        {/* Client Dashboard */}
        <Route path="/client-dashboard" element={
          <ProtectedRoute requiredRole="user">
            <ClientDashboard/>
          </ProtectedRoute>
        } />

        <Route path="/movies" element={<Movies/>} />
        <Route path="/movies/:id" element={<MovieDetails/>} />
        <Route path="/seats" element={<Seats/>} />
        
        {/* Admin-only routes */}
        <Route path="/staff" element={
          <ProtectedRoute requiredRole="admin">
            <Staff/>
          </ProtectedRoute>
        } />
        <Route path="/maintenance" element={
          <ProtectedRoute requiredRole="admin">
            <Maintenance/>
          </ProtectedRoute>
        } />
        <Route path="/report" element={
          <ProtectedRoute requiredRole="admin">
            <Report/>
          </ProtectedRoute>
        } />
        
        <Route path="/customer" element={<Customer/>} />
      </Route>
    </Routes>
   </Router>
  )
}

export default App