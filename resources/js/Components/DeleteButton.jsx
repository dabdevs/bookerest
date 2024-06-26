import React from 'react'
import DeleteIcon from './DeleteIcon'
import DangerButton from './DangerButton'

export default function DeleteButton({ className = '', disabled, ...props }) {
    let size = 'py-2'
    if (className.includes('btn-sm')) size = 'py-1'

    return (
        <div className='relative inline-flex gap-2'>
        <input 
            {...props}
            role='button'
            type={'button'} 
            disabled={disabled} 
            className={
                `inline-flex items-center pl-6 pr-2 ${size} bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled && 'opacity-25'
                } ` + className
            }
            value={'Delete'} />
            <DeleteIcon className='absolute start-1 top-1' />
        </div>
    )
}
