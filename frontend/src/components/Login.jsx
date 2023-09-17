
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import BG2 from '../BG2.jpg'
import { useState } from 'react'
import './Login.css'



const Login = () => {
  // Create state variables to store user input
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(value)
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here, e.g., send data to the server
    console.log('Form submitted with data:', formData);
  };



  return (
    <div>

      <div style={{ backgroundImage: `url(${BG2})`, backgroundSize: "cover", height: "100vh" }}>
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12"></div>
        </div>

        <Link to='/'>
          <Button class='d-flex' style={{ backgroundColor: '#008080', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '20px', fontSize: '15px', cursor: 'pointer' }}
          >  Go To HOME
          </Button>
        </Link>
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={formData.email}
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
              <button type="submit">Login</button>
            </div>
          </form>
        </div>

      </div>
    </div>


  )
}

export default Login