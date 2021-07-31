import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';
import { addImage } from '../../store/actions/galleryActions';
import Button from '../UI/Button';
import FileUpload from '../UI/FileUpload';
import Modal from '../UI/Modal';

interface UploadImagesModalProps {
    onClose: () => void;
}

interface Image {
    name: string;
    progress: number;
}

const UploadImagesModal = ({ onClose }: UploadImagesModalProps) => {
    const [files, setFiles] = useState<FileList | null>();
    const [filesArr, setFilesArr] = useState<Image[]>([]);
    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch();
    const { user } = useAppSelector(state => state.auth);

    const changeHandler = (e: FormEvent<HTMLInputElement>) => {
        if(e.currentTarget.files && e.currentTarget.files.length > 0) {
            setDisabled(false);
            let images: Image[] = [];
            Array.from(e.currentTarget.files)
                .forEach(file => images.push({name: file.name, progress: 0}));
            setFilesArr(images);
        } else {
            setFilesArr([]);
            setDisabled(true);
        }
        setFiles(e.currentTarget.files);
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if(files && files.length > 0){
            const currentUser = 
            user !== null 
            ? user 
            : {
                firstName: '',
                email: '',
                id: '',
                createdAt: ''
              };
              
            dispatch(addImage(files, currentUser, (progress, file) => {
                const copyOfFilesArr = [...filesArr];
                const findFile = copyOfFilesArr.find(f => f.name === file.name);
                if(findFile) {
                    findFile.progress = Math.floor(progress);
                }
                const updatedArr = copyOfFilesArr.map(f => f.name === file.name ? findFile ? findFile : f : f);
                setFilesArr(updatedArr);
            }));
            setFiles(null);
            setDisabled(true);
        }
    }

    return (
        <Modal onClose={onClose} title='Upload images'>
            <form onSubmit={submitHandler}>
                <FileUpload onChange={changeHandler}/>
                {
                    filesArr.length > 0 && 
                    <ul className="mt-3 mb-3">
                        {
                            filesArr.map((file: Image, index) => (
                                <li key={index} className="mb-2">
                                    <p className="is-size-7 mb-1">
                                        {file.name}
                                        {file.progress === 100 && <span className="ml-1 has-text-success has-text-weight-bold">UPLOADED</span>}
                                    </p>
                                    <progress className="progress is-primary is-small" value={file.progress} max="100">{file.progress}%</progress>
                                </li>
                            ))
                        }
                    </ul>
                }
                <Button text="Upload" disabled={disabled} className="is-primary mt-2" />
            </form>
        </Modal>
    );
};

export default UploadImagesModal;