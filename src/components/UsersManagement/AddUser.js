import React from 'react'
import { useState } from 'react';

const AddUser = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState("");
    const [issuedDate, setIssuedDate] = useState(null);
    const [expiredDate, setExpiredDate] = useState(null);

    return (
        <div className="users-add">
            <h3>Add User</h3>
            <div className="users-add-container">
                <div className="admin-products-add-body-info">
                    <p>
                        <input
                            id="add_name"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </p>
                    <p>
                        <input
                            id="add_brand"
                            placeholder="Phone"
                            onChange={(e) => setPhone(e.target.value)}
                        ></input>
                    </p>
                    <p>
                        <input
                            id="add_price"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </p>
                    
                </div>
            </div>

            <div className="users-add-footer">
                <button>Cancel</button>

                <button
                    onClick={(event) => {
                        event.preventDefault();
                        // saveProduct();
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default AddUser