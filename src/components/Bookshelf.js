import React from 'react';

import Book from './Book.js';

export const Bookshelf = props => {
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            props.books.map((book, key) => <Book book={book} key={key} updateBook={props.updateBook}/> )
          }
        </ol>
      </div>
    </div>
  )
}

export default Bookshelf;