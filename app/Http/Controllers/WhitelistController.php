<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWhitelistRequest;
use App\Models\Whitelist;
use App\Services\WhitelistService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
    public function create(): Response
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
        // Will remove all spaces in general since no Minecraft username can have that.
        $users = [];
        if(json_validate($request->whitelist_upload)) {
            $uploadFileArray = json_decode($request->whitelist_upload, true);
            foreach ($uploadFileArray as $user) {
                if(array_key_exists('name', $user)){
                    $users[] = $user['name'];
                }

            }

        }
        //This can be cleaned up by splitting it apart to make it more readable.
        $usersArray = array_unique(array_merge(explode(',', str_replace(' ', '', $request->users)), $users));



        foreach($usersArray as $user){
            if(strlen($user) > 16 || $user == ''){
                unset($usersArray[array_search($user, $usersArray)]);
            }

        }


        $whitelistValidated = $whitelistService->getUsersFromMojang(array_values($usersArray));

        $data['users'] = $whitelistValidated;
        $data['user_id'] = $request->user()->id;

        Whitelist::create($data);
        return to_route('whitelists.index')->with('success', 'Whitelist created.');
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Whitelist $whitelist)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Whitelist $whitelist)
    {
        if (Auth::id() != $whitelist->user_id){
            abort(403);
        }
        return Inertia::render('Whitelists/Edit', [
            'whitelist' => $whitelist,
        ] );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Whitelist $whitelist) : void
    {

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
