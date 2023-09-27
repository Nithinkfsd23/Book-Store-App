import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import AdminHome from './components/pages/AdminHome';
import UserHome from './components/pages/UserHome';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/ahome' element={<AdminHome />} />
        <Route path='/uhome' element={<UserHome />} />

      </Routes>
    </div>
  );
}

export default App;
