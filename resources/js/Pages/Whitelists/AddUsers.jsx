import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, whitelist, users }) {
    const { data, setData, post, errors, reset } = useForm({
        whitelist_upload: "",
        friendly_name: whitelist.friendly_name || "",
        users: users || "",
        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("whitelist.update", whitelist.id));
    };

    const fileReader = new FileReader();
    let fileContents = '';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Edit whitelist: {whitelist.friendly_name}
                    </h2>
                </div>
            }
        >
            <Head title="whitelists" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            {whitelist.image_path && (
                                <div className="mb-4">
                                    <img src={whitelist.image_path} className="w-64"/>
                                </div>
                            )}
                            <div>
                                <InputLabel
                                    htmlFor="whitelist_upload"
                                    value="Whitelist File (JSON only, not required)"
                                    className="text-gray-800 dark:text-gray-200"
                                />
                                <TextInput
                                    id="whitelist_upload"
                                    type="file"
                                    name="whitelist_upload"
                                    className="mt-1 block w-full dark:text-gray-200"
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
                                <InputLabel
                                    htmlFor="friendly_name"
                                    className="text-gray-800 dark:text-gray-200"
                                    value="Friendly Name"/>

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
                                <InputLabel
                                    htmlFor="users"
                                    className="text-gray-800 dark:text-gray-200"
                                    value="Users (Comma Separated)"/>

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
                                    href={route("whitelist.edit", whitelist.id)}
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