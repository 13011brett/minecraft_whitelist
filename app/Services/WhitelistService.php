<?php

namespace App\Services;

use App\Models\WhitelistUser;
use Illuminate\Support\Facades\Http;

class WhitelistService
{
    public function getUserFromMojang(string $username){
        $response = Http::get('https://api.mojang.com/users/profiles/minecraft/$username');

        return $response->json();
    }

}