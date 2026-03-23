<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // These are the columns the user is allowed to fill in
    // This is a security feature — prevents saving unexpected fields
    protected $fillable = [
        'name',
        'description',
        'price',
        'quantity',
    ];
}