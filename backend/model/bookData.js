const mongoose = require('mongoose');

//  Book schema 
const bookSchema = new mongoose.Schema({
    
    bookName: {
        type: String,
        required: true,
    }, 
   
    author: String,

    // Adding a field for image data
    imageData: {
        data: Buffer,
        contentType: String,
    },

    review: String,

    genre: String,

    languages: [String],

    rentalPeriod: String,

    description: String,

    availabilityStatus: {
        type: String,
        enum: ['Available', 'Rented'],
        default: 'Available',
    },
    isbnNumber: String,

    publicationYear: Number,
});


const Book = mongoose.model('book', bookSchema);

module.exports = Book;