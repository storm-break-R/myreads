import React from "react";
import BookDetail from "./BookDetail";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Books(props) {
    const navigate = useNavigate();

    const handleChange = (e) => {
        const newShelf = e.target.value;
        if (props.book.shelf !== newShelf) {
            props.shelfChange(props.book, newShelf);
        }
    }

    const bookDetail = () => {
        navigate("/book-detail", { state: { book: props.book } });
    };

    return (
        <li>
            <div className="book">
                <div className="book-top" onClick={bookDetail}>
                    <img
                        className="book-cover"
                        src={props.book.imageLinks?.thumbnail}
                        alt={props.book.title}
                    />
                    <div className="book-shelf-changer">
                        <select value={props.book.shelf || "none"} onChange={handleChange} onClick={(e) => e.stopPropagation()}>
                            <option value="void" disabled>
                                Move to...
                            </option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{props.book.title}</div>
                {
                    props.book.authors?.map((author) => (
                        <div className="book-authors" key={author}>
                            {author}
                        </div>
                    ))
                }
            </div>
        </li>
    )
};