"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

const ManageCategories = () => {
  const { user } = useUser();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMod, setIsMod] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchUserRoles = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`/api/userRoles?clerkUserId=${user.id}`);
          if (response.ok) {
            const fetchedUser = await response.json();
            setIsAdmin(fetchedUser?.isAdmin || false);
            setIsMod(fetchedUser?.isMod || false);
          } else {
            console.error('Failed to fetch user roles');
          }
        } catch (error) {
          console.error('Error fetching user roles:', error);
        }
      }
    };
    
    fetchCategories();
    fetchUserRoles();
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);
};

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
  });

  if (response.ok) {
      const { filename } = await response.json();
      return filename;
  } else {
      throw new Error('Failed to upload file');
  }
};


  const handleAddCategory = async () => {
    let imagePath = '';
    if (selectedImage) {
      imagePath = await uploadImage(selectedImage);
  }

    if (newCategory.trim()) {
      setLoading(true);
      try {
        const response = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clerkUserId: user?.id, name: newCategory, image: imagePath }),
        });
        if (response.ok) {
          const category = await response.json();
          setCategories((prevCategories) => [...prevCategories, category]);
          setNewCategory('');
        } else {
          console.error('Failed to add category');
        }
      } catch (error) {
        console.error('Error adding category:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditCategory = async () => {
    if (editCategoryName.trim() && editCategoryId !== null) {
      setLoading(true);
      try {
        const response = await fetch(`/api/categories/${editCategoryId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: editCategoryName }),
        });
        if (response.ok) {
          const updatedCategory = await response.json();
          setCategories((prevCategories) =>
            prevCategories.map((cat) =>
              cat.id === editCategoryId ? updatedCategory : cat
            )
          );
          setEditCategoryId(null);
          setEditCategoryName('');
        } else {
          console.error('Failed to edit category');
        }
      } catch (error) {
        console.error('Error editing category:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteCategory = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clerkUserId: user?.id }),
      });
      if (response.ok) {
        setCategories((prevCategories) => prevCategories.filter((cat) => cat.id !== id));
      } else {
        console.error('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

      {/* Add Category Form (only for Admins and Mods) */}
      {(isAdmin || isMod) && (
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
              disabled={loading}
            />
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Image</span>
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input file-input-bordered w-full"
                    required
                />
            </div>
            <button 
              className="btn btn-primary ml-2" 
              onClick={handleAddCategory}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>
      )}

      {/* Edit Category Form (only for Admins and Mods) */}
      {(isAdmin || isMod) && editCategoryId !== null && (
        <div className="mb-6">
          <label className="label">
            <span className="label-text">Edit Category Name</span>
          </label>
          <div className="flex">
            <input 
              type="text" 
              placeholder="New category name" 
              className="input input-bordered flex-grow" 
              value={editCategoryName} 
              onChange={(e) => setEditCategoryName(e.target.value)} 
              disabled={loading}
            />
            <button 
              className="btn btn-primary ml-2" 
              onClick={handleEditCategory}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}

      {/* Category List */}
      <table className="table w-full">
        <thead>
          <tr>
            <th className="text-left">Category Name</th>
            {(isAdmin || isMod) && <th className="text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              {(isAdmin || isMod) && (
                <td className="text-right">
                  <button 
                    className="btn btn-sm btn-warning mr-2"
                    onClick={() => {
                      setEditCategoryId(category.id);
                      setEditCategoryName(category.name);
                    }}
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-error"
                    onClick={() => handleDeleteCategory(category.id)}
                    disabled={loading}
                  >
                    {loading ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategories;
