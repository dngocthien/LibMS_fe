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
    { label: "Top Books", value: 1 },
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

  function getAuthors(list) {
    let authors = "";
    list.map((a) => authors += a + ", ")
    return authors;
  };

  function removeBook(id) {
    fetch(DB_URL + "books" + id, {
      method: "DELETE",
      mode: 'no-cors',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
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

        <button className='btn-yellow' onClick={()=>navigate("/books/new")}>
          Add Book
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
                  <td>{getAuthors(d.authors)}</td>
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

export default BooksManagement;