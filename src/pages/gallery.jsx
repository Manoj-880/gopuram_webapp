import React, { useEffect, useState } from 'react';
import AddImage from '../components/gallery/addImage';
import DeleteIcon from '@mui/icons-material/Delete';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { deleteImage, get } from '../api_calls/galleryApi';
import { message } from 'antd';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        var response = await get();
        if(response.images)
        setImages(response.images);
    }

    const handleAddImage = () => {
        setShowModal(true);
    };

    const handleDeleteImage = async (index) => {
        var response = await deleteImage(index);
        window.location.reload();
        message.success(response.message);
    };

    return (
        <div className='gallery'>
            <div className='web-header'>
                <h1>Gallery</h1>
                <button onClick={handleAddImage} className='AddUser'><ControlPointIcon/> <p>Add Image</p></button>
            </div>
            <hr />
            <div className="imageContainer">
                {images.map((images) => (
                    <div key={images.id} className="imageWrapper">
                        <div className="imageWithDeleteIcon" style={{ backgroundImage: `url(data:image/png;base64,${images.image})` }}>
                            <button className='deleteButton' onClick={() => handleDeleteImage(images.id)}><DeleteIcon style={{color: "#eee"}}/></button>
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
