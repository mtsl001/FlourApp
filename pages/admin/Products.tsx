import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
import { Blend } from '../../types';

const Products: React.FC = () => {
  const { products, deleteProduct, addProduct, updateProduct } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Blend>>({});

  const handleEdit = (product: Blend) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentProduct({
      id: Date.now(), // simple ID generation
      name: '',
      segment: '',
      price: 0,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      heroClaim: '',
      protein: 0,
      fiber: 0,
      gi: 50
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProduct.id && products.find(p => p.id === currentProduct.id)) {
      updateProduct(currentProduct as Blend);
    } else {
      addProduct(currentProduct as Blend);
    }
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setCurrentProduct({ ...currentProduct, [e.target.name]: val });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Products</h1>
        <button onClick={handleAddNew} className="bg-brand-800 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-brand-900">
          <Plus className="w-4 h-4" /> Add Blend
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">{products.find(p => p.id === currentProduct.id) ? 'Edit Blend' : 'New Blend'}</h2>
              <button onClick={() => setIsEditing(false)}><X className="w-6 h-6 text-slate-400 hover:text-red-500"/></button>
            </div>
            <form onSubmit={handleSave} className="p-6 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input required name="name" value={currentProduct.name} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Segment/Category</label>
                <input required name="segment" value={currentProduct.segment} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (₹)</label>
                <input required type="number" name="price" value={currentProduct.price} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Hero Claim</label>
                <input name="heroClaim" value={currentProduct.heroClaim} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Protein (g)</label>
                <input type="number" name="protein" value={currentProduct.protein} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fiber (g)</label>
                <input type="number" name="fiber" value={currentProduct.fiber} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>
              <div className="col-span-2 mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-slate-600 font-medium">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-brand-800 text-white rounded font-bold">Save Blend</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase font-medium text-xs">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Segment</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={product.image.replace('&w=600', '&w=60')} alt="" className="w-10 h-10 rounded object-cover" />
                  <span className="font-bold text-slate-900">{product.name}</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{product.segment}</td>
                <td className="px-6 py-4 font-bold text-slate-900">₹{product.price}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button onClick={() => handleEdit(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => { if(window.confirm('Delete this blend?')) deleteProduct(product.id) }} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
