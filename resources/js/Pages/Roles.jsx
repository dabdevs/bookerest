import React, { useCallback, useEffect, useState } from 'react'
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import DeleteButton from '@/Components/DeleteButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NewButton from '@/Components/NewButton';
import { useForm } from '@inertiajs/react';
import RoleForm from '@/Components/forms/RoleForm';
import EditButton from '@/Components/EditButton';

export default function Roles({ auth, roles }) {
    const [showForm, setShowForm] = useState(false)
    const { data, setData, post, put, delete:destroy, processing, errors, reset } = useForm({
        id: '',
        name: '',
    });

    const handleUpdate = (e) => {
        e.preventDefault();

        setData('name', '')

        setShowForm(!showForm)

        // Send update request
        put(route('roles.update', data.id))

        setData({ id: '', name: '' })
    };

    const handleCreate = (e) => {
        e.preventDefault()

        // Send create request
        post(route('roles.store', data))
        console.log(Object.keys(errors).length === 0)
        if (Object.keys(errors).length === 0) {
            setData('name', '')
        } else {
            console.log('close form')
            setShowForm(false)
        }
    }
    
    const handleDelete = (id) => {
        if (confirm('Confirm delete?') ){
            // Send delete request
            destroy(route('roles.destroy', id))
        }
        setData('id', '')
    }

    const openForm = (data={}) => {
        setData(data)
        setShowForm(!showForm)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <section className="w-full px-4 container mx-auto">
                <NewButton onClick={() => openForm()} />

                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <form>
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                    ID
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
                                                        {r.id}
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                        {/* {
                                                            data.id === r.id ?
                                                                <>
                                                                    <div className="w-full">
                                                                        <TextInput
                                                                            id="name"
                                                                            name={r.name} 
                                                                            className={`border ${inputError === r.id ? 'border-red-400' : 'border-gray-400'} rounded p-1 text-gray-800 focus:ring-0 sm:text-sm sm:leading-6`}
                                                                            value={data.name}
                                                                            autoFocus
                                                                            onChange={(e) => setData({ id: r.id, name: e.target.value })}
                                                                        />
                                                                    </div>
                                                                    {
                                                                        inputError === r.id &&
                                                                        <div className='text-red-400'>Field is required</div>
                                                                    }
                                                                </>
                                                                : r.name
                                                        } */}
                                                        {r.name}
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{format(new Date(r.created_at), 'MMMM dd, yyyy')}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{formatDistanceToNow(parseISO(r.updated_at))} ago</td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div className="flex items-center gap-x-6">
                                                            <EditButton onClick={() => openForm({ 'id': r.id, name: r.name })} className='btn-sm' />
                                                            <DeleteButton onClick={() => handleDelete(r.id)} className='btn-sm' />
                                                            {/* {data.id === r.id ?
                                                                <SaveButton className='btn-sm' />
                                                                : <DeleteButton onClick={() => handleDelete(r.id)} className='btn-sm' />
                                                            } */}
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

                {showForm && <RoleForm data={data} setData={setData} errors={errors} setShowForm={setShowForm} submit={data.id ? handleUpdate : handleCreate} />}
            </section>
        </AuthenticatedLayout>
    )
}
