import { Nevigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

const PrivateRoute = ({children}) => {
    const loggedIn= useAuthStore((state)=>state.isLoggedIn)

    return loggedIn? <>{children}</> : <Nevigate to="/login"/>
 
}

export default PrivateRoute