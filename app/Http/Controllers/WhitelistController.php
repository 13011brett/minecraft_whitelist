<?php

namespace App\Http\Controllers;

use App\Models\Whitelist;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WhitelistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) : Response
    {

        $whitelists = Whitelist::all()->where('user_id', '=', $request->user()->id);

        return Inertia::render('Whitelists/All', [
            'whitelists' => $whitelists,
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
    public function store(Request $request)
    {
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
        $uuid = isset($request['uuid']) ? $request['uuid'] : '';

        $collection = json_encode(array_values(collect(json_decode($whitelist->users, true))
            ->filter(function($value, $key) use ($uuid) { return $value['uuid'] != $uuid;    })
            ->toArray()));
        $whitelist->users = $collection;
        $whitelist->save();


        return Inertia::render('Whitelists/Edit', [
            'whitelist' => $whitelist,
        ])->with('success', "User was removed from the whitelist.");

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
