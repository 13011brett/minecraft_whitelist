import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head } from '@inertiajs/react';

export default function Index({ whitelists }) {
    return (
        <>
            <h1 class="text-2xl">My Whitelist</h1>
            <hr/>
            { whitelists && whitelists.map( (player) => (
                <div class={"text-center"} key={player.id}>
                    <h>{player.username}</h>
                    <p>{player.user_uuid}</p>
                    <br/>
                </div>
            )) }
        </>
    )
}
