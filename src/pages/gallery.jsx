import React, { useEffect, useState } from 'react';
import AddImage from '../components/gallery/addImage';
import DeleteIcon from '@mui/icons-material/Delete';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const storedImages = localStorage.getItem('galleryImages');
        if (storedImages) {
            setImages(JSON.parse(storedImages));
        }
    }, [showModal]);

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
        <div className='gallery'>
            <div className='web-header'>
                <h1>Gallery</h1>
                <button onClick={handleAddImage} className='AddUser'><ControlPointIcon/> <p>Add Image</p></button>
            </div>
            <hr />
            <div className="imageContainer">
                {images.map((image, index) => (
                    <div key={index} className="imageWrapper">
                        <div className="imageWithDeleteIcon" style={{ backgroundImage: `url(${image})` }}>
                            <button className='deleteButton' onClick={() => handleDeleteImage(index)}><DeleteIcon style={{color: "#eee"}}/></button>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="addImageModal">
                    <AddImage setShowModal={setShowModal} handleAddImage={handleAddImage} />
                </div>
            )}
        </div>
    )
}

export default Gallery;
