import React from "react";
import * as BooksAPI from "../BooksAPI";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import Books from "./books";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([]);
    const [allBooks, setAllBooks] = useState([]);

    useEffect(() => {
        BooksAPI.getAll().then((books) => {
            setAllBooks(books);
        });
    }, []);

    const handlesearch = (e) => {
        const query = e.target.value;
        if (query) {
            BooksAPI.search(query).then((books) => {
                if (!books.error) {
                    // Merge with allBooks to set shelf
                    const mergedBooks = books.map((book) => {
                        const existingBook = allBooks.find((b) => b.id === book.id);
                        return existingBook ? { ...book, shelf: existingBook.shelf } : book;
                    });
                    setSearchResults(mergedBooks);
                } else {
                    setSearchResults([]);
                }
            });
        } else {
            setSearchResults([]);
        }
    };

    const changeShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf).then(() => {
            // Update local allBooks
            const updatedBooks = allBooks.map((b) =>
                b.id === book.id ? { ...b, shelf: newShelf } : b
            );
            setAllBooks(updatedBooks);
            // Update searchResults if the book is in search
            setSearchResults(searchResults.map((b) =>
                b.id === book.id ? { ...b, shelf: newShelf } : b
            ));
        });
        navigate("/");
    };

    function prepareBooks() {
        if (searchResults.length === 0) {
            return <div>No Books Found</div>
        }
        return searchResults.map((book) => (
            <Books key={book.id} book={book} shelfChange={changeShelf} />
        ));
    };

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">
                    Home
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={handlesearch}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {prepareBooks()}
                </ol>
            </div>
        </div>
    )
}