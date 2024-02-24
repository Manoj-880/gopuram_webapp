import React, { useState } from 'react';

const AddImage = ({ setShowModal }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    
        // Show image preview
        const reader = new FileReader();
        reader.onload = () => {
            const imagePreviewUrl = reader.result;
            // Set the image preview URL to a state variable or directly display it in the UI
            // For now, let's just log it
            console.log("Image preview URL:", imagePreviewUrl);
        };
        reader.readAsDataURL(file);
    };
    

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!selectedImage) return;
    
        const reader = new FileReader();
        reader.onload = () => {
            const imageBase64 = reader.result;
            const storedImages = localStorage.getItem('galleryImages');
            const updatedImages = storedImages ? JSON.parse(storedImages) : [];
            updatedImages.push(imageBase64);
            localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
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
