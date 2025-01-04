import { ChangeEvent } from 'react';

interface TextInputProps {
    textinput: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    className?: string;
}

function TextInput ({
    textinput,
    onChange,
    placeholder = '',
    type = 'text',
    disabled = false,
    className = '',
}: TextInputProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };
    return <input
                type={type}
                value={textinput}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
                className={className}
            />;
};

export default TextInput;