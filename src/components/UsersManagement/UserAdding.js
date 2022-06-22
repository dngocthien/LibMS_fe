import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { DB_URL } from '../../constants';

const UserAdding = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [duration, setDuration] = useState(0);

    const durations = [
        { label: "1 month", value: 1 },
        { label: "2 months", value: 2 },
        { label: "6 months", value: 6 },
        { label: "1 year", value: 12 }
    ];

    function addUser() {
        if (1) {
            let issuedDate = new Date();
            let expiredDate = new Date();
            expiredDate.setMonth(issuedDate.getMonth() + duration);

            console.log(name + ":" + phone + ":" + email + ":" + issuedDate + ":" + expiredDate);

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
                        "name": "testmoreandmore4",
                        "phone": "123456789",
                        "email": "test@gmail.com",
                        "issuedDate": "2022-02-13T14:45:15",
                        "expiredDate": "2023-02-13T14:45:15"
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
                <h2>New User</h2>

                <div className='users-add-details'>
                    <table>
                        <tbody>
                            <tr>
                                <td><p>Name</p></td>
                                <td><input
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                ></input></td>
                            </tr>
                            <tr>
                                <td><p>Phone</p></td>
                                <td><input
                                    placeholder="Phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                ></input></td>
                            </tr>
                            <tr>
                                <td><p>Email</p></td>
                                <td><input
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input></td>
                            </tr>
                            <tr>
                                <td><p>Duration</p></td>
                                <td><Select className='users-add-details-select'
                                    options={durations}
                                    placeholder="Duration"
                                    onChange={(e) => setDuration(e.value)}
                                /></td>
                            </tr>
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