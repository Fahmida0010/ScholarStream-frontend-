import { Navigate } from 'react-router'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../components/Shared/LoadingSpinner/LoadingSpinner'


const ModeratorRoute = ({ children }) => {

  const { role, loading } = useRole()  

  if (loading) return <LoadingSpinner />

  if (role === 'moderator') return children

  return <Navigate to='/' replace />
}

export default ModeratorRoute;
