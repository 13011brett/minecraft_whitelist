<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWhitelistRequest;
use App\Http\Requests\UpdateWhitelistRequest;
use App\Models\Whitelist;
use App\Services\WhitelistService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class WhitelistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $whitelists = Whitelist::all()->where('user_id', '=', $request->user()->id)->toArray();


        return Inertia::render('Whitelists/All', [
            'whitelists' => array_values($whitelists),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Whitelists/Create");
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWhitelistRequest $request, WhitelistService $whitelistService)
    {
        if(Auth::id() !== $request->user()->id){
            abort(403);
        }
        $data = $request->validated();

        $users = isset($request->whitelist_upload)
            ? $whitelistService->getUsersNameFromJson($request->whitelist_upload)
            : [];

        $usersArray = isset($request->users)
            ? $whitelistService->mergeUserArrayUnique($request->users, $users)
            : [];

        $whitelistValidated = $whitelistService->getUsersFromMojang(array_values($usersArray));

        $data['users'] = $whitelistValidated;
        $data['user_id'] = $request->user()->id;

        $whitelist = Whitelist::create($data);

        $prettified_json = json_encode(json_decode($whitelist->users), JSON_PRETTY_PRINT);

        Storage::put($whitelist->id. '_whitelist.json', $prettified_json);

        return to_route('whitelists.index')->with('success', 'Whitelist created.');
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Whitelist $whitelist)
    {
        if (Auth::id() != $whitelist->user_id){
            abort(403);
        }
        return Inertia::render('Whitelists/Edit', [
            'whitelist' => $whitelist,
        ] );
    }

    public function showAddUsers(Whitelist $whitelist, WhitelistService $whitelistService){
        if (Auth::id() != $whitelist->user_id){
            abort(403);
        }
        $users = $whitelistService->getUsersNameFromJson($whitelist->users);

        $users = implode(', ', $users);

        return Inertia::render('Whitelists/AddUsers', [
            'whitelist' => $whitelist,
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWhitelistRequest $request, Whitelist $whitelist, WhitelistService $whitelistService)
    {
        if (Auth::id() != $whitelist->user_id){
            abort(403);
        }

        $data = $request->validated();


        $users = isset($request->whitelist_upload)
            ? $whitelistService->getUsersNameFromJson($request->whitelist_upload)
            : [];

        $usersArray = isset($request->users)
            ? $whitelistService->mergeUserArrayUnique($request->users, $users)
            : [];

        $whitelistValidated = $whitelistService->getUsersFromMojang(array_values($usersArray));

        $data['users'] = $whitelistValidated;
        $whitelist->update($data);
        $prettified_json = json_encode(json_decode($whitelist->users), JSON_PRETTY_PRINT);

        Storage::put($whitelist->id. '_whitelist.json', $prettified_json);
        return to_route('whitelist.edit', $whitelist)->with('success', 'Whitelist updated.');

    }
    public function download(Request $request, Whitelist $whitelist){
        $fileName = $whitelist->id . '_whitelist.json';
        return Storage::download($fileName, 'whitelist.json');
    }
    public function removeUser(Request $request, Whitelist $whitelist)
    {
        if (Auth::id() != $whitelist->user_id){
            abort(403);
        }
        $uuid = isset($request['uuid']) ? $request['uuid'] : '';

        $collection = json_encode(array_values(collect(json_decode($whitelist->users, true))
            ->filter(function($value, $key) use ($uuid) { return $value['uuid'] != $uuid;    })
            ->toArray()));
        $whitelist->users = $collection;
        $whitelist->save();

        $prettified_json = json_encode(json_decode($whitelist->users), JSON_PRETTY_PRINT);

        Storage::put($whitelist->id. '_whitelist.json', $prettified_json);

        return Inertia::render('Whitelists/Edit', [
            'whitelist' => $whitelist,
            'success' => session('success'),
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Whitelist $whitelist)
    {
        $name = $whitelist->friendly_name;
        $whitelist->delete();
        return to_route('whitelists.index')
            ->with('success', "Whitelist  \"$name\" was removed..");

    }
}
