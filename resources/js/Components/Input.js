import React, { useEffect, useRef } from 'react';

export default function Input({
    type = 'text',
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    containerClassName,
    checked,
    id,
    disabled,
    prefix,
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className={`inline-flex flex-col items-start ${containerClassName} relative`}>
            <input
                type={type}
                name={name}
                disabled={disabled}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                checked={checked}
                ref={input}
                id={id}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
            { 
                prefix && 
                <div className='absolute inset-y-0 right-0 flex items-center pointer-events-none p-3 text-gray-500 sm:text-sm'>
                    { prefix }
                </div>
            }
        </div>
    );
}
