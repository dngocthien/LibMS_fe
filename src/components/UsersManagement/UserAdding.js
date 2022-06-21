import React from 'react'
import { useState } from 'react';

const AddUser = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState("");
    const [issuedDate, setIssuedDate] = useState(null);
    const [expiredDate, setExpiredDate] = useState(null);

    return (
        <div className='users'>
            <h1>Users Management</h1>

            <div className="users-add">
                <h2>New User</h2>

                <div>
                    <table>
                        <tr>
                            <td><p>Name</p></td>
                            <td><input
                                id="add_name"
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                            ></input></td>
                        </tr>
                        <tr>
                            <td><p>Phone</p></td>
                            <td><input
                                id="add_brand"
                                placeholder="Phone"
                                onChange={(e) => setPhone(e.target.value)}
                            ></input></td>
                        </tr>
                        <tr>
                            <td><p>Email</p></td>
                            <td><input
                                id="add_price"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            ></input></td>
                        </tr>
                    </table>
                </div>

                <div className="users-add-footer">
                    <button className='btn-light'>Cancel</button>

                    <button
                        className='btn-yellow'
                        onClick={(event) => {
                            event.preventDefault();
                            // saveProduct();
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddUser