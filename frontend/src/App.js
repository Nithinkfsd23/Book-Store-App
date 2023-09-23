import { Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminHome from './components/AdminHome';
import UserHome from './components/UserHome';

function App() {
  return (
    <div className="App">
     <Routes>
    <Route path='/' element ={<Home/>}/>
    <Route path='/login' element={<Login/>}/>

    <Route path='/signup' element={<Signup/>}/>
    <Route path='/ahome' element={<AdminHome/>}/>
    <Route path='/uhome' element={<UserHome/>}/>

     </Routes>
    </div>
  );
}

export default App;
