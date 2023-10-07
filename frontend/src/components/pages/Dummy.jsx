
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import userHome from '../../utils/images/userHome.jpg'
import Swal from 'sweetalert2';
import '../UserHome.css'
import 'font-awesome/css/font-awesome.min.css';
import BookAdd from './BookAdd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const UserHome = () => {
  const [data, setData] = useState([]);
  const [updation, setUpdation] = useState(false);
  const [singleval, setSingleval] = useState([]);
  const [userToken, setUserToken] = useState(sessionStorage.getItem('userToken'));
  const [userRole, setUserrole] = useState(sessionStorage.getItem('userRole'));
  const [loading, setLoading] = useState(true);

  // Fetch Users data from the database
  const fetchDatafromAPI = () => {
    return axios
      .get(`http://localhost:5000/api/getbdata`)
      .then((response) => {
        if (response.data.message === 'Success') {
          setData(response.data.data);
        } else {
          Swal.fire('Sorry', response.data.message, '');
        }
      })
      .catch((err) => console.log(err));
  };

  const updateUser = (val) => {
    setUpdation(true);
    setSingleval(val);
  };

  // Delete users
  const deleteUser = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this book?');

    if (confirmed) {
      axios
        .delete(`http://localhost:5000/api/delbdata/${id}`)
        .then((response) => {
          if (response.data.message === 'Deleted successfully') {
            window.location.reload(true);
            Swal.fire('', response.data.message, 'success');
          } else {
            Swal.fire('Sorry', response.data.message, '');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchDatafromAPI()
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, []);

  const handleAddUserClick = () => {
    setUpdation(false);
  };



  // To display users data
  let finalJSX =
    <div style={{ backgroundImage: `url(${userHome})`, backgroundSize: "cover", height: "150vh" }}>
      <div className="row">
        <div className="col col-12 col-sm-12 col-md-12 col-lg-12"></div>

        {/* navbar */}
        <nav class="navbar navbar-expand-lg transparent-bg white-text">
          <div class="container-fluid">
            <a class="navbar-brand white-text" href="#">USER DASHBOARD</a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">


              </ul>
              <form class="d-flex" >

                <Link to='/'>
                  <Button className="go-to-books-button" style={{ backgroundColor: '#008080', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '20px', fontSize: '15px', cursor: 'pointer' }}
                  >  GO TO HOME
                  </Button>
                </Link>

                <Link to='/'>
                  <Button className="logout-button" style={{ backgroundColor: '#ff4500', color: 'white', marginLeft: '10px', padding: '10px 20px', border: 'none', borderRadius: '20px', fontSize: '15px', cursor: 'pointer' }}>
                    LOGOUT
                  </Button>
                </Link>

              </form>
            </div>
          </div>
        </nav>
        {/* navbar end */}

        <div className="container text-center mt-4">
          <h2 className="user-data-heading">BOOKS </h2>
        </div>

      </div>
      <div className="container w-75 mt-4 pt-4">



      <Link to="/badd">
  <Button variant="success" className="mb-3" onClick={handleAddUserClick}>
    <FontAwesomeIcon icon={faBook} className="book-icon-animation"   style={{
    fontSize: '48px', // Increase the size of the icon
    animation: 'rotateIcon 2s infinite', // Add animation
  }}/> {/* Use the book icon */}
  </Button>
</Link>





        {loading ? (
          <p>Loading data..</p>
        ) : data && data.length > 0 ? (
          <>




            <Table responsive bordered hover className="transparent-table">
              <thead>
                <tr class="table-success">
                  <th>Name</th>
                  <th>Image</th>
                  <th>Genre</th>
                  <th>Language</th>
                  <th>Rental Period</th>
                  <th>Description</th>
                  <th>Availability Status</th>
                  <th>ISBN Number</th>
                  <th>Publication Year</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  
                </tr>
              </thead>
              <tbody>
                {data.map((value, index) => (
                  <tr key={value._id}>
                    <td>{value.name}</td>
                    <td>{value.image}</td>
                    <td>{value.genre}</td>
                    <td>{value.languages}</td>
                    <td>{value.rentalPeriod}</td>
                    <td>{value.description}</td>
                    <td>{value.availabilityStatus}</td>
                    <td>{value.isbnNumber}</td>
                    <td>{value.publicationYear}</td>
                    
                    <td>
                      <Button className="btn btn-success btn-edit" onClick={() => updateUser(value)}>
                        <i className="fas fa-pencil-alt"></i> {/* Font Awesome edit icon */}
                      </Button>
                    </td>
                    <td>
                      <Button className="btn btn-danger btn-delete" onClick={() => deleteUser(value._id)}>
                        <i className="fas fa-trash-alt"></i> {/* Font Awesome delete icon */}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          <p>No data available...</p>
        )}

      </div>
    </div>


  if (updation) finalJSX = <BookAdd method="put" data={singleval} />;

  return (
    finalJSX
  )
};

export default UserHome