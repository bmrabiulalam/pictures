import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ type='text', placeholder, value, name, onChange, label }: InputProps) => {
  return(
    <div className="field">
        <div className="control">
            <label htmlFor="">{label}</label>
            <input 
                type={type} 
                className="input"
                placeholder={placeholder}
                value={value}
                name={name}
                id={name}
                onChange={onChange}
                required
                autoComplete="off"
            />
        </div>
    </div>
  );
}

export default Input;