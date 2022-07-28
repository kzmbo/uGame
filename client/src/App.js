import Axios from 'axios'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import ProtectedRoutes from './components/ProtectedRoutes';
import Login from './views/Login';
import Signup from './views/Signup';
import Dashboard from './views/Dashboard'
import UserPersistance from './components/UserPersistance';
import { AuthContext } from './context/AuthProvider';
import { useState, useContext } from 'react';


function App() {
  
  /*
    authUser : {
      userID (String),
      sid (String),
      user ({..} see user.js in server/models/)
    }
  */
  const [authUser, setAuth] = useState({})

  let { userID } = useParams()
  userID = authUser.userID
  Axios.defaults.withCredentials = true


  /* 
    Checks if user has logged in for the past 30 mins
    If so, log user back to the dashboard page
    If not, redirect them to the login page
  */
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{authUser, setAuth}}>
        <Routes>
          <Route path='/' index element={<UserPersistance />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />} />

          <Route element={<UserPersistance />}>
            <Route element={<ProtectedRoutes />}>
              <Route path='/dashboard/:userID' element={<Dashboard />}/>
            </Route>
          </Route>

          <Route path='*' element={<UserPersistance />} />

        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
 
 
  );
}

export default App;
