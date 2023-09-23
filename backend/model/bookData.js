const mongoose = require('mongoose');

//  Book schema 
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: String,

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