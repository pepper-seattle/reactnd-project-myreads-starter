import React, {Component} from 'react';
import Book from './Book.js';
import Bookshelf from './Bookshelf.js';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({books});
      });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(response => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])}))
      });
  }

  render() {
    return(
      <div>
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf 
                  title='Currently Reading' 
                  books={this.state.books.filter(b => b.shelf === "currentlyReading")} 
                  updateBook={this.updateBook}
                  >
                  <Book />
                </Bookshelf>

                <Bookshelf 
                  title='Want To Read' 
                  books={this.state.books.filter(b => b.shelf === "wantToRead")} 
                  updateBook={this.updateBook}
                  >
                  <Book />
                </Bookshelf>

                <Bookshelf 
                  title='Read' 
                  books={this.state.books.filter(b => b.shelf === "read")} 
                  updateBook={this.updateBook}
                  >
                  <Book />
                </Bookshelf>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
      </div>
    )
  }
}

export default Main;