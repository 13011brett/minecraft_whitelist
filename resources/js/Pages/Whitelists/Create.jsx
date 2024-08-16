import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputTag from "@/Components/InputTag.jsx";

export default function Create({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        whitelist_upload: "",
        friendly_name: "",
        users: "",
    });


    const onSubmit = (e) => {
        e.preventDefault();

        post(route("whitelists.store"));
    };

    const fileReader = new FileReader();
    let fileContents = '';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-600 leading-tight">
                        Create new Whitelist
                    </h2>
                </div>
            }
        >
            <Head title="Whitelists" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-dark dark:bg-black overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-zinc-900 shadow sm:rounded-lg"
                        >
                            <div>
                                <InputLabel
                                    htmlFor="whitelist_file_path"
                                    value="Whitelist File"
                                />
                                <TextInput
                                    id="whitelist_file_path"
                                    type="file"
                                    name="whitelist_upload"
                                    className="mt-1 block w-full"
                                    onChange={(e) => {
                                        fileReader.readAsText(e.target.files[0]);
                                        fileReader.onload = function (event) {
                                            fileContents = event.target.result;
                                            setData("whitelist_upload", fileContents);

                                        }
                                    }}

                                />
                                <InputError message={errors.whitelist_upload} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="friendly_name" value="Friendly Name"/>

                                <TextInput
                                    id="friendly_name"
                                    type="text"
                                    name="friendly_name"
                                    value={data.friendly_name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    placeholder="My Favorite Server!"
                                    onChange={(e) => setData("friendly_name", e.target.value)}
                                />

                                <InputError message={errors.friendly_name} className="mt-2"/>


                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="users" value="Users (Comma Separated)"/>

                                <TextInput
                                    id="users"
                                    type="text"
                                    name="users"
                                    value={data.users}
                                    className="mt-1 block w-full"
                                    isFocused={false}
                                    placeholder="gamer101, apex_rocks13011, brettames11"
                                    onChange={(e) => setData("users", e.target.value)}
                                />

                                <InputError message={errors.users} className="mt-2"/>


                            </div>



                            <div className="mt-4 text-right">
                                <Link
                                    href={route("whitelist.index")}
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}