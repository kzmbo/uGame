import Axios from 'axios'
import { BrowserRouter, Routes, Route, Link,  } from "react-router-dom"
import Login from './views/Login';
import Signup from './views/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<Login />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
