import React from 'react'
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { DB_URL } from '../../constants';

const UserAdding = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { user } = state;
    const [existed, setExisted] = useState(user == null ? false : true)

    const [name, setName] = useState(user != null ? user.name : "");
    const [phone, setPhone] = useState(user != null ? user.phone : "");
    const [email, setEmail] = useState(user != null ? user.email : "");
    const [duration, setDuration] = useState(0);

    const durations = [
        { label: "1 month", value: 1 },
        { label: "2 months", value: 2 },
        { label: "6 months", value: 6 },
        { label: "1 year", value: 12 }
    ];

    function addUser() {
        if (1) {
            let issuedDate = user == null ? new Date() : user.expiredDate;
            let expiredDate = new Date();
            expiredDate.setMonth(issuedDate.getMonth() + duration);

            fetch(DB_URL + "users", {
                method: "post",
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    // {
                    //     name: name,
                    //     phone: phone,
                    //     email: email,
                    //     issuedDate: issuedDate,
                    //     expiredDate: expiredDate
                    // }

                    {
                        name: "testmoreandmore7",
                        phone: "123456789",
                        email: "test@gmail.com",
                        issuedDate: "2022-02-13T14:45:15",
                        expiredDate: "2023-02-13T14:45:15"
                    }
                )
            })
                .then(navigate("/users"))
        }
    }

    return (
        <div className='users'>
            <h1>Users Management</h1>

            <div className="users-add">
                {existed ? <h2>Edit User</h2> : <h2>New User</h2>}

                <div className='users-add-details'>
                    <table>
                        <tbody>
                            <tr>
                                <td><p>Name</p></td>
                                <td><input
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></input></td>
                            </tr>
                            <tr>
                                <td><p>Phone</p></td>
                                <td><input
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                ></input></td>
                            </tr>
                            <tr>
                                <td><p>Email</p></td>
                                <td><input
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input></td>
                            </tr>
                            {existed ?
                                <>
                                    <tr>
                                        <td><p>Extend</p></td>
                                        <td><Select className='users-add-details-select'
                                            options={durations}
                                            placeholder="Extend"
                                            onChange={(e) => setDuration(e.value)}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>Expiration: {user.expiredDate}</td>
                                    </tr>
                                </> :
                                <tr>
                                    <td><p>Duration</p></td>
                                    <td><Select className='users-add-details-select'
                                        options={durations}
                                        placeholder="Duration"
                                        onChange={(e) => setDuration(e.value)}
                                    /></td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>

                <div className="users-add-footer">
                    <button className='btn-light' onClick={() => navigate("/users")}>Cancel</button>

                    <button
                        className='btn-yellow'
                        onClick={(event) => {
                            event.preventDefault();
                            addUser();
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserAdding