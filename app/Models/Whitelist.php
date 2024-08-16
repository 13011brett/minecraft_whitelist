<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Whitelist extends Model
{
    use HasFactory;


    protected $hidden = [
        'user',
    ];
    protected $fillable = [
        'users',
        'friendly_name',
        'user_id',
    ];

    protected $appends = [
        'usersname',
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getUsersnameAttribute(): string
    {
        return $this->user->name;
    }


}


