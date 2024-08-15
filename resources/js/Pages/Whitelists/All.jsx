import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head } from '@inertiajs/react';
import Table from "@/Components/Table.jsx";

const columns = [
    'friendly_name',
    'usersname'
]

export default function All({ auth, whitelists }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Whitelists</h2>}
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Table items={whitelists} columns={columns} primary="ID" action="whitelists.edit" actionRemove="whitelists.destroy"></Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
