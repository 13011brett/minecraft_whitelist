import {Link, router, useForm} from "@inertiajs/react";

export default function TableRemove({ items, columns, primary, action, removeFrom }) {

    function setValuesForUser(user){
        setData("uuid", user.uuid);
    }
    const {data, setData, post, processing, errors, reset } = useForm({
        name: '',
        uuid: '',
        _method: "PATCH",
    })
    const handleSubmit = (e) => {
        e.preventDefault();

        post(route(action, removeFrom.id));

    }

    return (
        <form onSubmit={handleSubmit}>
        <div className="relative overflow-x-auto border shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">{primary}</th>
                    {columns.map((column) =>
                        <th key={column} scope="col" className="px-6 py-3">{column}</th>
                    )}
                    <th scope="col" className="px-6 py-3"></th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) =>

                    <tr key={item.uuid} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            #{++index}
                        </th>
                        {columns.map((column) =>
                            <td key={column} className="px-6 py-4">
                                {item[column]}
                            </td>
                        )}
                        <td className="px-6 py-4">
                            <button type="submit" onClickCapture={e => setValuesForUser(item)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                Remove
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
        </form>
    );
}