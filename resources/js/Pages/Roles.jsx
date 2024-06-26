import React, { useCallback, useEffect, useState } from 'react'
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import PrimaryButton from '@/Components/SaveButton';
import DeleteButton from '@/Components/DeleteButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NewButton from '@/Components/NewButton';
import SaveButton from '@/Components/SaveButton';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Roles({ auth, roles }) {
    const [showForm, setShowForm] = useState(false)
    const [inputError, setInputError] = useState('')
    const [deleteBtnDisabled, setDeleteBtnDisabled] = useState(false)
    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: '',
        name: '',
    });

    const selectRow = useCallback((e) => {
        const checked = e.target.checked
        const id = parseInt(e.target.value)

        // Clean any input error
        setInputError('')

        // Uncheck previous selected input
        if (data.id !== '') {
            document.getElementById(`row-${data.id}`).checked = false
        }

        if (checked) {
            // Set data
            const $input = document.getElementById(`row-${id}`)
            setData({ id: id, name: $input.name })

            // Disable all delete buttons
            setDeleteBtnDisabled(true)
        } else {
            // Reset data
            setData({ id: '', name: '' })

            // Enable all delete buttons
            setDeleteBtnDisabled(false)
        }
    }, [data.id])

    const handleUpdate = (e) => {
        e.preventDefault();

        if (data.name === '') {
            setInputError(data.id)
            return
        }

        // Clean any input error
        setInputError('')

        // Send update request
        put(route('roles.update', data.id))

        // Uncheck selected row
        document.getElementById(`row-${data.id}`).checked = false

        setData({ id: '', name: '' })

        // Enable all delete buttons
        setDeleteBtnDisabled(false)
    };

    const handleCreate = (e) => {
        e.preventDefault()

        // Send create request
        post(route('roles.store', data))

        setData('name', '')

        // Hide form
        setShowForm(false)
    }

    function RoleForm({ setShowForm }) {
        return (
            <form onSubmit={handleCreate} className={`relative z-10 ease-out duration-300 opacity-100'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Create Role</h3>
                                    <div className="mt-2 w-full">
                                        <InputLabel htmlFor="name" value="Name" />

                                        <TextInput
                                            id="name"
                                            type="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 border py-2 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />

                                        <InputError message={errors.name} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 gap-2 sm:flex sm:flex-row-reverse sm:px-6">
                                <SaveButton />
                                <button onClick={showForm => setShowForm(!showForm)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <section className="w-full px-4 container mx-auto">
                <NewButton onClick={() => setShowForm(!showForm)} />

                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <form onSubmit={handleUpdate}>
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                    <span className='pl-6'>ID</span>
                                                </th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                    Name
                                                </th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                    Date Created
                                                </th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                    Last Updated
                                                </th>

                                                <th scope="col" className="relative py-3.5 px-4">
                                                    <span className="sr-only">Actions</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {roles?.map(r => (
                                                <tr key={r.id}>
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-3">
                                                            <input value={r.id} onClick={selectRow} id={`row-${r.id}`} name={r.name} type="checkbox" className="text-blue-500 border-gray-300 rounded" />
                                                            <span>{r.id}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                        {
                                                            data.id === r.id ?
                                                                <>
                                                                    <input autoFocus onChange={(e) => setData({ id: r.id, name: e.target.value })} value={data.name} name={r.name} className={`border ${inputError === r.id ? 'border-red-400' : 'border-gray-400'} rounded p-1 text-gray-800 focus:ring-0 sm:text-sm sm:leading-6`} />
                                                                    {
                                                                        inputError === r.id &&
                                                                        <div className='text-red-400'>Field is required</div>
                                                                    }
                                                                </>
                                                                : r.name
                                                        }
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{format(new Date(r.created_at), 'MMMM dd, yyyy')}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{formatDistanceToNow(parseISO(r.updated_at))} ago</td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div className="flex items-center gap-x-6">
                                                            {data.id === r.id ?
                                                                <SaveButton className='btn-sm' />
                                                                : <DeleteButton disabled={deleteBtnDisabled} className='btn-sm' />
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {showForm && <RoleForm setShowForm={setShowForm} />}
            </section>
        </AuthenticatedLayout>
    )
}
