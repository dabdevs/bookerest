import React, { useCallback, useState } from 'react'
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import SaveButton from '@/Components/SaveButton';
import { useForm } from '@inertiajs/react';
import NewButton from '../NewButton';

const  RoleForm = React.memo(({ role, closeModal }) => {
    console.log('form reloaded')
    const { data, setData, post, put, processing, errors, reset } = useForm(role || {
        id: '',
        name: '',
        permissions: role.permissions || [],
        newPermission: ''
    });

    const handleUpdate = useCallback((e) => {
        e.preventDefault();

        // Send update request
        put(route('roles.update', data.id))

        reset()
    });

    const handleCreate = useCallback((e) => {
        e.preventDefault()

        // Send post request
        post(route('roles.store'), {
            onSuccess: (page) => {
                // Get new created ID
                const roleId = page.props.flash.extraData.roleId;

                // Set new data ID
                setData('id', roleId)
            },
            onError: (errors) => {
                console.error(errors);
            },
        });

        if (Object.keys(errors).length === 0) {
            setData('name', '')
        } else {
            closeModal(true)
        }
    })

    const addPermission = useCallback((e) => {
        e.preventDefault()

        // Send create request
        post(route('roles.permissions.add', data.id), {
            onSuccess: (page) => {
                const newPermission = page.props.flash.extraData.newPermission
                const permissions = data.permissions.push(newPermission)
                setData('permissions', permissions)
                setData('newPermission', '')
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    })
    console.log(data.permissions)

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    return (
        <form onSubmit={data.id !== '' ? handleUpdate : handleCreate} className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Create Role</h3>
                            <div className="mt-2 w-full">
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    defaultValue={data.name}
                                    className="mt-1 border py-2 block w-full"
                                    autoFocus
                                    onChange={(e) => setData('name', e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            {
                                data.id && <div className="mt-2 w-full">
                                    <InputLabel htmlFor="permission" value="Permissions" />
                                    <div className='flex gap-2'>
                                        <TextInput
                                            id="permission"
                                            type="text"
                                            className="mt-1 border py-2 block w-full"
                                            autoFocus
                                            defaultValue={data.newPermission}
                                            onChange={(e) => setData('newPermission', e.target.value)}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <NewButton 
                                            onClick={addPermission}
                                            disabled={data.newPermission === ''}
                                            className='btn-sm'
                                            >Add
                                        </NewButton>
                                    </div>
                                    <InputError message={errors.permission} className="mt-2" />
                                    <div id="permissions" className="mt-1 w-full h-60 overflow-y-scroll">
                                        {
                                            data.permissions?.map(permission => (
                                                <div className='flex gap-2 mb-2' key={permission.id}>
                                                    <input type='checkbox' className='mt-1' value={permission.id} />
                                                    <p>{permission.name}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <InputError message={errors.permissions} className="mt-2" />
                                </div>
                            }
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 gap-2 sm:flex sm:flex-row-reverse sm:px-6">
                        <SaveButton />
                        <button onClick={closeModal} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                    </div>
                </div>
            </div>
        </form>
    )
})

export default RoleForm
