import React from 'react'
import DeleteIcon from './DeleteIcon'
import DangerButton from './DangerButton'

export default function DeleteButton({ className = '', disabled, children, ...props }) {
    let size = 'py-2'
    if (className.includes('btn-sm')) size = 'py-1'

    return (
        <DangerButton type={'button'} disabled={disabled} className={`gap-1 ${size}`}>
            <DeleteIcon />
            Delete
        </DangerButton>
    )
}
