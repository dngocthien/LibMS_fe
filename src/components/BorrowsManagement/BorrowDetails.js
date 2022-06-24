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
    const [searchId, setSearchId] = useState(userId)
    const [userData, setUserData] = useState(null);
    const [transactionData, setTransactionData] = useState(null);
    const [borrowsData, setBorrowsData] = useState([]);

    // const [borrows, setBorrows] = useState([]);


    useEffect(() => {
        if (searchId != -1) {
            setTransactionData(null);
            setBorrowsData([]);
            fetch(DB_URL + "users/id/" + searchId,
                {
                    method: "get"
                })
                .then((res) => res.json())
                .then((result) => {
                    // console.log(result)
                    if (result != null)
                        setUserData(result[0]);
                });
            fetch(DB_URL + "transactions/user/" + searchId,
                {
                    method: "get"
                })
                .then((res) => res.json())
                .then((result) => {
                    if (result[0] != null) {
                        setTransactionData(result[0]);
                        console.log(result[0])
                    }
                });

        }
    }, [searchId]);

    function borrowBook() {
        let b = document.getElementById('input-book').value;
        let existing = borrowsData.slice();
        let update = [...existing, { bookId: b, status: false }];
        setBorrowsData(update);
    }

    function saveTransaction() {

    }

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
                    onKeyDown={(e) => { if (e.key === 'Enter') setSearchId(searchQuery) }}
                />
            </div>

            <div className='borrows-details'>
                {userData != null && userData != undefined && userData != [] ?
                    <div>
                        <h2>User ID: {userData.id}</h2>
                        <p>Name: {userData.name}</p>
                        <p>Email: {userData.email}</p>


                        {transactionData == null ?
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
                        }


                        {borrowsData != [] ?
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
                                                    <td>{d.status ? "Returned" : "Not Returned"}</td>
                                                    <td>
                                                        <img
                                                            src={icon_lost}
                                                            alt="lost"
                                                        // onClick={() => navigate("/borrows/details", { state: { userId: d.userId } })}
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
                        {borrowsData.length > 0 ?
                            <div className='view-center'>
                                <button className='btn-light-small' onClick={() => saveTransaction()}>Done</button>
                            </div>
                            : <></>
                        }
                    </div>
                    :
                    (searchId != -1 ? <h2>User ID not existed</h2> : <></>)}
            </div>
        </div>
    )
}

export default BorrowDetails