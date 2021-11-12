import { Component } from 'react';

import s from './ImageGalleryItem.module.css';

const API_KEY = '23521874-546d3070950852676c2506258';
const BASE_URL = 'https://pixabay.com/api';
const per_page = 12;

class ImageGalleryItem extends Component {
  state = {
    img: [],
    page: 1,
  };

  componentDidUpdate(prevProps) {
    const prevName = prevProps.searchQuery;
    const nextName = this.props.searchQuery;

    if (prevName !== nextName) {
      fetch(
        `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${nextName}&page=${this.state.page}&per_page=${per_page}&key=${API_KEY}`,
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          console.log(data.hits);
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
          });
          console.log('State', this.state);
        });
    }
  }

  render() {
    return this.state.img.map(item => {
      return (
        <li className={s.gallery_item} key={item.id}>
          <div>
            <a href={item.largeImageURL} className={s.gallery_link}>
              <img
                src={item.webformatURL}
                alt={item.tags}
                width="370px"
                height="250px"
                className={s.gallery_image}
              />
            </a>
          </div>
        </li>
      );
    });
  }
}

export default ImageGalleryItem;
