import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { Table, Button, Form, Row, Col, Alert } from 'react-bootstrap';

const AdminAdd = () => {

  const [data, setData] = useState({
    name: '',
    image: '',
    genre: '',
    languages: '',
    rentalPeriod: '',
    description: '',
    availabilityStatus: 'Available',
    isbnNumber: '',
    publicationYear: '',
  });

  // Add available options
  const availabilityOptions = ['Available', 'Rented'];

  //Alert state declaration
  const [successAlert, setSuccessAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // Function to handle adding a new book
  const handleAddBook = (e) => {
    e.preventDefault();
    // Send a POST request to add the new book to the server
    axios
      .post('http://localhost:5000/api/postbdata', data)
      .then((response) => {
        if (response.data.message === 'Book added successfully') {
          // Clear the form after successful addition
          setData({
            name: '',
            image: '',
            genre: '',
            languages: '',
            rentalPeriod: '',
            description: '',
            availabilityStatus: 'Available',
            isbnNumber: '',
            publicationYear: '',
          });
          setSuccessAlert(response.data.message);
          setErrorAlert('');
        } else {
          setErrorAlert(response.data.message);
          setSuccessAlert('');
        }
      })
      .catch((error) => {
        console.error('Error adding book:', error);
        setErrorAlert('An error occurred while adding the book.');
        setSuccessAlert('');
      });
  };


  return (
    <div className="container w-75 mt-4 pt-4">
      {/* Existing code... */}

      {/* Add new book form */}
      <h2>Add New Book</h2>

      <Form onSubmit={handleAddBook}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={data.image}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                value={data.genre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Language</Form.Label>
              <Form.Control
                type="text"
                name="languages"
                value={data.languages}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>RentalPeriod</Form.Label>
              <Form.Control
                type="text"
                name="rentalPeriod"
                value={data.rentalPeriod}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={data.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>

        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Availability Status</Form.Label>
              <Form.Select
                name="availabilityStatus"
                value={data.availabilityStatus}
                onChange={handleInputChange}
                required
              >
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>ISBNNumber</Form.Label>
              <Form.Control
                type="text"
                name="isbnNumber"
                value={data.isbnNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Publication Year</Form.Label>
              <Form.Control
                type="text"
                name="publicationYear"
                value={data.publicationYear}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Add Book
        </Button>
      </Form>

      {successAlert && (
        <Alert variant="success" onClose={() => setSuccessAlert('')} dismissible>
          {successAlert}
        </Alert>
      )}
      {errorAlert && (
        <Alert variant="danger" onClose={() => setErrorAlert('')} dismissible>
          {errorAlert}
        </Alert>
      )}
      <Form onSubmit={handleAddBook}>


      </Form>


    </div>
  );
};











export default AdminAdd;
