import React, {useRef, FormEvent} from 'react';
import Button from './Button';

interface FileUploadProps {
    onChange: (e: FormEvent<HTMLInputElement>) => void;
}

const FileUpload = ({ onChange }: FileUploadProps) => {
    const fileInput = useRef<HTMLInputElement>(null);

    const pickImageButtonClickHandler = () => {
        if(fileInput.current){
            fileInput.current.click();
        }
    }

    return (
        <div className="file-upload">
            <input type="file" name="files" onChange={onChange} multiple ref={fileInput} className="is-hidden"/>
            <Button text="Pick images" onClick={pickImageButtonClickHandler} type="button" className="is-link" />
        </div>
    );
};

export default FileUpload;