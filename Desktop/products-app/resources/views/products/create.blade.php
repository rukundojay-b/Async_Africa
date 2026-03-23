<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add Product</title>
    <style>
        body       { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; background: #f9f9f9; }
        h1         { color: #333; }
        .card      { background: white; border-radius: 10px; padding: 28px; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
        label      { display: block; font-size: 13px; font-weight: bold; margin-bottom: 5px; color: #444; }
        input, textarea { width: 100%; padding: 9px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; margin-bottom: 6px; }
        .error     { color: #dc2626; font-size: 12px; margin-bottom: 12px; display: block; }
        .field     { margin-bottom: 16px; }
        .btn-green { background: #22c55e; color: white; padding: 10px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; }
        a          { color: #3b82f6; font-size: 13px; }
    </style>
</head>
<body>

<h1>Add New Product</h1>
<a href="{{ route('products.index') }}">&larr; Back to list</a>

<br><br>

<div class="card">

    {{-- Action: send to ProductController@store via POST --}}
    <form action="{{ route('products.store') }}" method="POST">

        {{-- REQUIRED: security token. Without this Laravel rejects the form --}}
        @csrf

        <div class="field">
            <label>Product Name *</label>
            {{-- old('name') re-fills the field if validation fails --}}
            <input type="text" name="name" value="{{ old('name') }}" placeholder="e.g. Wireless Mouse">
            {{-- Show error if name validation failed --}}
            @error('name')
                <span class="error">{{ $message }}</span>
            @enderror
        </div>

        <div class="field">
            <label>Description (optional)</label>
            <textarea name="description" rows="3" placeholder="Short description...">{{ old('description') }}</textarea>
        </div>

        <div class="field">
            <label>Price ($) *</label>
            <input type="number" name="price" step="0.01" min="0" value="{{ old('price') }}" placeholder="0.00">
            @error('price')
                <span class="error">{{ $message }}</span>
            @enderror
        </div>

        <div class="field">
            <label>Quantity *</label>
            <input type="number" name="quantity" min="0" value="{{ old('quantity', 0) }}">
            @error('quantity')
                <span class="error">{{ $message }}</span>
            @enderror
        </div>

        <button type="submit" class="btn-green">Save Product</button>

    </form>
</div>

</body>
</html>