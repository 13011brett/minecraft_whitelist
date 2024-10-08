import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router, useForm} from "@inertiajs/react";
import TableRemove from "@/Components/TableRemove.jsx";

const columns = [
    'name',
    'uuid',
]


export default function Edit({ auth, whitelist}){

const users = JSON.parse(whitelist.users);
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2
                className="font-semibold text-2xl text-gray-800 dark:text-gray-200 leading-tight text-center">Whitelist
                - {whitelist.friendly_name ?? whitelist.id}</h2>}
        >

            <Head title={'Whitelist:' + whitelist.friendly_name}/>



    <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <TableRemove items={users} columns={columns} primary="#" action="whitelists.removeUser"
                                     actionParentId={whitelist}  actionEdit="whitelist.showAddUsers" actionDownload="whitelist.download"/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}