import { Component } from 'react';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

const container = ['container'];
const search = ['search'];
const searchContainer = ['search_container'];
const image = ['image'];
const button = ['button'];
const buttonContainer = ['button-container'];

class App extends Component {
  state = {
    searchQuery: '',
    imgModal: '',
    img: [],
    showModal: false,
    showButton: false,
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

  showButton = showButton => {
    this.setState({ showButton });
  };

  imgLoader = img => {
    this.setState({ img });
  };

  render() {
    const { searchQuery, imgModal, showButton, showModal, img } = this.state;

    return (
      <>
        <main>
          <div className={container}>
            <section className={search}>
              <div className={searchContainer}>
                <Searchbar onSubmit={this.FormSubmit}></Searchbar>
              </div>
            </section>
            <section>
              <ImageGallery
                searchQuery={searchQuery}
                showButton={this.showButton}
                toggleModal={this.toggleModal}
                onImgClick={this.ImgClick}
                newImgArray={img}
              ></ImageGallery>
            </section>
            {showButton && (
              <div className={buttonContainer}>
                <Button
                  searchQuery={searchQuery}
                  imgLoader={this.imgLoader}
                ></Button>
              </div>
            )}
          </div>
        </main>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <button type="button" onClick={this.toggleModal} className={button}>
              X
            </button>
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
