<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WhitelistService
{
    public function getUsersFromMojang(array $usernames){
        $response = Http::post('https://api.minecraftservices.com/minecraft/profile/lookup/bulk/byname', $usernames);

        $response_json = $response->json();
        $updatedUserArray = [];
        foreach ($response_json as $user) {

            $user['id'] = $this->converIdToUuid($user['id']);
            $updatedUserArray[] = $user;
        }
        //I believe ID's may work here, but I wanted to follow the format of examples given.
        return str_replace("\"id\"", "\"uuid\"",json_encode($updatedUserArray));
    }

    public function mergeUserArrayUnique(string $request_users, array $users){
        $usersArray = array_unique(array_merge(explode(',', str_replace(' ', '', $request_users)), $users));
        foreach($usersArray as $user){
            if(strlen($user) > 16 || $user == ''){
                unset($usersArray[array_search($user, $usersArray)]);
            }

        }
        return $usersArray;
    }
    public function converIdToUuid(string $id){
        $new = '';
        for ($i = 0; $i < strlen($id); $i++) {
            $new .= $id[$i];
            if ($i == 7 || $i == 11 || $i == 15 || $i == 19) {
                $new .= '-';
            }
        }
        return $new;
    }

    public function getUsersNameFromJson(string $users_json, $key = 'name'){
        $users = [];

        if(json_validate($users_json)) {
            $uploadFileArray = json_decode($users_json, true);
            foreach ($uploadFileArray as $user) {
                if (array_key_exists($key, $user)) {
                    $users[] = $user[$key];
                }
            }
        }
        return $users;

    }

}