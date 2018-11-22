import React, {Component} from 'react';
import Book from './Book.js';

import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchResults: [],
      search: ""
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({books});
      });
  }

  submitSearch() {
    if(this.state.search === '' || this.state.search === undefined) {
      return this.setState({ searchResults: [] });
    }
    BooksAPI.search(this.state.search.trim()).then(response => {
      if(response.error) {
        return this.setState({ searchResults: [] });
      }else{
        response.forEach(b => {
          let findBook = this.state.books.filter(B => B.id === b.id);
          b.shelf = findBook[0] ? findBook[0].shelf : null;
        });
        return this.setState({ searchResults: response});
      }
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(response => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])
        }));
      });
  }

  updateSearch = (search) => {
    this.setState({search: search.trim()}, this.submitSearch);
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={this.state.search}
              onChange={(e) => this.updateSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map((item, key) => 
              <Book 
                book={item}
                key={key}
                updateBook={this.updateBook} 
              />
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;