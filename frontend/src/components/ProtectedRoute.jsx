import { Navigate } from 'react-router-dom'
import { useAuth } from '../utils/auth-context'

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="container" style={{ padding: '80px 0' }}>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />
  }

  return children
}
