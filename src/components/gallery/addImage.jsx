import React, { useState } from 'react';
import { add } from '../../api_calls/galleryApi';

const AddImage = ({ setShowModal }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
    };
    

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!selectedImage) return;
        const formData = new FormData();
        formData.append('image', selectedImage);
        await add(formData);
        setShowModal(false);
        window.location.reload();
    };
    
    return (
        <div>
            <div className="modal-content">
                <span className='close' onClick={() => setShowModal(false)}>x</span>
                <h2>Add Image</h2>
                <form onSubmit={handleFormSubmit}>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {selectedImage && (
                        <img src={URL.createObjectURL(selectedImage)} alt="Preview" style={{ maxWidth: "100%", maxHeight: "200px" }} />
                    )}
                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    );
    
};

export default AddImage;
