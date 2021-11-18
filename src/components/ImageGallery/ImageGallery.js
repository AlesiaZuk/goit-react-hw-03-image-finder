import { Component } from 'react';
import PropTypes from 'prop-types';

import fetchImage from '../../api/img-api.js';
import LoaderSpinner from '../Loader/Loader.js';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.js';
import Button from '../Button/Button';

import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    img: [],
    page: 2,
    error: null,
    showButton: false,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const prevName = prevProps.searchQuery;
    const nextName = this.props.searchQuery;

    if (prevName !== nextName) {
      this.setState({
        img: [],
        page: 2,
        status: Status.PENDING,
      });
    }
    if (prevName !== nextName || prevState.page !== page) {
      this.fetchGallery(nextName, page);
    }
  }

  handelClick = () => {
    this.pageIncrement();

    // this.fetchGallery(this.props.searchQuery, page);
  };

  fetchGallery = (searchQuery, page) => {
    fetchImage(searchQuery, page).then(data => {
      if (data.hits.length > 0) {
        this.setState({
          img: [
            ...this.state.img,
            ...data.hits.map(item => {
              const image = {};
              image.id = item.id;
              image.largeImageURL = item.largeImageURL;
              image.webformatURL = item.webformatURL;
              image.tags = item.tags;
              return image;
            }),
          ],
          status: Status.RESOLVED,
        });

        this.showLoaderButton(data);
      } else {
        this.setState({
          error: `No image with keyword ${searchQuery}`,
          status: Status.REJECTED,
        });
      }
    });
  };

  showLoaderButton = data => {
    if (data.totalHits > 12 && data.hits.length === 12) {
      this.showButton(true);
    } else {
      this.showButton(false);
    }
  };

  showButton = showButton => {
    this.setState({ showButton });
  };

  pageIncrement = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  render() {
    const { toggleModal, onImgClick } = this.props;
    const { img, error, status, showButton } = this.state;

    if (status === 'idle') {
      return <h2 className={s.gallery_title}>Enter a keyword...</h2>;
    }

    if (status === 'pending') {
      return (
        <div className={s.gallery_container}>
          <LoaderSpinner></LoaderSpinner>;
        </div>
      );
    }

    if (status === 'rejected') {
      return <h2 className={s.gallery_title}>{error}</h2>;
    }

    if (status === 'resolved') {
      return (
        <>
          <section>
            <ul className={s.gallery_list}>
              <ImageGalleryItem
                img={img}
                toggleModal={toggleModal}
                onImgClick={onImgClick}
              ></ImageGalleryItem>
            </ul>
          </section>

          {showButton && (
            <div className={s.button_container}>
              <Button handelClick={this.handelClick}></Button>
            </div>
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onImgClick: PropTypes.func.isRequired,
};

export default ImageGallery;
