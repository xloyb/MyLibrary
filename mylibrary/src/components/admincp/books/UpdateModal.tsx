import { Book } from "@prisma/client";
import { useState } from "react";

const UpdateBookModal: React.FC<{ book: Book; onClose: () => void; onUpdate: (updatedBook: Book) => void }> = ({ book, onClose, onUpdate }) => {
    const [updatedBook, setUpdatedBook] = useState(book);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedBook(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`/api/books`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBook),
            });
    
            if (response.ok) {
                const updatedBookFromServer = await response.json();
                onUpdate(updatedBookFromServer);
                onClose();
            } else {
                throw new Error('Failed to update book');
            }
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };
    

    return (
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
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            name="description"
                            value={updatedBook.description  ?? ''}
                            onChange={handleInputChange}
                            className="textarea textarea-bordered w-full"
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
                        />
                    </div>

                    {/* Add more fields as needed */}
                </div>

                <div className="modal-action">
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Save Changes
                    </button>
                    <button className="btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
export default UpdateBookModal;
