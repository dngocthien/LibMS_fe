import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { DB_URL } from '../../constants';
import icon_lost from "../../assets/dot.png";
import "./BorrowsManagement.css"

const TransactionDetails = () => {
    const { state } = useLocation();
    const { userId } = state;
    const [searchQuery, setSearchQuery] = useState("");
    const [searchId, setSearchId] = useState(userId);
    const [booksData, setBooksData] = useState([]);

    const [userData, setUserData] = useState(null);
    const [transactionData, setTransactionData] = useState(null);
    const [borrowsData, setBorrowsData] = useState([]);
    const [lostedBook, setLostedBook] = useState(null);
    const [lostedBorrow, setLostedBorrow] = useState(null);

    useEffect(() => {
        if (searchId !== -1) {
            loadUserData();
        }
    }, [searchId]);

    useEffect(() => {
        if (searchId !== -1) {
            loadTransactionData();
            loadBorrowsData();
        }
    }, [userData]);

    function loadUserData() {
        setUserData(null);
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
    }

    function loadTransactionData() {
        fetch(DB_URL + "transactions/user/" + searchId,
            {
                method: "get"
            })
            .then((res) => res.json())
            .then((result) => {
                if (result[0] != null) {
                    setTransactionData(result[0])
                }
            });
    }

    function loadBorrowsData() {
        fetch(DB_URL + "borrows/user/" + searchId,
            {
                method: "get"
            })
            .then((res2) => res2.json())
            .then((result2) => {
                setBorrowsData(result2)
            })
    }

    // add book to book list (to borrow)
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
                    setBooksData(update);
                }
            });
        document.getElementById('input-book').value = "";
    }

    // remove book from book list (not borrow any more)
    function removeBook(id) {
        let existing = booksData.slice();
        let update = existing.filter((_, i) => i !== id)
        setBooksData(update);
    }

    // save transaction, save book list to db borrows
    function saveTransaction() {
        let transaction = {
            issuedDate: new Date(),
            dueDate: new Date(),
            finished: false,
            userId: userData.id
        }

        let list = []
        booksData.map((b) => {
            list = [...list, { returnDate: null, status: false, bookId: b.id, transactionId: null }]
        })

        fetch(DB_URL + "transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    transaction: {
                        issuedDate: new Date(),
                        dueDate: new Date(),
                        finished: false,
                        userId: userData.id
                    }, list: null
                }
            )
        })
            .then(loadUserData())
        // .then((res) => res.json())
        // .then((result) => {
        //     let list = []
        //     booksData.map((b) => {
        //         list = [...list, { returnDate: null, status: false, bookId: b.id, transactionId: result.id }]
        //     })

        //     fetch(DB_URL + "borrows/many", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(
        //             list
        //         )
        //     })
        // })
        // .then(loadUserData())

    }

    // change return satatus each book
    function returnBook(d) {
        let existing = d;
        existing.status = !existing.status;
        existing.status ? existing.returnDate = new Date() : existing.returnDate = null;

        fetch(DB_URL + "borrows/" + d.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(existing),
        })
            .then(loadBorrowsData())
    }

    function checkReturned() {
        let returned = true;
        borrowsData.map((b) => {
            if (b.status == false) {
                returned = false
            }
        })
        return returned;
    }

    // 
    function closeTransaction() {
        let updating = transactionData;
        updating.finished = true;
        fetch(DB_URL + "transactions/" + transactionData.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updating),
        })
            .then((res) => loadUserData())
    }

    function lostBook(borrow) {
        setLostedBorrow(borrow)

        fetch(DB_URL + "books/id/" + borrow.bookId, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                setLostedBook(result[0])
            })
    }

    function saveLost() {
        returnBook(lostedBorrow)
        fetch(DB_URL + "losts/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    lostDate: new Date(),
                    fee: lostedBook.price,
                    bookId: lostedBook.id,
                    userId: userData.id
                }
            )
        })
            .then(setLostedBook(null))
    }

    function authorsToString(list) {
        let authors = "";
        list.map((a) => authors += a + ", ")
        return authors.slice(0, -2);
    };

    return (
        <div>
            <div className='view-header'>
                <h1>Transaction Details</h1>

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

                        {borrowsData.length > 0 ?
                            <>
                                {/* Show borrows data */}
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
                                                            <button className='btn-border' onClick={() => returnBook(d)}>
                                                                {d.status ? "Returned" : "Not returned"}
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <img
                                                                src={icon_lost}
                                                                alt="lost"
                                                                onClick={() => lostBook(d)}
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {
                                    checkReturned() ?
                                        <div className='view-center'>
                                            <button className='btn-light' onClick={() => closeTransaction()}>
                                                Done
                                            </button>
                                        </div>
                                        : <></>
                                }

                            </>
                            :
                            // Borrow book
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
                            <>
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
                                <div className='view-center'>
                                    <button className='btn-light-small' onClick={() => saveTransaction()}>Done</button>
                                </div>
                            </>
                            : <></>
                        }
                    </div>
                    :
                    (searchId != -1 ? <h2>User ID is not existed</h2> : <></>)}
            </div>

            {lostedBook != null ?
                <>
                    <div className='borrows-lost-background'></div>
                    <div className='borrows-lost'>
                        <h3>Losted Book Details</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td><p>Book ID:</p></td>
                                    <td><p>{lostedBook.id}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Title:</p></td>
                                    <td><p>{lostedBook.title}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Fee:</p></td>
                                    <td><p>{lostedBook.price}$</p></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="borrows-lost-bottom">
                            <button className='btn-light' onClick={() => setLostedBook(null)}>Cancel</button>
                            <button className='btn-yellow' onClick={() => saveLost()}>Save</button>
                        </div>
                    </div>
                </>
                :
                <></>
            }
        </div>
    )
}

export default TransactionDetails