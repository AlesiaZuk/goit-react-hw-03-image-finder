import { Component } from 'react';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = e => {
    const { searchQuery } = this.state;

    e.preventDefault();

    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  handelChange = e => {
    this.setState({ searchQuery: e.target.value.toLowerCase() });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <>
        <h1>Search images</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              value={searchQuery}
              onChange={this.handelChange}
              className={s.search_form}
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
