<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WhitelistService
{
    public function getUsersFromMojang(array $usernames){
        $response = Http::post('https://api.minecraftservices.com/minecraft/profile/lookup/bulk/byname', $usernames);


        // most efficient way of doing this that I could come up with, without messing with the order of the array.
        return str_replace("\"id\"", "\"uuid\"",json_encode($response->json()));
    }

}