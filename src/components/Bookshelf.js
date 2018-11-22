import React, { Component } from 'react';

import Book from './Book.js';

class Bookshelf extends Component {
  render() {
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.books.map((book, key) => <Book book={book} key={key} updateBook={this.props.updateBook}/> )
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf;