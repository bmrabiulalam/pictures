import React, { MouseEvent } from 'react';

interface CardProps {
    imageUrl: string;
    onDelete: (e: MouseEvent<HTMLAnchorElement>) => void;
    onImageClick: () => void;
    publicCard?: boolean;
    uploader?: string;
}

const Card = ({ imageUrl, onDelete, onImageClick, publicCard, uploader }: CardProps) => {
    return (
        <div className="card">
            <div className="card-content">
                <div className="content" style={{backgroundImage: `url(${imageUrl})`}} onClick={onImageClick}></div>
            </div>
            <footer className="card-footer">
                {publicCard && <p className="px-5 py-2">Uploaded by: {uploader}</p>}
                {!publicCard && <a href="/#" className="card-footer-item" onClick={onDelete}>Delete</a>}
            </footer>
        </div>
    );
};

export default Card;