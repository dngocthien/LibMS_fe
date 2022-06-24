import React from 'react'
import { useState, useEffect } from 'react';
import Select from "react-select";
import { useNavigate } from "react-router-dom";

import icon_edit from "../../assets/edit.png";
import { DB_URL } from "../../constants";

const BorrowsManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const report = [
    { label: "All Transactions", value: 0 },
    { label: "Overdue ", value: 1 },
  ]

  useEffect(() => {
    fetch(DB_URL + "transactions/" + searchQuery,
      {
        method: "get"
      })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, [searchQuery]);

  function filterReport(filter) {
    switch (filter.value) {
      case 0:
        fetch(DB_URL + "transactions",
          {
            method: "get"
          })
          .then((res) => res.json())
          .then((result) => {
            setData(result);
          });
        break;
      case 1:
        fetch(DB_URL + "transactions/overdue",
          {
            method: "get"
          })
          .then((res) => res.json())
          .then((result) => {
            setData(result);
          });
        break;
    }
  }

  function getDate(d) {
    return d;
    // return (d.substr(0, 10));
  };

  return (
    <div className='view'>
      <div className='view-header'>
        <h1>Borrows Management</h1>

        <input
          className='search'
          id="searching"
          type="text"
          placeholder="Search"
          // onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button className='btn-yellow' onClick={() => navigate("/borrows/details", {state:{userId:-1}})}>
          Borrow Books
        </button>
      </div>


      <div className='filters'>
        <Select
          className='filters-select'
          options={report}
          placeholder="Report"
          onChange={(e) => filterReport(e)}
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
              <th>Issued Date</th>
              <th>Due Date</th>
              <th>Finished Status</th>
              <th>User</th>
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
                  <td>{getDate(d.issuedDate)}</td>
                  <td>{getDate(d.dueDate)}</td>
                  <td>{d.finished ? "Returned" : "Not Returned"}</td>
                  <td>{d.userId}</td>
                  <td>
                    <p>
                      <img
                        src={icon_edit}
                        alt="edit"
                        onClick={() => navigate("/borrows/details", { state: {userId: d.userId } })}
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

export default BorrowsManagement;