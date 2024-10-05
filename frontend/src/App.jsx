import { Navigate, Route, Routes } from "react-router-dom"
import FloatShape from "./components/FloatShape"
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import EmailVerification from "./pages/EmailVerification";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import DashboardPage from "./pages/DashboardPage";
import ResetPage from "./pages/ResetPage";
import ForgetPage from './pages/forgetPage';

const App = () => {
  const{isCheckingAuth,user,isAuth,checkAuth}=useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  
  
  const ProtectedRoute = ({ children }) => {
    const { isAuth, user } = useAuthStore();
  
    if (!isAuth) {
      return <Navigate to='/login' replace />;
    }
  
    if (!user?.isVerified) {
      return <Navigate to='/verifiy' replace />;
    }
  
    return children;
  };
  const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuth, user } = useAuthStore();
  
    if (isAuth && user?.isVerified) {
      return <Navigate to='/' replace />;
    }
  
    return children;
  };
  return (
    <div className='min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
    <FloatShape color="bg-green-500" size='w-64 h-64' top='-5%' delay={0}/>
    <FloatShape color="bg-emerald-500" size='w-48 h-48' top='70%' delay={5}/>
    <FloatShape color="bg-lime-500" size='w-32 h-32' left={'50%'} top='40%' delay={2}/>
    <Routes>
    <Route path="/" element={user?<DashboardPage user={user}/>:<Navigate to='/login'/>}/>
    <Route
					path='/signup'
					element={
            user?<Navigate to={'/'}/>:
							<SignupPage />
						
					}
				/>
				<Route
					path='/login'
					element={
            user?<Navigate to={'/'}/>:
							<LoginPage />
				
					}
				/>
    <Route path="/verifiy" element={<EmailVerification/>}/>
    <Route path="/forget-password" element={user?<Navigate to={'/'}/>:<ForgetPage/>}/>
    <Route path="/reset-password/:token" element={user?<Navigate to={'/'}/>:<ResetPage/>}/>
    <Route path="*" 
    element={<h1>not fount</h1>}/>

    </Routes>

    </div>
  )
}

export default App;
