"use client";
import { Book, Category } from '@prisma/client';
import React, { useState } from 'react';

interface UpdateModalProps {
    book: Book | null;
    categories: Category[];
    onUpdate: (updatedBook: Omit<Book, 'userId' | 'id'>) => void;
    onClose: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ book, categories, onUpdate, onClose }) => {
    const [updatedBook, setUpdatedBook] = useState<Omit<Book, 'userId' | 'id'>>({
        title: book?.title ?? '',
        description: book?.description ?? '',
        publishedAt: book?.publishedAt ? new Date(book.publishedAt) : new Date(),
        authorname: book?.authorname ?? '',
        categoryId: book?.categoryId ?? 0,
        downloads: book?.downloads ?? 0,
        image: book?.image ?? '',
        size: book?.size ?? 0,
        path: book?.path ?? '',
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'number' ? parseInt(value, 10) : value;

        setUpdatedBook(prevBook => ({
            ...prevBook,
            [name]: newValue
        }));
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedBook(prevBook => ({
            ...prevBook,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedImage(file);
    };

    const handleUpdateBook = () => {
        onUpdate(updatedBook);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="modal modal-open">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Book</h3>

                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={updatedBook.title}
                                onChange={handleInputChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                name="description"
                                value={updatedBook.description ?? ''}
                                onChange={handleTextAreaChange}
                                className="textarea textarea-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Author</span>
                            </label>
                            <input
                                type="text"
                                name="authorname"
                                value={updatedBook.authorname ?? ''}
                                onChange={handleInputChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select
                                name="categoryId"
                                value={updatedBook.categoryId}
                                onChange={handleInputChange}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value={0} disabled>
                                    Select Category
                                </option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Published Date</span>
                            </label>
                            <input
                                type="date"
                                name="publishedAt"
                                value={updatedBook.publishedAt.toISOString().split('T')[0]}
                                onChange={handleInputChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">File</span>
                            </label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="file-input file-input-bordered w-full"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="file-input file-input-bordered w-full"
                            />
                        </div>
                    </div>

                    <div className="modal-action">
                        <button className="btn btn-primary" onClick={handleUpdateBook}>
                            Update
                        </button>
                        <button className="btn" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateModal;
