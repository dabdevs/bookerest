import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FlashMessage = React.memo(() => {
    const { flash } = usePage().props

    let toaster = null
    let msg = ''
    if (flash.success) {
        toaster = toast.success
        msg = flash.success
    } if (flash.error) {
        toaster = toast.error
        msg = flash.error
    } if (flash.warn) {
        toaster = toast.warn
        msg = flash.warn
    } if (flash.info) {
        toaster = toast.info
        msg = flash.info
    }

    if (toaster === null) return null

    toaster(msg, {
        position: "top-right",
        autoClose: 3000
    });

    return <ToastContainer />
})

export default FlashMessage
