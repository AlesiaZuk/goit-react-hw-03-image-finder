import { Component } from 'react';

import fetchImage from '../../api/img-api.js';
import LoaderSpinner from '../Loader/Loader.js';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.js';

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
    page: 1,
    error: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps) {
    const prevName = prevProps.searchQuery;
    const nextName = this.props.searchQuery;
    const prevArray = prevProps.newImgArray;
    const nextArray = this.props.newImgArray;

    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING });

      fetchImage(nextName, this.state.page).then(data => {
        if (data.hits.length > 0) {
          this.setState({
            img: [
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

          if (data.totalHits > 12 && data.hits.length === 12) {
            this.props.showButton(true);
          } else {
            this.props.showButton(false);
          }
        } else {
          this.props.showButton(false);

          this.setState({
            error: `No image with keyword ${nextName}`,
            status: Status.REJECTED,
          });
        }
      });
    }
    if (prevArray !== nextArray) {
      this.setState({ img: [...this.state.img, ...nextArray] });
      console.log('this.state.img после', this.state.img);
    }
  }

  stateImgChange = newImageArray => {
    this.setState({ img: [...this.state.img, ...newImageArray] });
  };

  render() {
    const { toggleModal, onImgClick } = this.props;
    const { img, error, status } = this.state;

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
      console.log(this.state.img);
      return (
        <>
          <ul className={s.gallery_list}>
            <ImageGalleryItem
              img={img}
              toggleModal={toggleModal}
              onImgClick={onImgClick}
            ></ImageGalleryItem>
          </ul>
        </>
      );
    }
  }
}

export default ImageGallery;
