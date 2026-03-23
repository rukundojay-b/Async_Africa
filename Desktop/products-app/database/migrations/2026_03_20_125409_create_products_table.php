<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();                            // column: id (auto number 1,2,3...)
            $table->string('name');                  // column: name (text, max 255 chars)
            $table->text('description')->nullable(); // column: description (long text, optional)
            $table->decimal('price', 8, 2);          // column: price (e.g. 99999.99)
            $table->integer('quantity')->default(0); // column: quantity (whole number, starts at 0)
            $table->timestamps();                    // columns: created_at and updated_at (auto)
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products'); // this runs if you ever undo the migration
    }
};