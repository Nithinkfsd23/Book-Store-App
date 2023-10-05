import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import AdminAdd from './components/pages/AdminAdd';
import UserHome from './components/pages/UserHome';
import AdminHome from './components/pages/AdminHome';
import Main from './components/pages/Main';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='/uhome' element={<UserHome />} />
        <Route path="/ahome" element={<Main child={<AdminHome />} />} />
        <Route path="/aadd" element={<Main child={<AdminAdd method="post" data={
          {
            name: "",
            email: "",
            username: "",
            password: "",
            roleInputs: "user"
          }
        } />} />} />
      </Routes>
    </div>
  );
}

export default App;
