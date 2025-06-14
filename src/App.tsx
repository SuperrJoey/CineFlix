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
import { useEffect, useState } from 'react'
import Signin from './pages/auth/Login'
import Register from './pages/auth/Register'
import AuthLayout from './pages/authLayout/page'
import BookingPage from './pages/BookingPage'
import AdminBookingView from './pages/adminBookingView'

// Protected route component
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole: 'admin' | 'user' }) => {
  const userRole = localStorage.getItem('user');
  
  if (requiredRole === 'admin') {
    const isAdmin = userRole === 'admin';
    if (!isAdmin) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  }
  
  if (requiredRole === 'user') {
    const isUser = userRole === 'user';
    if (!isUser) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  }
  
  return <>{children}</>;
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
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      // Variables were being set but not used, so removed them
    }
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
        
        {/* User booking route */}
        <Route path="/booking/:screenId/:showtimeId" element={
          <ProtectedRoute requiredRole="user">
            <BookingPage/>
          </ProtectedRoute>
        } />
        
        {/* Admin booking view route */}
        <Route path="/admin/booking/:screenId/:showtimeId" element={
          <ProtectedRoute requiredRole="admin">
            <AdminBookingView/>
          </ProtectedRoute>
        } />
        
        {/* Admin-only routes */}
        <Route path="/staff" element={
          <ProtectedRoute requiredRole="admin">
            <Staff/>
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