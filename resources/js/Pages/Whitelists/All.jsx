import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, Link} from '@inertiajs/react';
import Table from "@/Components/Table.jsx";

const columns = [
    'friendly_name',
    'usersname'
]

export default function All({ auth, whitelists, success }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Whitelists
                    </h2>
                    <Link
                        href={route("whitelists.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Table items={whitelists} columns={columns} primary="#" action="whitelist.edit" actionRemove="whitelists.destroy" actionDownload="whitelist.download"></Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
