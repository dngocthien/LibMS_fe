import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BorrowManagement from "./components/BorrowsManagement/BorrowsManagement"
import UserManagement from "./components/UsersManagement/UsersManagement"
import UserAdding from "./components/UsersManagement/UserAdding"
import BookManagement from "./components/BooksManagement/BooksManagement"
import NoPage from "./components/NoPage/NoPage"
import BookAdding from './components/BooksManagement/BookAdding';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BorrowManagement />} />
          <Route path="books" element={<BookManagement />} />
          <Route path="books/details" element={<BookAdding />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="users/details" element={<UserAdding />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
export default App;