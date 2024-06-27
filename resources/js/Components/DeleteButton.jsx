import React from 'react'

export default function DeleteButton({ className = '', disabled, ...props }) {
    let size = 'py-2'
    if (className.includes('btn-sm')) size = 'py-1'

    return (
        <button 
            {...props}
            type={'button'} 
            disabled={disabled} 
            className={
                `inline-flex px-2 items-center ${size} bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled && 'opacity-25'
                } ` + className
            }
        >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="2" stroke="currentColor" className='w-4 h-4 text-white'>
                <path d="M10 12V17" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 12V17" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 7H20" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    )
}
