import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { DB_URL } from '../../constants';

const BookDetails = () => {
    const navigate = useNavigate();
    const locate = useLocation();
    const { state } = locate;
    const { book } = state;
    const [existed, setExisted] = useState(book == null ? false : true)

    const [title, setTitle] = useState(book != null ? book.title : "");
    const [edition, setEdition] = useState(book != null ? book.edition : "");
    const [price, setPrice] = useState(book != null ? book.price : "");
    const [quantity, setQuantity] = useState(book != null ? book.quantity : "");
    const [authors, setAuthors] = useState(book != null ? authorsToString(book.authors) : "");
    const [categoryId, setCategoryId] = useState(book != null ? book.categoryId : null);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        fetch(DB_URL + "categories",
            {
                // mode: 'no-cors',
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

    function authorsToString(list) {
        let authors = "";
        list.map((a) => authors += a + ", ")
        return authors.slice(0, -2);
    };

    function authorsToList(text) {
        return text.split(',');
    }

    function addBook() {
        let b = {
            'title': "test react post",
            'edition': 1,
            'price': 35,
            'authors': ["author 1", "author 2"],
            'categoryId': 2
        }
        const formData = new FormData();
        formData.append("book", b);
        fetch(DB_URL + "books", {
            method: "post",
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
                // JSON.stringify(
                    // {
                    //     name: name,
                    //     phone: phone,
                    //     email: email,
                    //     issuedDate: issuedDate,
                    //     expiredDate: expiredDate
                    // }
                // )
        })
        // .then(navigate("/books"))
    }

    return (
        <div>
            <h1>Books Management</h1>

            <div className="users-add">
                {existed ? <h2>Edit Book</h2> : <h2>New Book</h2>}

                <div className='users-add-details'>
                    <table>
                        <tbody>
                            <tr>
                                <td><p>Title</p></td>
                                <td><input
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                ></input></td>
                            </tr>
                            <tr>
                                <td><p>Edition</p></td>
                                <td><input
                                    placeholder="Edition"
                                    value={edition}
                                    onChange={(e) => setEdition(e.target.value)}
                                ></input></td>
                            </tr>
                            <tr>
                                <td><p>Price</p></td>
                                <td><input
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></input></td>
                            </tr>
                            <tr>
                                <td><p>Quantity</p></td>
                                <td><input
                                    placeholder="Quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                ></input></td>
                            </tr>
                            <tr>
                                <td><p>Authors</p></td>
                                <td><input
                                    value={authors}
                                    placeholder="Author 1, Author 2"
                                    onChange={(e) => setAuthors(e.target.value)}
                                ></input></td>
                            </tr>
                            <tr>
                                <td><p>Category</p></td>
                                <td><Select className='books-add-details-select'
                                    options={categories}
                                    placeholder="Category"
                                    onChange={(e) => setCategoryId(e.value)}
                                /></td>
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
                            addBook();
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookDetails