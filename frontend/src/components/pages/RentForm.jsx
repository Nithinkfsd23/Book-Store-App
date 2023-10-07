import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const RentForm = ({ bookId, userId }) => {
  const [formData, setFormData] = useState({
    bookName: '',
    bookAuthor: '',
    libraryId: '',
    name: '',
    contactNumber: '',
  });

  useEffect(() => {
    // Fetch book data from the "books" collection based on bookId
    axios
      .get(`http://localhost:5000/api/getBookById/${bookId}`)
      .then((response) => {
        if (response.data.message === 'Success') {
          const bookData = response.data.data;
          // Populate the form fields with the fetched book data
          setFormData({
            bookName: bookData.name,
            bookAuthor: bookData.author,
            libraryId: bookData.libraryId,
          });
        } else {
          Swal.fire('Sorry', response.data.message, '');
        }
      })
      .catch((err) => console.log(err));

    // Fetch user data from the "users" collection based on userId
    axios
      .get(`http://localhost:5000/api/getUserById/${userId}`)
      .then((response) => {
        if (response.data.message === 'Success') {
          const userData = response.data.data;
          // Populate the form fields with the fetched user data
          setFormData({
            ...formData,
            name: userData.name,
            contactNumber: userData.contactNumber,
          });
        } else {
          Swal.fire('Sorry', response.data.message, '');
        }
      })
      .catch((err) => console.log(err));
  }, [bookId, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send the rent request data to backend or perform any other actions.
    console.log(formData);
  };

  return (
    <div className="container mt-4">
      <h2>Rent Request Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            type="text"
            name="bookName"
            value={formData.bookName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Book Author</Form.Label>
          <Form.Control
            type="text"
            name="bookAuthor"
            value={formData.bookAuthor}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Library ID Number</Form.Label>
          <Form.Control
            type="text"
            name="libraryId"
            value={formData.libraryId}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name of the User</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RentForm;
