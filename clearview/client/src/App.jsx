import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Project from './pages/Project.jsx'
import Auth from './pages/Auth.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/auth" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path="/project/:id" element={<PrivateRoute><Project/></PrivateRoute>} />
        <Route path="/auth" element={<Auth/>} />
      </Routes>
    </AuthProvider>
  )
}
