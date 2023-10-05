import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import '../AdminAdd.css';
import addUser from '../../utils/images/addUser.jpg'


import { CSSTransition } from 'react-transition-group';
 

const AdminAdd = (props) => {
  // console.log("props data", props.data);
  const [inputs, setInputs] = useState(props.data);
  const [userToken, setUserToken] = useState(sessionStorage.getItem("userToken"))
  const [userID, setUserID] = useState(sessionStorage.getItem("userId"))
  const [userRole, setUserrole] = useState(sessionStorage.getItem("userRole"));
  const navigate = useNavigate();

  const [showHeader, setShowHeader] = useState(false);


  useEffect(() => {
    setShowHeader(true);
  }, []);


  // to display form validation warning
  const [displayNamewarn, setDisplayNamewarn] = useState(false);
  const [displayEmailwarn, setDisplayEmailwarn] = useState(false);
  const [displayUwarn, setDisplayUwarn] = useState(false);
  const [displayPwarn, setDisplayPwarn] = useState(false);


  

  // to handle inputs from the form
  const inputHandler = (e) => {
    setDisplayNamewarn(false);
    setDisplayEmailwarn(false);
    setDisplayUwarn(false);
    setDisplayPwarn(false);

    const { name, value } = e.target;
   
      setInputs({
        ...inputs, [name]: value
      });
    

    console.log(inputs);
  }
  

  // function to handle inputs when submit button is clicked
  const submitHandler = () => {
    
    let data = {
      userId: userID,
      token: userToken,
      role: userRole,
      name: inputs.name,
      email: inputs.email,
      username: inputs.username,
      password: inputs.password,
      roleInputs:inputs.roleInputs
    }
    // post function
    if (props.method === "post") {
      axios.post(`http://localhost:5000/api/postudata`, data)
        .then((response) => {
          if (response.data.message === "User added successfully") {
            Swal.fire('', response.data.message, 'success');
            navigate('/ahome');
          }
          else {
            Swal.fire('Sorry', response.data.message, '');
          }
        })
        .catch((err) => { console.log(err) })
    }
    // update function
    if (props.method === "put") {
      axios.put(`http://localhost:5000/api/putudata/${inputs._id}`, inputs)
        .then((response) => {
          if (response.data.message === "Updated successfully") {
            Swal.fire('', response.data.message, 'success');
            window.location.reload(false);
          }
          else {
            Swal.fire('Sorry', response.data.message, '');
          }
        })
        .catch((err) => { console.log(err) })
    }
  }



  return (
    
      <div style={{ backgroundImage: `url(${addUser})`, backgroundSize: "cover", height: "120vh" }}>
      <div className="row">
        <div className="col col-12 col-sm-12 col-md-12 col-lg-12"></div>
      {/* Users Form */}
      <div className="container-form mt-5 pt-5">
        {/* Form header */}
        <CSSTransition
        in={showHeader}
        timeout={500} // Duration of the animation in milliseconds
        classNames="fade" // Define your animation class
        unmountOnExit
      >
        <h3 className="form-header">ADD USERS</h3>
      </CSSTransition>
        <br></br>
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row g-1">
              
             


              {/* Name */}
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <div className="row">
                  <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                    <label htmlFor="name" className="form-label">Name:</label>
                  </div>
                  <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                    <input type="text"
                      id="name"
                      className="form-control"
                      name="name"
                      placeholder="Enter name"
                      value={inputs.name}
                      onChange={inputHandler}
                    />
                    {displayNamewarn ? <p className="fw-light fst-italic text-start text-danger">Must contain letters only</p> : <p></p>}
                  </div>
                </div>
              </div>
              {/* Email ID */}
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <div className="row">
                  <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                    <label htmlFor="email" className="form-label">Email:</label>
                  </div>
                  <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                    <input type="text"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter email"
                      value={inputs.email}
                      onChange={inputHandler}
                    />
                    {displayEmailwarn ? <p className="fw-light fst-italic text-start text-danger">Must be a valid Email ID</p> : <p></p>}
                  </div>
                </div>
              </div>

              {/* Username */}
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <div className="row">
                  <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                    <label htmlFor="username" className="form-label">Username:</label>
                  </div>
                  <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                    <input type="text"
                      id="username"
                      className="form-control"
                      name="username"
                      placeholder="Enter username"
                      value={inputs.username}
                      onChange={inputHandler}
                    />
                    {displayUwarn ? <p className="fw-light fst-italic text-start text-danger">Must be min 5 characters with alphabets and numbers only</p> : <p></p>}
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <div className="row">
                  <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                    <label htmlFor="password" className="form-label">Password:</label>
                  </div>
                  <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                    <input type="text"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter password"
                      value={inputs.password}
                      onChange={inputHandler}
                    />
                    {displayPwarn ? <p className="fw-light fst-italic text-start text-danger">Your password must be a minimum of 8 characters long and include at least one alphabet letter, one special character, and one number.</p> : <p></p>}
                  </div>
                </div>
              </div>



              {/* Button*/}
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <div className="row">
                  {/* offset */}
                  <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                  </div>
                  {/* Button Submit*/}
                  <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                    <button className="form-button" onClick={submitHandler}>Submit</button>
                  </div>
                  {/* Button */}
                  <div className="col col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-4">
                    <a href="/ahome"><button className="form-button back-button">Back to Dashboard</button></a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AdminAdd