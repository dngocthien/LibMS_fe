import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BorrowManagement from "./components/BorrowsManagement/BorrowsManagement"
import UserManagement from "./components/UsersManagement/UsersManagement"
import UserDetails from "./components/UsersManagement/UserDetails"
import BookManagement from "./components/BooksManagement/BooksManagement"
import NoPage from "./components/NoPage/NoPage"
import BookDetails from './components/BooksManagement/BookDetails';
import BorrowDetails from './components/BorrowsManagement/BorrowDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BorrowManagement />} />
          <Route path="borrows/details" element={<BorrowDetails />} />
          <Route path="books" element={<BookManagement />} />
          <Route path="books/details" element={<BookDetails />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="users/details" element={<UserDetails />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
export default App;