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
    public function index(Request $request)
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Whitelist $whitelist)
    {
        //
    }
}
