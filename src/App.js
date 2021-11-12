import { Component } from 'react';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

const container = ['container'];
const search = ['search'];
const searchContainer = ['search_container'];

class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <main>
        <div className={container}>
          <section className={search}>
            <div className={searchContainer}>
              <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
            </div>
          </section>
          <section>
            <ImageGallery searchQuery={this.state.searchQuery}></ImageGallery>
          </section>
        </div>
      </main>
    );
  }
}

export default App;
