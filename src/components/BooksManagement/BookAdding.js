import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { DB_URL } from '../../constants';

const BookAdding = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [edition, setEdition] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [authors, setAuthors] = useState([]);
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        fetch(DB_URL + "categories",
            {
                method: "get"
            })
            .then((res) => res.json())
            .then((result) => {
                let list = []
                result.map((c) => {
                    list = [...list, { label: c.name, value: c.id }]
                })
                setCategories(list);
            });
    }, []);


    return (
        <div className='users'>
            <h1>Books Management</h1>

            <div className="users-add">
                <h2>New Book</h2>

                <div className='users-add-details'>
                    <table>
                        <tbody>
                            <tr>
                                <td><p>Title</p></td>
                                <td><input
                                    placeholder="Title"
                                    onChange={(e) => setTitle(e.target.value)}
                                ></input></td>
                            </tr>
                            <tr>
                                <td><p>Edition</p></td>
                                <td><input
                                    placeholder="Edition"
                                    onChange={(e) => setEdition(e.target.value)}
                                ></input></td>
                            </tr>
                            <tr>
                                <td><p>Price</p></td>
                                <td><input
                                    placeholder="Price"
                                    onChange={(e) => setPrice(e.target.value)}
                                ></input></td>
                            </tr>
                            <tr>
                                <td><p>Quantity</p></td>
                                <td><input
                                    placeholder="Quantity"
                                    onChange={(e) => setQuantity(e.target.value)}
                                ></input></td>
                            </tr>
                            <tr>
                                <td><p>Category</p></td>
                                <td><Select className='books-add-details-select'
                                    options={categories}
                                    placeholder="Category"
                                    onChange={(e) => setCategory(e.value)}
                                /></td>
                            </tr>
                            <tr>
                                <td><p>Authors</p></td>
                                <td><input
                                    id="add_price"
                                    placeholder="Author 1, Author 2"
                                    onChange={(e) => setAuthors(e.target.value.split(','))}
                                ></input></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="users-add-footer">
                    <button className='btn-light' onClick={() => navigate("/books")}>Cancel</button>

                    <button
                        className='btn-yellow'
                        onClick={(event) => {
                            event.preventDefault();
                            // addUser();
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookAdding