import React from 'react'
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { DB_URL } from '../../constants';

const BorrowDetails = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { user } = state;
    const [searchQuery, setSearchQuery] = useState("");
    const [existed, setExisted] = useState(user == null ? false : true)

    const [name, setName] = useState(user != null ? user.name : "");

    function addBorrow() {

    }

    return (
        <div className='users'>
            <div className='view-header'>
                <h1>Borrows Details</h1>

                <input
                    className='search-small'
                    id="searching"
                    type="text"
                    placeholder="User ID"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>


        </div>
    )
}

export default BorrowDetails