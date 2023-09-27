
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const UserHome = () => {
  const [books, setBooks] = useState([]);

  // Fetch books data from the server
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    //  fetch the list of books from your backend API
   
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <Link to='/'>
          <Button class='d-flex' style={{ backgroundColor: '#008080', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '20px', fontSize: '15px', cursor: 'pointer' }}
          >  GO TO HOME
          </Button>
        </Link>

      {/* Display list of books as  cards */}
      <h2>Books</h2>
      <div className="row">
        {books.map((book, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card">
              <img src={book.image} className="card-img-top" alt={book.name} />
              <div className="card-body">
                <h5 className="card-title">{book.name}</h5>
                <p className="card-text">Genre: {book.genre}</p>
                <p className="card-text">Reviews: {book.reviews}</p>
                <p className="card-text">Availability: {book.availability}</p>
                {book.availability === 'rented' && (
                  <p className="card-text">Payment Option: {book.paymentOption}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHome