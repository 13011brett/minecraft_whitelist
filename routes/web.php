<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WhitelistController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/whitelists', [WhitelistController::class, 'index'])->name('whitelists.index');
    Route::get('/whitelist/{whitelist}', [WhitelistController::class, 'edit'])->name('whitelist.edit');
    Route::get('/whitelist/{whitelist}/edit', [WhitelistController::class, 'showAddUsers'])->name('whitelist.showAddUsers');
    Route::get('/whitelists/create', [WhitelistController::class, 'create'])->name('whitelists.create');
    Route::get('/whitelist/{whitelist}/download', [WhitelistController::class, 'download'])->name('whitelist.download');

    Route::put('/whitelist/{whitelist}', [WhitelistController::class, 'update'])->name('whitelist.update');
    Route::patch('/whitelists/{whitelist}', [WhitelistController::class, 'removeUser'])->name('whitelists.removeUser');

    Route::post('/whitelist/create', [WhitelistController::class, 'store'])->name('whitelists.store');
    Route::delete('/whitelists/{whitelist}', [WhitelistController::class, 'destroy'])->name('whitelists.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
