import { ChangeEvent } from "react";

interface TextAreaProps {
    textinput: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    rows?: number;
    cols?: number;
    wrap?: string; // soft or hard
}

function TextAreaInput ({
    textinput,
    onChange,
    placeholder = '',
    disabled = false,
    className = '',
    rows = 15,
    cols = 50,
    wrap = 'soft'
}: TextAreaProps) {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };
    return <textarea
                value={textinput}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
                className={className}
                rows={rows}
                cols={cols}
                wrap={wrap}
            />;
};

export default TextAreaInput;