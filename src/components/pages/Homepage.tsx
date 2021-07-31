import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';
import { getImage } from '../../store/actions/galleryActions';
import { GalleryImage } from '../../store/types/galleryTypes';
import Card from '../UI/Card';
import ImageModal from '../UI/ImageModal';

const Homepage = () => {
    const { images, imagesLoaded } = useAppSelector(state => state.gallery);
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if(!imagesLoaded) dispatch(getImage());
      }, [imagesLoaded, dispatch]);

    return (
        <section className="section">
      <div className="container">
        <h1 className="title has-text-centered is-size-1 mb-6">Welcome</h1>
        <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam incidunt at animi eligendi facere reiciendis ad assumenda, omnis quasi id atque consequuntur obcaecati explicabo eius natus quae officiis itaque dolorem!</h2>
        {images.length > 0 && 
          <div className="cards-wrapper is-flex mt-5">
            {images.map((image: GalleryImage) => (
              <Card 
                key={image.id}
                imageUrl={image.imageUrl}
                onImageClick={() => setImageUrl(image.imageUrl)}
                onDelete={() => {}}
                publicCard
                uploader={image.uploaderName}
              />
            ))}
          </div>
        }
      </div>
      {imageUrl && <ImageModal url={imageUrl} onClose={() => setImageUrl('')} />}
    </section>
    );
};

export default Homepage;