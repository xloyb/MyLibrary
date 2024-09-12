/* eslint-disable @next/next/no-img-element */



"use client";
import { useAuth } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';
import UpdateBookModal from './UpdateModal';
import { book } from '@prisma/client';  // Importing Prisma's book type

type Category = {
    id: number;
    name: string;
};

const ManageBooks: React.FC = () => {
    const [newBook, setNewBook] = useState<Omit<book, 'userId' | 'id'>>({
        title: '',
        description: '',  // Ensure that description is initialized as an empty string
        publishedAt: new Date(),
        authorname: '',    // Ensure that authorname is initialized as an empty string
        categoryId: 0,
        downloads: 0,
        image: '',
        size: 0,
        path: ''
    });

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [books, setBooks] = useState<book[]>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<book | null>(null);

    const { userId: clerkUserId } = useAuth();

    const openUpdateModal = (book: book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsModalOpen(false);
        setSelectedBook(null);
    };

    useEffect(() => {
        const fetchUserId = async () => {
            if (!clerkUserId) return;

            try {
                const response = await fetch(`/api/userRoles?clerkUserId=${clerkUserId}`);
                if (response.ok) {
                    const user = await response.json();
                    setUserId(user.id);
                } else {
                    console.error('Failed to fetch user ID');
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

        fetchUserId();
    }, [clerkUserId]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                if (response.ok) {
                    const categories = await response.json();
                    setCategories(categories);
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('/api/books');
                if (response.ok) {
                    const books = await response.json();
                    setBooks(books);
                } else {
                    console.error('Failed to fetch books');
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'number' ? parseInt(value, 10) : value;

        setNewBook(prevBook => ({
            ...prevBook,
            [name]: newValue
        }));
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewBook(prevBook => ({
            ...prevBook,
            [name]: value
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewBook(prevBook => ({
            ...prevBook,
            [name]: parseInt(value, 10)
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            const fileSizeInMB = file.size / 1024 / 1024;
            setSelectedFile(file);
            setNewBook(prevBook => ({
                ...prevBook,
                size: parseFloat(fileSizeInMB.toFixed(2))
            }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedImage(file);
    };

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append('filepond', file);

        try {
            const response = await fetch('/api/update-pdf', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const { path } = await response.json();
                return path;
            } else {
                throw new Error('Failed to upload file');
            }
        } catch (error) {
            console.error('File upload failed:', error);
            throw error;
        }
    };

    const uploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const { filename } = await response.json();
                return filename;
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Image upload failed:', error);
            throw error;
        }
    };

    // const handleAddBook = async () => {
    //     if (
    //         !newBook.title.trim() ||
    //         !newBook.description?.trim() ||  // Use optional chaining to avoid null issue
    //         !newBook.authorname?.trim() ||  // Use optional chaining to avoid null issue
    //         newBook.categoryId === 0 ||
    //         !selectedFile ||
    //         !selectedImage
    //     ) {
    //         alert('Please fill in all the required fields.');
    //         return;
    //     }

    //     if (!userId) {
    //         console.error('User ID is not available');
    //         return;
    //     }

    //     setLoading(true);
    //     setUploadError(null);

    //     try {
    //         let filePath = '';
    //         let imagePath = '';

    //         if (selectedFile) {
    //             filePath = await uploadFile(selectedFile);
    //         }

    //         if (selectedImage) {
    //             imagePath = await uploadImage(selectedImage);
    //         }

    //         const response = await fetch('/api/books', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ ...newBook, userId, path: filePath, image: imagePath }),
    //         });

    //         if (response.ok) {
    //             const book = await response.json();
    //             setBooks(prevBooks => [...prevBooks, book]);
    //             setNewBook({
    //                 title: '',
    //                 description: '',
    //                 publishedAt: new Date(),
    //                 authorname: '',
    //                 categoryId: 0,
    //                 downloads: 0,
    //                 image: '',
    //                 size: 0,
    //                 path: ''
    //             });
    //             setSelectedFile(null);
    //             setSelectedImage(null);
    //             alert('Book added successfully!');
    //         } else {
    //             throw new Error('Failed to add book');
    //         }
    //     } catch (error) {
    //         console.error('Error adding book:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

//     const handleAddBook = async () => {
//         if (
//             !newBook.title.trim() ||
//             !newBook.description?.trim() ||
//             !newBook.authorname?.trim() ||
//             newBook.categoryId === 0 ||
//             !selectedFile ||
//             !selectedImage
//         ) {
//             alert('Please fill in all the required fields.');
//             return;
//         }
    
//         if (!userId) {
//             console.error('User ID is not available');
//             return;
//         }
    
//         setLoading(true);
//         setUploadError(null);
    
//         try {
//             let filePath = '';
//             let imagePath = '';
    
//             if (selectedFile) {
//                 filePath = await uploadFile(selectedFile);
//             }
    
//             if (selectedImage) {
//                 imagePath = await uploadImage(selectedImage);
//             }
    
//             // Ensure publishedAt is a valid Date object, default to today if undefined or null
// // const validPublishedAt = newBook.publishedAt ? new Date(newBook.publishedAt) : new Date();
// const validPublishedAt = newBook.publishedAt
//         ? new Date(newBook.publishedAt).toISOString() // Convert to ISO string
//         : new Date().toISOString(); // Default to now if not provided
//         const publishedAt = new Date().toISOString();             
// const response = await fetch('/api/books', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ ...newBook, userId, path: filePath, image: imagePath, publishedAt:validPublishedAt }),
//             });
    
//             if (response.ok) {
//                 const book = await response.json();
//                 setBooks(prevBooks => [...prevBooks, book]);
//                 setNewBook({
//                     title: '',
//                     description: '',
//                     publishedAt: new Date(),  // Reset to current date
//                     authorname: '',
//                     categoryId: 0,
//                     downloads: 0,
//                     image: '',
//                     size: 0,
//                     path: ''
//                 });
//                 setSelectedFile(null);
//                 setSelectedImage(null);
//                 alert('Book added successfully!');
//             } else {
//                 throw new Error('Failed to add book');
//             }
//         } catch (error) {
//             console.error('Error adding book:', error);
//         } finally {
//             setLoading(false);
//         }
//     };
// Assuming `publishedAt` is a string and needs to be a Date type
const handleAddBook = async () => {
    if (!newBook.title.trim() || !newBook.description?.trim() || !newBook.authorname?.trim() || newBook.categoryId === 0 || !selectedFile || !selectedImage) {
        alert('Please fill in all the required fields.');
        return;
    }

    if (!userId) {
        console.error('User ID is not available');
        return;
    }

    setLoading(true);
    setUploadError(null);

    try {
        const filePath = selectedFile ? await uploadFile(selectedFile) : '';
        const imagePath = selectedImage ? await uploadImage(selectedImage) : '';
        // Convert the string to Date object before sending
        const validPublishedAt = newBook.publishedAt ? new Date(newBook.publishedAt) : new Date();
        const finalPublishedAt = newBook.publishedAt ? new Date(newBook.publishedAt).toISOString() : new Date().toISOString();

        const response = await fetch('/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                ...newBook, 
                userId, 
                path: filePath, 
                image: imagePath, 
                publishedAt: finalPublishedAt // Convert Date to ISO string
            }),
        });
        console.log('PublishedAt:', newBook.publishedAt);
        if (!response.ok) throw new Error('Failed to add book');

        const book = await response.json();
        setBooks(prevBooks => [...prevBooks, book]);
        setNewBook({
            title: '',
            description: '',
            publishedAt: null, // Set to null for default state
            authorname: '',
            categoryId: 0,
            downloads: 0,
            image: '',
            size: 0,
            path: ''
        });
        
        setSelectedFile(null);
        setSelectedImage(null);
        alert('Book added successfully!');
    } catch (error) {
        console.error('Error adding book:', error);
        alert('An error occurred while adding the book.');
    } finally {
        setLoading(false);
    }
};



    
    const handleDeleteBook = async (bookId: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this book?');

        if (!confirmDelete) {
            return;
        }

        setLoading(true);
        setUploadError(null);

        try {
            const response = await fetch(`/api/books?id=${bookId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
                alert('Book deleted successfully!');
            } else {
                throw new Error('Failed to delete book');
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            setUploadError('Failed to delete book.');
            alert('An error occurred while trying to delete the book.');
        } finally {
            setLoading(false);
        }
    };

    return (
//         <div className="container mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-6">Manage Books</h1>

           

//             {/* Add Book Section */}
//             <div className="mt-8">
//                 <h2 className="text-xl font-bold mb-4">Add a New Book</h2>
//                 <div className="bg-white shadow-md rounded-lg p-6">
//                     {/* Add Book Form */}
//                     <div className="grid grid-cols-1 gap-6">
//                         <div>
//                             <label htmlFor="title" className="block font-semibold">Title</label>
//                             <input
//                                 type="text"
//                                 id="title"
//                                 name="title"
//                                 value={newBook.title}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 rounded-md p-2"
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="description" className="block font-semibold">Description</label>
//                             <textarea
//                                 id="description"
//                                 name="description"
//                                 value={newBook.description ?? ''} // Safe fallback if description is null
//                                 onChange={handleTextAreaChange}
//                                 className="w-full border border-gray-300 rounded-md p-2"
//                             ></textarea>
//                         </div>
//                         <div>
//                             <label htmlFor="authorname" className="block font-semibold">Author Name</label>
//                             <input
//                                 type="text"
//                                 id="authorname"
//                                 name="authorname"
//                                 value={newBook.authorname ?? ''} // Safe fallback if authorname is null
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 rounded-md p-2"
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="categoryId" className="block font-semibold">Category</label>
//                             <select
//                                 id="categoryId"
//                                 name="categoryId"
//                                 value={newBook.categoryId}
//                                 onChange={handleSelectChange}
//                                 className="w-full border border-gray-300 rounded-md p-2"
//                             >
//                                 <option value="0">Select Category</option>
//                                 {categories.map((category) => (
//                                     <option key={category.id} value={category.id}>{category.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div>
//                             <label htmlFor="file" className="block font-semibold">Upload PDF</label>
//                             <input
//                                 type="file"
//                                 id="file"
//                                 accept=".pdf"
//                                 onChange={handleFileChange}
//                                 className="w-full border border-gray-300 rounded-md p-2"
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="image" className="block font-semibold">Upload Image</label>
//                             <input
//                                 type="file"
//                                 id="image"
//                                 accept="image/*"
//                                 onChange={handleImageChange}
//                                 className="w-full border border-gray-300 rounded-md p-2"
//                             />
//                         </div>
//                     </div>

//                     <div className="mt-4">
//                         <button
//                             onClick={handleAddBook}
//                             disabled={loading}
//                             className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
//                         >
//                             {loading ? 'Adding...' : 'Add Book'}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//  {/* Book Listing */}
//  <div className="flex flex-wrap -mx-4">
//                 {books.map((book) => (
//                     <div key={book.id} className="w-full md:w-1/3 px-4 mb-6">
//                         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//                             <img src={`/images/books/${book.image ||''}`} alt={book.title} className="w-full h-48 object-cover" />
//                             <div className="p-4">
//                                 <h2 className="text-xl font-semibold">{book.title}</h2>
//                                 <p>{book.description}</p>
//                                 <p className="text-gray-500">Author: {book.authorname}</p>
//                                 <p className="text-gray-500">Category: {categories.find(category => category.id === book.categoryId)?.name}</p>
//                                 <p className="text-gray-500">Published: xxxx</p>
//                                 <div className="flex justify-between mt-4">
//                                     <button
//                                         onClick={() => openUpdateModal(book)}
//                                         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//                                     >
//                                         Update
//                                     </button>
//                                     <button
//                                         onClick={() => handleDeleteBook(book.id)}
//                                         className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Update Book Modal */}
//             {selectedBook && (
//                 // <UpdateBookModal
//                 //     isOpen={isModalOpen}
//                 //     book={selectedBook}
//                 //     onClose={closeUpdateModal}
//                 //     onUpdate={() => setBooks(prev => prev.map(b => (b.id === selectedBook.id ? selectedBook : b)))}
//                 // />

                
//                 // <UpdateBookModal
//                 //         book={selectedBook}
//                 //         onClose={() => setIsModalOpen(false)}
//                 //         onUpdate={(updatedBook) => {
//                 //             setBooks(books.map(book => 
//                 //                 book.id === updatedBook.id
//                 //                     ? {
//                 //                         ...updatedBook,
//                 //                         description: updatedBook.description ?? "",  
//                 //                         authorname: updatedBook.authorname ?? "",    
//                 //                         image: updatedBook.image ?? "",              
//                 //                         size: updatedBook.size ?? 0 
//                 //                     }
//                 //                     : book
//                 //             ));
//                 //         }}
//                 //     />

//                 <UpdateBookModal
//     book={{
//         ...selectedBook,
//         publishedAt: selectedBook.publishedAt ? new Date(selectedBook.publishedAt) : null
//     }}
//     onClose={() => setIsModalOpen(false)}
//     onUpdate={(updatedBook) => {
//         setBooks(books.map(book =>
//             book.id === updatedBook.id
//                 ? {
//                     ...updatedBook,
//                     description: updatedBook.description ?? "",
//                     authorname: updatedBook.authorname ?? "",
//                     image: updatedBook.image ?? "",
//                     size: updatedBook.size ?? 0,
//                     publishedAt: updatedBook.publishedAt ? new Date(updatedBook.publishedAt) : null // Ensure correct type
//                 }
//                 : book
//         ));
//     }}
// />




//             )}
//         </div>
<div className="container mx-auto p-6">
    <h1 className="text-2xl font-bold mb-6">Manage Books</h1>

    {/* Add Book Section */}
    <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Add a New Book</h2>
        <div className="bg-base-100 shadow-md rounded-lg p-6">
            {/* Add Book Form */}
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label htmlFor="title" className="block font-semibold">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={newBook.title}
                        onChange={handleInputChange}
                        className="w-full border border-base-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block font-semibold">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={newBook.description ?? ''} // Safe fallback if description is null
                        onChange={handleTextAreaChange}
                        className="w-full border border-base-300 rounded-md p-2"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="authorname" className="block font-semibold">Author Name</label>
                    <input
                        type="text"
                        id="authorname"
                        name="authorname"
                        value={newBook.authorname ?? ''} // Safe fallback if authorname is null
                        onChange={handleInputChange}
                        className="w-full border border-base-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label htmlFor="categoryId" className="block font-semibold">Category</label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        value={newBook.categoryId}
                        onChange={handleSelectChange}
                        className="w-full border border-base-300 rounded-md p-2"
                    >
                        <option value="0">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="file" className="block font-semibold">Upload PDF</label>
                    <input
                        type="file"
                        id="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="w-full border border-base-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block font-semibold">Upload Image</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border border-base-300 rounded-md p-2"
                    />
                </div>
            </div>

            <div className="mt-4">
                <button
                    onClick={handleAddBook}
                    disabled={loading}
                    className="bg-success hover:bg-success/80 text-base-100 font-bold py-2 px-4 rounded"
                >
                    {loading ? 'Adding...' : 'Add Book'}
                </button>
            </div>
        </div>
    </div>

    {/* Book Listing */}
    <div className="flex flex-wrap -mx-4">
        {books.map((book) => (
            <div key={book.id} className="w-full md:w-1/3 px-4 mb-6">
                <div className="bg-base-100 shadow-md rounded-lg overflow-hidden">
                    <img src={`/images/books/${book.image || ''}`} alt={book.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold">{book.title}</h2>
                        <p>{book.description}</p>
                        <p className="text-base-content">Author: {book.authorname}</p>
                        <p className="text-base-content">Category: {categories.find(category => category.id === book.categoryId)?.name}</p>
                        <p className="text-base-content">Published: xxxx</p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => openUpdateModal(book)}
                                className="bg-primary hover:bg-primary/80 text-base-100 font-bold py-2 px-4 rounded"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDeleteBook(book.id)}
                                className="bg-danger hover:bg-danger/80 text-base-100 font-bold py-2 px-4 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>

    {/* Update Book Modal */}
    {selectedBook && (
        <UpdateBookModal
            book={{
                ...selectedBook,
                publishedAt: selectedBook.publishedAt ? new Date(selectedBook.publishedAt) : null
            }}
            onClose={() => setIsModalOpen(false)}
            onUpdate={(updatedBook) => {
                setBooks(books.map(book =>
                    book.id === updatedBook.id
                        ? {
                            ...updatedBook,
                            description: updatedBook.description ?? "",
                            authorname: updatedBook.authorname ?? "",
                            image: updatedBook.image ?? "",
                            size: updatedBook.size ?? 0,
                            publishedAt: updatedBook.publishedAt ? new Date(updatedBook.publishedAt) : null // Ensure correct type
                        }
                        : book
                ));
            }}
        />
    )}
</div>

    );
};

export default ManageBooks;
