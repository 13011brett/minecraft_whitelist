<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WhitelistController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Commented out as we're just going to direct to register immediately for purposes of the demo.

//Route::get('/', function () {
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/whitelists', [WhitelistController::class, 'index'])->name('whitelists.index');
    Route::get('/whitelists/{whitelist}', [WhitelistController::class, 'edit'])->name('whitelists.edit');
    Route::patch('/whitelists/{whitelist}', [WhitelistController::class, 'update'])->name('whitelists.update');
    Route::patch('/whitelists/{whitelist}', [WhitelistController::class, 'removeUser'])->name('whitelists.removeUser');
    Route::delete('/whitelists/{whitelist}', [WhitelistController::class, 'destroy'])->name('whitelists.destroy');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('whitelist', WhitelistController::class);
require __DIR__.'/auth.php';
