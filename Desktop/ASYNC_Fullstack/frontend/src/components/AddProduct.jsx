
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const token = localStorage.getItem("token");

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products", {
        headers: { "authorization": token }
      });
      setProducts(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchProducts(); }, []);

  // 1. ADD NEW PRODUCT
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/products", 
        { name: productName, quantity }, 
        { headers: { "authorization": token } }
      );
      setShowForm(false);
      setProductName("");
      setQuantity("");
      fetchProducts();
    } catch (err) { alert("Failed to add product"); }
  };

  // 2. DELETE PRODUCT
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`, {
          headers: { "authorization": token }
        });
        fetchProducts();
      } catch (err) { alert("Delete failed"); }
    }
  };

  // 3. UPDATE PRODUCT (Rename/Edit)
  const handleEdit = async (item) => {
    const newName = prompt("Enter new product name:", item.name);
    if (!newName) return;
    
    try {
      await axios.put(`http://localhost:3000/products/${item.id}`, 
        { name: newName, quantity: item.quantity }, 
        { headers: { "authorization": token } }
      );
      fetchProducts();
    } catch (err) { alert("Update failed"); }
  };

  // 4. STOCK OUT (Substract with Logging)
  const handleStockOut = async (item) => {
    const amount = prompt(`How many ${item.name} are you taking out? (Current: ${item.quantity})`);
    
    // Validate input
    if (!amount || isNaN(amount) || parseInt(amount) <= 0) {
      return alert("Please enter a valid number");
    }

    if (parseInt(amount) > item.quantity) {
      return alert("Error: Not enough stock available!");
    }

    try {
      await axios.post("http://localhost:3000/products/stock-out", 
        { productId: item.id, amountToRemove: parseInt(amount) },
        { headers: { "authorization": token } }
      );
      fetchProducts(); // Refresh list to see new quantity
    } catch (err) {
      alert(err.response?.data?.error || "Stock out failed");
    }
  };

  // 5. STOCK IN (Simple addition)
  const handleStockIn = async (item) => {
    const amount = prompt(`How many ${item.name} are you adding?`);
    if (!amount || isNaN(amount)) return;

    const newQty = parseInt(item.quantity) + parseInt(amount);
    
    try {
      await axios.put(`http://localhost:3000/products/${item.id}`, 
        { name: item.name, quantity: newQty }, 
        { headers: { "authorization": token } }
      );
      fetchProducts();
    } catch (err) { alert("Stock in failed"); }
  };

  return (
    <div className="w-full max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">Inventory Control</h2>
          <p className="text-gray-500 font-medium">Manage your stock movements and levels</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`${showForm ? 'bg-gray-400' : 'bg-green-600'} text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-95`}
        >
          {showForm ? "✕ Close" : "+ New Product"}
        </button>
      </div>

      {/* ADD FORM */}
      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-8 rounded-3xl shadow-xl mb-8 flex gap-6 items-end border border-gray-100 animate-in fade-in duration-300">
          <div className="flex-1">
            <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Product Name</label>
            <input 
              className="w-full border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-green-500 transition" 
              placeholder="Enter name..."
              value={productName}
              onChange={e => setProductName(e.target.value)} 
              required 
            />
          </div>
          <div className="w-40">
            <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Initial Qty</label>
            <input 
              type="number" 
              className="w-full border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-green-500 transition" 
              placeholder="0"
              value={quantity}
              onChange={e => setQuantity(e.target.value)} 
              required 
            />
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl font-black shadow-md transition">SAVE TO DATABASE</button>
        </form>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-6 text-gray-400 font-black uppercase text-xs tracking-widest">Product Info</th>
              <th className="p-6 text-gray-400 font-black uppercase text-xs tracking-widest text-center">Status</th>
              <th className="p-6 text-gray-400 font-black uppercase text-xs tracking-widest text-center">Manage Stock</th>
              <th className="p-6 text-gray-400 font-black uppercase text-xs tracking-widest text-right">Options</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map(item => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition">
                <td className="p-6">
                  <p className="font-black text-gray-800 text-xl">{item.name}</p>
                  <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase">SKU-{item.id}</span>
                </td>
                <td className="p-6 text-center">
                  <div className={`text-3xl font-black ${item.quantity <= 3 ? 'text-red-500' : 'text-gray-800'}`}>
                    {item.quantity}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">In Stock</span>
                </td>
                <td className="p-6">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => handleStockIn(item)} className="bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-700 shadow-sm transition">STOCK IN (+)</button>
                    <button onClick={() => handleStockOut(item)} className="bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-600 shadow-sm transition">STOCK OUT (-)</button>
                  </div>
                </td>
                <td className="p-6 text-right">
                  <div className="flex justify-end gap-4">
                    <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700 font-bold text-sm">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-gray-300 hover:text-red-600 font-bold text-sm transition">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManager;