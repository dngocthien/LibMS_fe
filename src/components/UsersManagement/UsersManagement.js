import React from 'react'
import { useState, useEffect } from 'react';

import icon_delete from "../../assets/delete.png";
import icon_edit from "../../assets/edit.png";
import "./UsersManagement.css"
import { DB_URL } from "../../constants";
import AddUser from './AddUser';

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(DB_URL + "users/" + searchQuery,
      {
        method: "get"
      })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, [searchQuery]);

  function getDate(d) {
    return (d.substr(0, 10));
  };

  return (
    <div className='users'>
      <div className='users-header'>
        <h1>Users Management</h1>

        <input
          className='search'
          id="searching"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
          // onChange={() => setSearchQuery(document.getElementById("searching").value)}

        />

        <button className='btn-yellow'>
          Add User
        </button>
      </div>

      <div className='filters'>
        <button className='btn-light-small'>
          Export
        </button>
      </div>

      <AddUser />

      <div className='users-container'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Issued Date</th>
              <th>Expired Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => {
              return (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "highlight" : ""}
                >
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.phone}</td>
                  <td>{d.email}</td>
                  <td>{getDate(d.issuedDate)}</td>
                  <td>{getDate(d.expiredDate)}</td>
                  <td>
                    <p>
                      <img
                        src={icon_delete}
                      // onClick={() => removeProducts(p.name)}
                      />
                      <img
                        src={icon_edit}
                      // onClick={() => switchEditProduct(p)}
                      />
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default UserManagement;