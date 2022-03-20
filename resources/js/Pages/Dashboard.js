import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import ModuleCard from '@/Components/Dashboard/ModuleCard';

export default function Dashboard(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <p className='mb-0 text-2xl text-bold'>
                            Hello, { props.auth.user.name }! What do you want to do today?
                        </p> 
                    </div>
                </div>
                <div className='max-w-7xl w-full mx-auto'>
                    <div className='py-6 -mx-3'>
                        <div className='flex sm:px-6 lg:px-8'>
                                {
                                    props.modules.map(module => (
                                        <div className='flex-initial w-1/4 px-3'>
                                            <ModuleCard module={module}/>
                                        </div>
                                    ) )
                                }
                        </div> 
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
