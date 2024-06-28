import React, { useState } from 'react'
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import DeleteButton from '@/Components/DeleteButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NewButton from '@/Components/NewButton';
import { useForm } from '@inertiajs/react';
import RoleForm from '@/Components/forms/RoleForm';
import EditButton from '@/Components/EditButton';
import useModal from '@/Components/hooks/useModal';
import Modal from '@/Components/Modal';

const Roles = React.memo(({ auth, roles }) => {
    const { isOpen, openModal, closeModal } = useModal();
    console.log('list reloaded')
    const [showForm, setShowForm] = useState(false)
    const { data, setData, delete:destroy, reset} = useForm({
        id: '',
        name: '',
        permissions: []
    });
    
    const handleDelete = (id) => {
        if (confirm('Confirm delete?') ){
            // Send delete request
            destroy(route('roles.destroy', id))
        }

        setData('id', '')
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <section className="w-full px-4 container mx-auto">
                <NewButton onClick={() => {reset(); openModal()}} />

                <Modal isOpen={isOpen}>
                    <RoleForm role={data} closeModal={closeModal}/>
                </Modal>

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
                                                        {r.name}
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{format(new Date(r.created_at), 'MMMM dd, yyyy')}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{formatDistanceToNow(parseISO(r.updated_at))} ago</td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div className="flex items-center gap-x-6">
                                                            <EditButton onClick={() => {setData({ 'id': r.id, 'name': r.name, 'permissions': r.permissions }); openModal()}} className='btn-sm' />
                                                            <DeleteButton onClick={() => handleDelete(r.id)} className='btn-sm' />
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

                {showForm && <RoleForm role={data} setShowForm={setShowForm} />}
            </section>
        </AuthenticatedLayout>
    )
})

export default Roles
