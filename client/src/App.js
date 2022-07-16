import Axios from 'axios'
import { BrowserRouter, Routes, Route, Link,  } from "react-router-dom"
import ProtectedRoutes from './components/ProtectedRoutes';
import Login from './views/Login';
import Signup from './views/Signup';
import Dashboard from './views/Dashboard'
import {AuthContext} from './context/AuthProvider';
import { useState, useContext } from 'react';


function App() {
  const [isAuth, setAuth] = useState()

  return (
    <AuthContext.Provider value={{isAuth, setAuth}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Login />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
 
  );
}

export default App;
