import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import ProductManager from './AddProduct';

function Dashboard() {
  const [view, setView] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ totalStockIn: 0, totalStockOut: 0, recentActivity: [] });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const headers = { headers: { "authorization": token } };
    
    try {
      // Run both requests at the same time for speed
      const [prodRes, statsRes] = await Promise.all([
        axios.get("http://localhost:3000/products", headers),
        axios.get("http://localhost:3000/dashboard-stats", headers)
      ]);
      
      setProducts(prodRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view === "dashboard") fetchData();
  }, [view]);

  if (loading && view === "dashboard") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full font-sans">
      <Navbar setView={setView} />

      <main className="flex-1 p-6 md:p-12">
        {view === "dashboard" ? (
          <div className="max-w-6xl mx-auto space-y-10">
            
            {/* Header Section */}
            <div>
              <h1 className="text-3xl font-black text-gray-800">Inventory Overview</h1>
              <p className="text-gray-500">Real-time statistics of your school stores.</p>
            </div>

            {/* SIMPLE STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Available Stock</p>
                  <h2 className="text-5xl font-black text-green-600">{stats.totalStockIn}</h2>
                </div>
          
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Stock Out</p>
                  <h2 className="text-5xl font-black text-orange-500">{stats.totalStockOut}</h2>
                </div>
          
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              
              {/* CURRENT INVENTORY GRID */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                  <span className="w-2 h-6  rounded-full"></span>
                  Active Products
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {products.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Item Name</p>
                      <h4 className="text-lg font-black text-gray-800">{item.name}</h4>
                      <div className="mt-4 flex items-end justify-between">
                        <span className="text-3xl font-black text-gray-900">{item.quantity}</span>
                        <span className="text-[10px] font-bold text-gray-400 pb-1">UNITS LEFT</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RECENT ACTIVITY CARD */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 self-start">
                <h3 className="text-xl font-black text-gray-800 mb-8 tracking-tight">Recent Activity</h3>
                <div className="relative border-l-2 border-gray-100 ml-3 space-y-8">
                  {stats.recentActivity.length > 0 ? stats.recentActivity.map(log => (
                    <div key={log.id} className="relative pl-8">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-orange-500 border-4 border-white"></div>
                      
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-800 uppercase tracking-tight">
                           -{log.quantity_removed} {log.name}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold">
                          {new Date(log.removed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(log.removed_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )) : (
                    <p className="text-gray-400 text-sm font-medium italic pl-4">No recent movements logged.</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        ) : (
          <ProductManager />
        )}
      </main>
    </div>
  );
}

export default Dashboard;