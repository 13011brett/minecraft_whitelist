import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, router, useForm} from "@inertiajs/react";
import TableRemove from "@/Components/TableRemove.jsx";

const columns = [
    'name',
    'uuid',
]


export default function Edit({ auth, whitelist }){

    const removeUser = (ev) => {
        if(!window.confirm("Are you sure you want to delete this user?")){
            return;
        }

        //router.patch(route('whitelist.removeUser', whitelist));
    }

const users = JSON.parse(whitelist.users);
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2
                className="font-semibold text-2xl text-gray-800 leading-tight text-center">Whitelist - {whitelist.friendly_name ?? whitelist.id}</h2>}
        >
            <Head title={'Whitelist:' + whitelist.friendly_name}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <TableRemove items={users} columns={columns} primary="#" action="whitelists.removeUser" removeFrom={whitelist} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}