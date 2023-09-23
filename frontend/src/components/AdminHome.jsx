import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const AdminHome = () => {
  
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
  
    // Fetch books and users data from the server
    useEffect(() => {
      fetchBooks();
      fetchUsers();
    }, []);
  
    const fetchBooks = () => {
      //  fetch the list of books from your backend API
      // Update the 'books' state with the fetched data
    };
  
    const fetchUsers = () => {
      //  fetch the list of users from your backend API
      // Update the 'users' state with the fetched data
    };
  
    const handleDeleteBook = (bookId) => {
      //  to delete a book based on its ID
    };
  
    const handleEditBook = (bookId) => {
      // to edit book details
    };
  
    const handleAddBook = (newBookData) => {
      //  to add a new book to the database
    };
  
    const handleEditUser = (userId) => {
      //  to edit user details
    };
  
    const handleDeleteUser = (userId) => {
      // to delete a user based on their ID
    };
  
   
  
    return (
      <div>
        <h1>Admin Dashboard</h1>
        <Link to='/'>
          <Button class='d-flex' style={{ backgroundColor: '#008080', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '20px', fontSize: '15px', cursor: 'pointer' }}
          >  GO TO HOME
          </Button>
        </Link>
  
        {/* Display list of books */}
        <h2>Books</h2>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <div>
                <img src={book.image} alt={book.name} />
              </div>
              <div>
                <h3>{book.name}</h3>
                <p>Category: {book.category}</p>
                <p>Reviews: {book.reviews}</p>
                <p>Status: {book.status}</p>
                <p>Rented Count: {book.rentedCount}</p>
                <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                <button onClick={() => handleEditBook(book.id)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
  
        {/* Add new book form */}
        {/*  form to add new books with the required fields */}
  
        {/* Display list of users */}
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <div>
                <h3>{user.username}</h3>
                <p>Email: {user.email}</p>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                <button onClick={() => handleEditUser(user.id)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
 
  


export default AdminHome;
