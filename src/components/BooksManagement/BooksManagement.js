import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import icon_delete from "../../assets/delete.png";
import icon_edit from "../../assets/edit.png";
import "./BooksManagement.css"
import { DB_URL } from "../../constants";

const BooksManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const report = [
    { label: "All Books", value: 0 },
    // { label: "Top Books", value: 1 },
    { label: "None Books", value: 2 },
  ]

  useEffect(() => {
    fetch(DB_URL + "books/" + searchQuery,
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
        fetch(DB_URL + "books" ,
          {
            method: "get"
          })
          .then((res) => res.json())
          .then((result) => {
            setData(result);
          });
        break;
      case 1:
        console.log("still working");
        break;
      case 2:
        fetch(DB_URL + "books/none" ,
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

  function authorsToString(list) {
    let authors = "";
    list.map((a) => authors += a + ", ")
    return authors.slice(0, -2);
  };

  function removeBook(id) {
    fetch(DB_URL + "books/" + id, {
      method: "DELETE",
      mode: 'cors',
      // mode: 'no-cors',
      // credentials: 'include',
      headers: { "Content-Type": "application/json" },
    })
  }

  return (
    <div className='view'>
      <div className='view-header'>
        <h1>Books Management</h1>

        <input
          className='search'
          id="searching"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button className='btn-yellow' onClick={() => navigate("/books/details", { state: { book: null } })}>
          Add Book
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
              <th>Title</th>
              <th>Edition</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Authors</th>
              <th>Category</th>
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
                  <td>{d.title}</td>
                  <td>{d.edition}</td>
                  <td>{d.price}</td>
                  <td>{d.quantity}</td>
                  <td>{authorsToString(d.authors)}</td>
                  <td>{d.categoryId}</td>
                  <td>
                    <p>
                      <img
                        src={icon_delete}
                        alt="delete"
                        onClick={() => removeBook(d.id)}
                      />
                      <img
                        src={icon_edit}
                        alt="edit"
                        onClick={() => navigate("/books/details", { state: { book: d } })}
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

export default BooksManagement;