import React, { useState } from 'react';

const AddImage = ({ setShowModal }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!selectedImage) return;

        const reader = new FileReader();
        reader.onload = () => {
            const imageBase64 = reader.result;
            localStorage.setItem('galleryImages', imageBase64);
            console.log("Image uploaded:", imageBase64);
            setShowModal(false); 
        };
        reader.readAsDataURL(selectedImage);
    };

    return (
        <div>
            <div className="modal-content">
                <span className='close' onClick={() => setShowModal(false)}>x</span>
                <h2>Add Image</h2>
                <form onSubmit={handleFormSubmit}>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    );
};

export default AddImage;
