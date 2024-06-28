import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div className={`relative z-10 ease-out duration-300 opacity-100'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true">
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;