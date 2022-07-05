import React from 'react'
import { useState, useEffect } from 'react';
import Select from "react-select";
import { useNavigate } from "react-router-dom";

import icon_details from "../../assets/dot.png";
import { DB_URL } from "../../constants";

const TransactionsManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [byTime, setByTime] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadTransactions()
  },[]);

  const report = [
    { label: "All Transactions", value: 0 },
    { label: "Time ", value: 1 },
    { label: "Overdue ", value: 2 },
  ]

  function filterReport(filter) {
    setByTime(false);
    switch (filter.value) {
      case 0:
        loadTransactions()
        break;
      case 1:
        setByTime(true)
        break;
      case 2:
        getOverDue()
        break;
    }
  }

  function loadTransactions(){
    fetch(DB_URL + "transactions",
          {
            method: "get"
          })
          .then((res) => res.json())
          .then((result) => {
            setData(result);
          })
  }

  function filterByTime() {
    fetch(DB_URL + "transactions/time",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          {
            fromDate: document.getElementById("input-from").value,
            toDate: document.getElementById("input-to").value
          }
        )
      })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }

  function getOverDue(){
    fetch(DB_URL + "transactions/overdue",
          {
            method: "get"
          })
          .then((res) => res.json())
          .then((result) => {
            setData(result);
          })
  }

  function getDate(d) {
    return (d.substr(0, 10));
  };

  return (
    <div className='view'>
      <div className='view-header'>
        <h1>Transactions Management</h1>

        <input
          className='search'
          id="searching"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') navigate("/transactions/details", { state: { userId: searchQuery } })
          }}
        />

        <button className='btn-yellow' onClick={() => navigate("/transactions/details", { state: { userId: -1 } })}>
          Borrow Books
        </button>
      </div>


      {/* Filter */}
      <div className='filters'>
        <div className='filters-child'>

          <Select
            className='filters-select'
            options={report}
            placeholder="Report"
            onChange={(e) => filterReport(e)}
          />

          {byTime ?
            <>
              <input id="input-from"></input>
              <input id="input-to"></input>
              <button className='btn-border' onClick={() => filterByTime()}>Filter</button>
            </>
            : <></>
          }
        </div>

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
                        src={icon_details}
                        alt="edit"
                        onClick={() => navigate("/transactions/details", { state: { userId: d.userId } })}
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

export default TransactionsManagement;