import PlusIcon from "./PlusIcon";

export default function NewButton({ className = '', disabled, children, ...props }) {
    let size = 'py-2'
    if (className.includes('btn-sm')) size = 'py-1'

    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-2 gap-1 ${size} bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none transition ease-in-out duration-150 ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            <PlusIcon />
            New
        </button>
    );
}
