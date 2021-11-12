import { Component } from 'react';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    //  if (this.state.searchQuery.trim() === '') {
    //    toast.error('Enter a keyword');
    //    return;
    //  }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  handelChange = e => {
    this.setState({ searchQuery: e.target.value.toLowerCase() });
  };

  render() {
    return (
      <>
        <h1>Search images</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              value={this.state.searchQuery}
              onChange={this.handelChange}
              className={s.search_form}
              name="query"
              placeholder="Search images..."
              required
            />
          </label>
          <button type="submit" className={s.search_button}>
            Search
          </button>
        </form>
      </>
    );
  }
}

export default Searchbar;
