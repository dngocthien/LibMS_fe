import React from 'react'
import { useState, useEffect } from 'react';
import Select from "react-select";
import { useNavigate } from "react-router-dom";

import icon_edit from "../../assets/edit.png";
import "./UsersManagement.css"
import { DB_URL } from "../../constants";

const UserManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const report = [
    { label: "Expired Users", value: 1 },
  ]

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
    <div className='view'>
      <div className='view-header'>
        <h1>Users Management</h1>

        <input
          className='search'
          id="searching"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button className='btn-yellow' onClick={() => navigate("/users/details", {state:{user:null}})}>
          Add User
        </button>
      </div>


      <div className='filters'>
        <Select
          className='filters-select'
          options={report}
          placeholder="Report"
        // onChange={(e) => changeBrand(e)}
        />

        <button className='btn-light-small'>
          Export
        </button>
      </div>


      <div className='view-container'>
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
                        src={icon_edit}
                        alt="edit"
                        onClick={() => navigate("/users/details", {state:{user:d}})}
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