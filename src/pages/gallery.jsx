import React, { useEffect, useState } from 'react';
import AddImage from '../components/gallery/addImage';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const storedImages = localStorage.getItem('galleryImages');
        if (storedImages) {
            setImages(JSON.parse(storedImages));
        }
    }, []);

    const handleAddImage = (imageUrl) => {
        const updatedImages = [...images, imageUrl];
        setImages(updatedImages);
        localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
    };

    const handleDeleteImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
    };

    return (
        <div className='userTable'>
            <div className='header'>
                <h1>Gallery</h1>
                <button onClick={() => setShowModal(true)} className='AddUser'>Add Images</button>
            </div>
            <hr />
            <table className="imageTable">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {images.map((image, index) => (
                        <tr key={index}>
                            <td>
                                <img src={image} alt='' />
                            </td>
                            <td>
                                <button className='actionButton' onClick={() => handleDeleteImage(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <div className="addUserModal">
                    <AddImage setShowModal={setShowModal} handleAddImage={handleAddImage} />
                </div>
            )}
        </div>
    )
}

export default Gallery;
