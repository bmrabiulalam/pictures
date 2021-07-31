import React, { useEffect, useState, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';
import { setSuccess } from '../../store/actions/authActions';
import { deleteImage, getImage } from '../../store/actions/galleryActions';
import { GalleryImage } from '../../store/types/galleryTypes';
import UploadImagesModal from '../sections/UploadImagesModal';
import Alert from '../UI/Alert';
import Button from '../UI/Button';
import Card from '../UI/Card';
import ImageModal from '../UI/ImageModal';
import Message from '../UI/Message';

const Dashboard = () => {
    const [showUploadImagesModal, setShowUploadImagesModal] = useState(false);
    const [showDeleteImageAlert, setShowDeleteImageAlert] = useState(false);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [userImages, setUserImages] = useState<GalleryImage[]>([]);
    const { images, imagesLoaded } = useAppSelector(state => state.gallery);
    const {user, needVerification, success} = useAppSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!imagesLoaded) dispatch(getImage());
    }, [imagesLoaded, dispatch]);

    useEffect(() => {
        if(images.length > 0) {
            const filtered = images.filter(i => i.uploaderId === user?.id);
            setUserImages(filtered);
        } else {
            setUserImages([]);
        }
    }, [images, user]);

    useEffect(() => {
        if(success){
            dispatch(setSuccess(''));
        }
    }, [success, dispatch]);

    const deleteHandler = (image: GalleryImage, e: MouseEvent) => {
        e.preventDefault();
        setShowDeleteImageAlert(true);
        setSelectedImage(image);
    }

    const deleteImageHandler = () => {
        if(selectedImage) {
            setDeleting(true);
            dispatch(deleteImage(selectedImage, () => {
                setDeleting(false);
                setShowDeleteImageAlert(false);
            }))
        }
    }

    return (
        <section className="section">
            <div className="container">
                {needVerification && <Message type="success" msg="Please verify your email address"/>}
                <h1 className="is-size-1">Welcome {user?.firstName}</h1>
                <Button text="Upload images" className="mb-5" onClick={() => setShowUploadImagesModal(true)} />
                {
                    !imagesLoaded
                    ? <h2 className="is-size-3">Loading images...</h2>
                    : userImages.length === 0
                        ? <Message type="info" msg="No images selected, please upload some"/>
                        : <div className="cards-wrapper is-flex">
                            {
                                userImages.map((image: GalleryImage) => (
                                    <Card
                                        key={image.id}
                                        onDelete={(e: MouseEvent) => deleteHandler(image, e)}
                                        imageUrl={image.imageUrl}
                                        onImageClick={() => setImageUrl(image.imageUrl)}
                                    />
                                ))
                            }
                        </div>
                }
                {showUploadImagesModal && <UploadImagesModal onClose={() => setShowUploadImagesModal(false)}/>}
                {
                    showDeleteImageAlert && 
                    <Alert
                        title="Are you sure want to delete this image?"
                        onClose={() => setShowDeleteImageAlert(false)}
                        onSubmit={deleteImageHandler}
                        deleting={deleting}
                    />
                }
                {imageUrl && <ImageModal url={imageUrl} onClose={() => setImageUrl('')}/>}
            </div>
        </section>
    );
};

export default Dashboard;