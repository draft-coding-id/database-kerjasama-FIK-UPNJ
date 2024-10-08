<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Dashboard\UsersController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Dashboard;
use App\Http\Controllers\Dashboard\AgreementArchivesController;

Route::get('/', [AuthenticatedSessionController::class, 'create'])
    ->name('login')
    ->middleware('guest');

Route::post('/login', [AuthenticatedSessionController::class, 'login'])
    ->name('login')
    ->middleware('guest');

Route::middleware('auth')->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::get('/', [Dashboard::class, 'index'])->name('dashboard');
        Route::get('/agreement-archives', [AgreementArchivesController::class, 'index'])->name('agreementarchives.index');
        Route::get('/agreement-archives/create', [AgreementArchivesController::class, 'create'])->name('agreementarchives.create');
        Route::post('/agreement-archives', [AgreementArchivesController::class, 'store'])->name('agreementarchives.store');
        Route::get('/agreement-archives/download/{file}', [AgreementArchivesController::class, 'download'])->name('agreementarchives.download');
        Route::delete('/agreement-archives/{id}', [AgreementArchivesController::class, 'destroy'])->name('agreementarchives.destroy');
        Route::get('/agreement-archives/{id}/edit', [AgreementArchivesController::class, 'edit'])->name('agreementarchives.edit');
        Route::post('/agreement-archives/{id}', [AgreementArchivesController::class, 'update'])->name('agreementarchives.update');
        Route::get('/agreement-archives/{id}', [AgreementArchivesController::class, 'view'])->name('agreementarchives.view');
        
        Route::get('/users', [UsersController::class, 'index'])->name('users.index');
        Route::get('/users/create', [UsersController::class, 'create'])->name('users.create');
        Route::post('/users', [UsersController::class, 'store'])->name('users.store');
        Route::delete('/user/{id}', [UsersController::class, 'destroy'])->name('user.destroy');
        Route::get('/user/{id}/edit', [UsersController::class, 'edit'])->name('user.edit');
        Route::patch('/user/{id}', [UsersController::class, 'update'])->name('user.update');
        
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    });
});
