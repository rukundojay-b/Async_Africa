<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Products</title>
    <style>
        /* Basic styling — nothing fancy, just readable */
        body        { font-family: Arial, sans-serif; max-width: 900px; margin: 40px auto; padding: 0 20px; background: #f9f9f9; }
        h1          { color: #333; }
        .card       { background: white; border-radius: 10px; padding: 24px; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
        table       { width: 100%; border-collapse: collapse; }
        th          { background: #f0f0f0; padding: 10px 14px; text-align: left; font-size: 13px; }
        td          { padding: 10px 14px; border-bottom: 1px solid #eee; font-size: 14px; }
        .btn        { padding: 6px 14px; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; text-decoration: none; display: inline-block; }
        .btn-blue   { background: #3b82f6; color: white; }
        .btn-yellow { background: #f59e0b; color: white; }
        .btn-red    { background: #ef4444; color: white; }
        .alert      { background: #dcfce7; color: #166534; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; }
        .empty      { color: #999; text-align: center; padding: 30px; }
    </style>
</head>
<body>

<h1>Products Manager</h1>

{{-- Show success message if it exists --}}
@if(session('success'))
    <div class="alert">{{ session('success') }}</div>
@endif

<div class="card">

    {{-- Button to go to create form --}}
    <a href="{{ route('products.create') }}" class="btn btn-blue">+ Add New Product</a>

    <br><br>

    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>

            {{-- Loop through products. If empty, show a message instead --}}
            @forelse($products as $product)
                <tr>
                    <td>{{ $product->id }}</td>
                    <td>{{ $product->name }}</td>
                    <td>{{ $product->description ?? '—' }}</td>
                    <td>${{ number_format($product->price, 2) }}</td>
                    <td>{{ $product->quantity }}</td>
                    <td style="display:flex; gap:8px;">

                        {{-- Edit button — goes to edit form --}}
                        <a href="{{ route('products.edit', $product->id) }}" class="btn btn-yellow">Edit</a>

                        {{-- Delete button — needs a form because DELETE is not a link --}}
                        <form action="{{ route('products.destroy', $product->id) }}" method="POST"
                              onsubmit="return confirm('Are you sure you want to delete this?')">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-red">Delete</button>
                        </form>

                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" class="empty">No products yet. Add one above!</td>
                </tr>
            @endforelse

        </tbody>
    </table>

</div>

</body>
</html>