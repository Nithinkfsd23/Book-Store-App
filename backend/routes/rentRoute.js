//  new route for renting a book

const express = require('express');
const router = express.Router();
const bookData = require('../model/bookData');


// Define a route to get book data by ID
router.get('/getbdata/:id', async (req, res) => {
    try {
        const item = req.body;
      const bookId = req.params.id;
      
      
      const book = await bookData.findById(bookId,item);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      // Return the book data
      res.json({ message: 'Success', data: book });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });



router.post('/rentbook/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await bookData.findById(bookId);

        if (!book) {
            return res.json({ message: "Book not found" });
        }
  
        // Autofill the rent form fields with book information
        const rentInfo = {
            bookName: book.bookName,
            author: book.author,
            libraryId: req.body.libraryId,
            name: req.body.name,
            contactNumber: req.body.contactNumber,
        };

        // Change the availability status of the book to "Rented"
        book.availabilityStatus = "Rented";
        await book.save();

        res.json({ message: "Book rented successfully", rentInfo });
    } catch (error) {
        res.json({ message: "Renting not successful" });
    }
});



module.exports = router;