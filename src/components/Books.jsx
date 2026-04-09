import React from "react";

export default function Books(props) {

    const handleChange = (e) => {
        const newShelf = e.target.value;
        if (props.book.shelf !== newShelf) {
            props.shelfChange(props.book, newShelf);
        }
    }

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <img
                        className="book-cover"
                        src={props.book.imageLinks?.thumbnail}
                        alt={props.book.title}
                    />
                    <div className="book-shelf-changer">
                        <select value={props.book.shelf || "none"} onChange={handleChange}>
                            <option value="none" disabled>
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