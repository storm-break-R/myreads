import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SearchPage from "./components/SearchPage";
import React, { useEffect, useState } from "react";
import PageNotFound from "./components/PageNotFound";
import * as BooksAPI from "./BooksAPI";
import BookDetail from "./components/BookDetail";

export default function AppRoutes() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        BooksAPI.getAll().then((fetchedBooks) => {
            setBooks(fetchedBooks);
        });
    }, []);

    const changeShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf).then(() => {
            setBooks((currentBooks) => {
                const bookExists = currentBooks.some((currentBook) => currentBook.id === book.id);
                if (newShelf === "none") {
                    return currentBooks.filter((currentBook) => currentBook.id !== book.id);
                }
                if (bookExists) {
                    return currentBooks.map((currentBook) =>
                        currentBook.id === book.id
                            ? { ...currentBook, ...book, shelf: newShelf }
                            : currentBook
                    );
                }
                return [...currentBooks, { ...book, shelf: newShelf }];
            });
        });
    };

    return (
        <Routes>
            <Route path="/" element={<Home books={books} onShelfChange={changeShelf} />} />
            <Route path="/search" element={<SearchPage books={books} onShelfChange={changeShelf} />} />
            <Route path="/book-detail" element={<BookDetail />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};
