import React, { useEffect, useState } from 'react'
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import PrimaryButton from '@/Components/SaveButton';
import DeleteButton from '@/Components/DeleteButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NewButton from '@/Components/NewButton';
import SaveButton from '@/Components/SaveButton';
import { useForm } from '@inertiajs/react';

export default function Roles({ auth, roles }) {
    const [rowId, setRowId] = useState('')
    const [role, setRole] = useState('')
    const [inputError, setInputError] = useState('')
    const [deleteBtnDisabled, setDeleteBtnDisabled] = useState(false)
    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: '',
        name: '',
    });

    useEffect(() => {
        setData({id: rowId, name: role})
    }, [rowId, role])

    const selectRow = (e) => {
        const checked = e.target.checked
        const id = parseInt(e.target.value)

        // Clean any input error
        setInputError('')

        // Empty role value
        setRole('')

        // Uncheck all other inputs
        if (rowId !== '') document.getElementById(`row-${rowId}`).checked = false
        
        if (checked) {
            // Set row Id
            setRowId(id)

            // Set existing role value inside input
            setRole(document.getElementById(`row-${id}`).name)

            // Disable all delete buttons
            setDeleteBtnDisabled(true)
        } else {
            // Reset active row
            setRowId('')

            // Enable all delete buttons
            setDeleteBtnDisabled(false)
        }
    }

    const submit = (e) => {
        e.preventDefault();

        if (role === '') {
            setInputError(data.id)
            return
        }

        // Clean any input error
        setInputError('')

        // Send update request
        put(route('roles.update', data.id))

        // Uncheck row
        document.getElementById(`row-${rowId}`).checked = false

        // Deactivate selected row
        setRowId('')

        // Enable all delete buttons
        setDeleteBtnDisabled(false)
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <section className="w-full px-4 container mx-auto">
                <NewButton />
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <form onSubmit={submit}>
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                    <div className="flex items-center gap-x-3">
                                                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded" />
                                                        <button className="flex items-center gap-x-2">
                                                            <span>ID</span>
                                                        </button>
                                                    </div>
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
                                                            rowId === r.id ?
                                                                <>
                                                                    <input autoFocus onChange={(e) => setRole(e.target.value)} value={role} className={`border ${inputError === r.id ? 'border-red-400' : 'border-gray-400'} rounded p-1 text-gray-800 focus:ring-0 sm:text-sm sm:leading-6`} />
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
                                                            {rowId === r.id ?
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
            </section>
        </AuthenticatedLayout>
    )
}
