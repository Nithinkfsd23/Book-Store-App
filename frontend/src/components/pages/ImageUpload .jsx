import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ bookId }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleImageUpload = () => {
    if (!selectedImage) {
      alert('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    axios
      .post(`http://localhost:5000/api/upload/${bookId}`, formData)
      .then((response) => {
        if (response.data.message === 'Image uploaded successfully') {
          alert('Image uploaded successfully');
          setSelectedImage(null);

          // You can handle any necessary actions after successful upload here
          // For example, update the UI to show the uploaded image, etc.
        } else {
          alert('Image upload failed');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Image upload failed internal error');
      });
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
