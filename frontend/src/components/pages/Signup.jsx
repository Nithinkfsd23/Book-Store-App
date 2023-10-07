import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import BG2 from '../../utils/images/BG2.jpg'

import '../Signup.css';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Swal from 'sweetalert2'
import { CSSTransition } from 'react-transition-group';

const Signup = () => {
  //state variables to store user input
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    roleInputs: "user"
  });
  const [userToken, setUserToken] = useState(sessionStorage.getItem("userToken"))
  const [userRole, setUserrole] = useState(sessionStorage.getItem("userRole"));
  const navigate = useNavigate();


  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(value)
  };
  let data = {

    token: userToken,
    role: userRole,
    name: formData.name,
    email: formData.email,
    username: formData.username,
    password: formData.password,
    roleInputs: formData.roleInputs
  }
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    //  login logic 
    console.log('Form submitted with data:', formData);

    axios.post(`http://localhost:5000/api/postudata`, data)
      .then((response) => {
        if (response.data.message === "User added successfully") {
          Swal.fire('', response.data.message, 'success');
          navigate('/login');
        }
        else {
          Swal.fire('Sorry', response.data.message, '');
        }
      })
      .catch((err) => {
        console.log(err)
      })
  };

  return (
    <div>

      <div style={{ backgroundImage: `url(${BG2})`, backgroundSize: "cover", height: "100vh" }}>
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12"></div>
        </div>

        <Link to='/'>
          <Button class='d-flex' style={{ backgroundColor: '#008080', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '20px', fontSize: '15px', cursor: 'pointer' }}
          >  GO TO HOME
          </Button>
        </Link>
        <div className="signup-box">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <button type="submit">SIGNUP</button>
            </div>
          </form>
        </div>

      </div>
    </div>


  )
}

export default Signup