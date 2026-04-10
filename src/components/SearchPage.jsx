import * as BooksAPI from "../BooksAPI";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import Books from "./books";
import { useNavigate } from "react-router-dom";

export default function SearchPage({ books, onShelfChange }) {
    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([]);
    const [totalBooks, setTotalBooks] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setTotalBooks(searchResults.length);
    }, [searchResults]);

    useEffect(() => {
        const currentSearch = setTimeout(() => {
            const query = searchTerm.trim();
            if (query) {
                BooksAPI.search(query).then((foundBooks) => {
                    if (!foundBooks.error) {
                        const mergedBooks = foundBooks.map((book) => {
                            const existingBook = books.find((existing) => existing.id === book.id);
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
        }, 500);
        return () => {
            clearTimeout(currentSearch);
        }
    }, [searchTerm, books]);

    function handlesearch(e) {
        setSearchTerm(e.target.value);
    }

    const changeShelf = (book, newShelf) => {
        onShelfChange(book, newShelf);
        setSearchResults((currentResults) =>
            currentResults.map((currentBook) =>
                currentBook.id === book.id ? { ...currentBook, shelf: newShelf } : currentBook
            )
        );
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
                {totalBooks > 0 && (
                    <h2 className="bookshelf-title">Books found: {totalBooks}</h2>
                )}
                <ol className="books-grid">
                    {prepareBooks()}
                </ol>
            </div>
        </div>
    )
}