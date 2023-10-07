import React, { useEffect, useState,useRef  } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BG1 from '../../utils/images/BG1.jpeg';
import Swal from 'sweetalert2';
import '../UserHome.css';
import 'font-awesome/css/font-awesome.min.css';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  // Fetch Books data from the database
  const fetchDataFromAPI = () => {
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

  useEffect(() => {
    fetchDataFromAPI()
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Automatically scroll to the bottom when data changes
    scrollToBottom();
  }, [data]);

  return (
    <div>
      <div
        style={{
            backgroundImage: `url(${BG1})`,
            backgroundSize: 'cover',
            height: '100vh', // Adjusted height to make cards appear on top
            overflow: 'auto', // Added overflow property to enable scrolling
        }}
      >
        {/* Navbar */}
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              BOOK STORE APP
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
              </ul>
              <form class="d-flex">
                <Link to="/login">
                  <Button
                    style={{
                      backgroundColor: '#008080',
                      color: 'white',
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: '20px',
                      fontSize: '15px',
                      cursor: 'pointer',
                    }}
                  >
                    LOGIN
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    style={{
                      backgroundColor: '#008080',
                      color: 'white',
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: '20px',
                      fontSize: '15px',
                      cursor: 'pointer',
                    }}
                  >
                    SIGNUP
                  </Button>
                </Link>
              </form>
            </div>
          </div>
        </nav>

        {/* Centered content about books */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '20%',
            color: 'white',
            paddingTop: '20px',
          }}
        >
          <h1>Welcome to our Book Store</h1>
          <p>Discover a world of books and reading adventures.</p>
        </div>

        <div className="container text-center mt-4">
          <h2 className="user-data-heading">BOOKS </h2>
        </div>

        <div className="container w-75 mt-4 pt-4">
        
          <div className="row">
            {loading ? (
              <p>Loading data...</p>
            ) : data && data.length > 0 ? (
              data.map((value) => (
                <div key={value._id} className="col-md-4 mb-4">
                  <div className="card">
                    {/* Displaying the first image associated with the book */}
                    {value.imageUrls && value.imageUrls.length > 0 && (
                      <img
                        src={`http://localhost:5000/api/image/${value.imageUrls[0]}`} // Fetch image from server
                        className="card-img-top"
                        alt={value.name}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{value.bookName}</h5>
                      <p className="card-text">
                        <strong>Author:</strong> {value.author}
                        <br />
                        <strong>Genre:</strong> {value.genre}
                        <br />
                        <strong>Reviews:</strong> {value.review}
                        <br />
                        <strong>Status:</strong>{' '}
                        {value.availabilityStatus === 'Available' ? (
                          <span style={{ color: 'green' }}>
                            {value.availabilityStatus}
                          </span>
                        ) : (
                          <span style={{ color: 'red' }}>
                            {value.availabilityStatus}
                          </span>
                        )}
                      </p>
                    </div>
                    
                    <div className="card-footer"></div>
                  </div>
                </div>
              ))
            ) : (
              <p>No data available...</p>
            )}
          </div>
        </div>
      </div>
      <div ref={scrollRef}></div>
    </div>
  );
};

export default Home;
