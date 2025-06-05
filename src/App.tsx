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
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: 'admin' | 'user' | null;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const userRole = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  
  console.log("🔐 ProtectedRoute check:");
  console.log("- requiredRole:", requiredRole);
  console.log("- userRole from localStorage:", userRole);
  console.log("- token exists:", !!token);
  
  if (!token) {
    console.log("❌ No token, redirecting to home");
    return <Navigate to="/" replace />;
  }
  
  // If no specific role is required, just check if user is authenticated
  if (!requiredRole) {
    console.log("✅ No specific role required, allowing access");
    return <>{children}</>;
  }
  
  // For admin routes, check if user has admin role
  if (requiredRole === 'admin') {
    console.log("🔍 Admin route check - userRole:", userRole, "required: admin");
    // Check if user role is admin (this covers admin, adminRole manager, etc.)
    if (userRole !== 'admin') {
      console.log("❌ User is not admin, redirecting to home");
      return <Navigate to="/" replace />;
    }
    console.log("✅ Admin access granted");
  }
  
  // For user routes, check if user has user role
  if (requiredRole === 'user') {
    console.log("🔍 User route check - userRole:", userRole, "required: user");
    if (userRole !== 'user') {
      console.log("❌ User is not regular user, redirecting to home");
      return <Navigate to="/" replace />;
    }
    console.log("✅ User access granted");
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