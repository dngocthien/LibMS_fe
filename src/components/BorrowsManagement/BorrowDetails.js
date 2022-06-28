import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { DB_URL } from '../../constants';
import icon_lost from "../../assets/lost.png";
import "./BorrowsManagement.css"

const BorrowDetails = () => {
    const { state } = useLocation();
    const { userId } = state;
    const [searchQuery, setSearchQuery] = useState("");
    const [searchId, setSearchId] = useState(userId);
    const [booksData, setBooksData] = useState([]);

    const [userData, setUserData] = useState(null);
    const [transactionData, setTransactionData] = useState(null);
    const [borrowsData, setBorrowsData] = useState([]);

    useEffect(() => {
        if (searchId !== -1) {
            setTransactionData(null);
            setBorrowsData([]);
            setBooksData([]);
            fetch(DB_URL + "users/id/" + searchId,
                {
                    method: "get"
                })
                .then((res) => res.json())
                .then((result) => {
                    setUserData(result[0])
                });

            fetch(DB_URL + "transactions/user/" + searchId,
                {
                    method: "get"
                })
                .then((res) => res.json())
                .then((result) => {
                    if (result[0] != null) {
                        setTransactionData(result[0])

                        fetch(DB_URL + "borrows/transaction/" + result[0].id,
                            {
                                method: "get"
                            })
                            .then((res2) => res2.json())
                            .then((result2) => {
                                setBorrowsData(result2)
                            })
                    }
                });
        }
    }, [searchId]);

    function borrowBook() {
        if (booksData.length > 3) {
            alert("You can only borrow less than 5 books!")
            return;
        }
        let b = document.getElementById('input-book').value;
        fetch(DB_URL + "books/id/" + b,
            {
                method: "get"
            })
            .then((res) => res.json())
            .then((result) => {
                if (result[0] != null) {
                    let existing = booksData.slice();
                    let update = [...existing, result[0]];
                    console.log(update)
                    setBooksData(update);
                }
            });
        document.getElementById('input-book').value = "";

    }

    function saveTransaction() {

    }

    function removeBook(id) {
        let existing = booksData.slice();
        let update = existing.filter((_, i) => i !== id)
        setBooksData(update);
    }

    function returnBook(d, newStatus) {
        let existing = d;
        existing.status = newStatus;

        fetch(DB_URL + "borrows/" + d.id, {
            method: "PUT",
            mode: 'no-cors',
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(existing),
        });
    }

    function lostBook(id) {

    }

    function authorsToString(list) {
        let authors = "";
        list.map((a) => authors += a + ", ")
        return authors.slice(0, -2);
    };

    return (
        <div>
            <div className='view-header'>
                <h1>Borrows Details</h1>

                <input
                    className='search-small'
                    id="searching"
                    type="text"
                    placeholder="User ID"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { setSearchId(searchQuery); e.target.value = "" } }}
                />
            </div>

            <div className='borrows-details'>
                {userData !== null && userData !== undefined && userData !== [] ?
                    <div>
                        <h2>User ID: {userData.id}</h2>
                        <p>Name: {userData.name}</p>
                        <p>Email: {userData.email}</p>


                        {/* {transactionData==null?
                            <div className='view-center'>
                                <input
                                    className='search-tiny'
                                    id="input-book"
                                    type="text"
                                    placeholder="Book ID"
                                    onKeyDown={(e) => { if (e.key === 'Enter') borrowBook() }}
                                />
                                <button className='btn-light' onClick={() => borrowBook()}>
                                    Borrow
                                </button>
                            </div>
                            :
                            <></>
                        } */}


                        {borrowsData.length > 0 ?
                            <div className='view-container'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Book ID</th>
                                            <th>Status</th>
                                            <th>Lost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {borrowsData.map((d, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                    className={index % 2 === 0 ? "highlight" : ""}
                                                >
                                                    <td>{d.bookId}</td>
                                                    <td>
                                                        <button className='btn-border' onClick={() => returnBook(d, !d.status)}>
                                                            {d.status ? "Retured" : "Not returned"}
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <img
                                                            src={icon_lost}
                                                            alt="lost"
                                                            onClick={() => lostBook(index)}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            :
                            <div className='view-center'>
                                <input
                                    className='search-tiny'
                                    id="input-book"
                                    type="text"
                                    placeholder="Book ID"
                                    onKeyDown={(e) => { if (e.key === 'Enter') borrowBook() }}
                                />
                                <button className='btn-light' onClick={() => borrowBook()}>
                                    Borrow
                                </button>
                            </div>
                        }
                        {booksData.length > 0 ?
                            <div className='view-container'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Book ID</th>
                                            <th>Title</th>
                                            <th>Authors</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {booksData.map((d, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                    className={index % 2 === 0 ? "highlight" : ""}
                                                >
                                                    <td>{d.id}</td>
                                                    <td>{d.title}</td>
                                                    <td>{authorsToString(d.authors)}</td>
                                                    <td>
                                                        <img
                                                            src={icon_lost}
                                                            alt="remove"
                                                            onClick={() => removeBook(index)}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            : <></>
                        }

                        {booksData.length > 0 ?
                            <div className='view-center'>
                                <button className='btn-light-small' onClick={() => saveTransaction()}>Done</button>
                            </div>
                            : <></>
                        }
                    </div>
                    :
                    (searchId != -1 ? <h2>User ID is not existed</h2> : <></>)}
            </div>
        </div>
    )
}

export default BorrowDetails