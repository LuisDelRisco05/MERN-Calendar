import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPages } from "../calendar";
import { useAuthStore } from "../hooks";



export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, [])
  

  if( status === 'checking' ){
    return (
      <h3>Loading..</h3>
    )
  }

  return (
    <>
        <Routes>
            {
                ( status === 'not-authenticated' ) 
                ? ( //* publicas
                      <>
                          <Route path="/auth/*" element={ <LoginPage />} />  
                          <Route path="/*" element={ <Navigate to="/auth/login" />} />
                      </>
                  )            
                : ( //* privadas
                      <>
                          <Route path="/calendar" element={ <CalendarPages/>} />
                          <Route path="/*" element={ <Navigate to="/calendar" />} />
                      </>
                  )
            }
            
        </Routes>
    </>
  )
}
