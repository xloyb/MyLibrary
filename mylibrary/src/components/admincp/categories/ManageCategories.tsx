"use client"
import React, { useState } from 'react';

const ManageCategories = () => {
  const [categories, setCategories] = useState<string[]>(['Fiction', 'Non-fiction', 'Science', 'Fantasy']);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (category: string) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
      
      {/* Add Category Form */}
      <div className="mb-6">
        <label className="label">
          <span className="label-text">Add New Category</span>
        </label>
        <div className="flex">
          <input 
            type="text" 
            placeholder="New category" 
            className="input input-bordered flex-grow" 
            value={newCategory} 
            onChange={(e) => setNewCategory(e.target.value)} 
          />
          <button 
            className="btn btn-primary ml-2" 
            onClick={handleAddCategory}
          >
            Add
          </button>
        </div>
      </div>

      {/* Category List */}
      <table className="table w-full">
        <thead>
          <tr>
            <th className="text-left">Category Name</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{category}</td>
              <td className="text-right">
                <button 
                  className="btn btn-sm btn-warning mr-2"
                  onClick={() => console.log(`Edit category: ${category}`)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-sm btn-error"
                  onClick={() => handleDeleteCategory(category)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategories;
