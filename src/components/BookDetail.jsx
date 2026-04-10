import React from "react";
import { useLocation } from "react-router";

export default function BookDetail(props) {
    const location = useLocation();
    const book = location.state?.book;

    if (!book) {
        return <div>No book data available</div>;
    }
    return (
        <div className="bookshelf">
            <h2>{book.title}</h2>
            <p>Authors: {book.authors?.join(", ")}</p>
            <p>Description: {book.description}</p>
        </div>
    );
}