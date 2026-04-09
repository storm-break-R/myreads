import { useEffect, useState } from "react";
import * as BooksAPI from "../BooksAPI";
import React from "react";
import { Link } from "react-router-dom";
import Books from "./books";

export default function Home() {
    const [allBooksList, setAllBooksList] = useState([]);

    useEffect(() => {
        BooksAPI.getAll().then((books) => {
            setAllBooksList(books);
        });
    }, []);

    const changeShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf).then(() => {
            BooksAPI.getAll().then((books) => {
                setAllBooksList(books);
            });
        });
    };

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {
                                    allBooksList
                                        .filter((book) => book.shelf === "currentlyReading")
                                        .map((book) => (
                                            <Books key={book.id} book={book} shelfChange={changeShelf}/>
                                        ))
                                }
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {
                                    allBooksList
                                        .filter((book) => book.shelf === "wantToRead")
                                        .map((book) => (
                                            <Books key={book.id} book={book} shelfChange={changeShelf} />
                                        ))
                                }
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {
                                    allBooksList
                                        .filter((book) => book.shelf === "read")
                                        .map((book) => (
                                            <Books key={book.id} book={book} shelfChange={changeShelf} />
                                        ))
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
};