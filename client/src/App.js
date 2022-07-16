import Axios from 'axios'
import { BrowserRouter, Routes, Route, Link,  } from "react-router-dom"
import ProtectedRoutes from './components/ProtectedRoutes';
import Login from './views/Login';
import Signup from './views/Signup';
import Dashboard from './views/Dashboard'
import UserPersistance from './components/UserPersistance';
import { AuthContext } from './context/AuthProvider';
import { useState, useContext } from 'react';


function App() {
  const [authUser, setAuth] = useState({})
  Axios.defaults.withCredentials = true

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{authUser, setAuth}}>
        <Routes>
          
          <Route path='/' index element={<Login />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />} />

          <Route element={<UserPersistance />}>
            <Route element={<ProtectedRoutes />}>
              <Route path='/dashboard' element={<Dashboard />}/>
            </Route>
          </Route>

        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
 
 
  );
}

export default App;
