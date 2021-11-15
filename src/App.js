import { Component } from 'react';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';

const container = ['container'];
const search = ['search'];
const searchContainer = ['search_container'];
const image = ['image'];

class App extends Component {
  state = {
    searchQuery: '',
    imgModal: '',
    showModal: false,
  };

  FormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  ImgClick = imgModal => {
    this.setState({ imgModal });
  };

  render() {
    const { searchQuery, imgModal, showModal } = this.state;

    return (
      <>
        <main>
          <div className={container}>
            <section className={search}>
              <div className={searchContainer}>
                <Searchbar onSubmit={this.FormSubmit}></Searchbar>
              </div>
            </section>
            <ImageGallery
              searchQuery={searchQuery}
              toggleModal={this.toggleModal}
              onImgClick={this.ImgClick}
            ></ImageGallery>
          </div>
        </main>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              src={imgModal.largeImageURL}
              alt={imgModal.alt}
              className={image}
            />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
