<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

// When someone visits "/" redirect them to /products
Route::get('/', function () {
    return redirect()->route('products.index');
});

// This ONE line creates all 7 routes for CRUD
Route::resource('products', ProductController::class);