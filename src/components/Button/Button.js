import { Component } from 'react';
import fetchImage from '../../api/img-api';

import s from './Button.module.css';

class Button extends Component {
  state = {
    img: [],
    page: 2,
  };

  handelClick = () => {
    const { searchQuery, imgLoader } = this.props;
    const { page, img } = this.state;

    this.setState({ page: page + 1 });
    console.log(page);

    fetchImage(searchQuery, page).then(data => {
      console.log(page);
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
        });
        imgLoader(img);

        console.log(this.state.img);
      }
    });
  };

  render() {
    return (
      <button type="button" onClick={this.handelClick} className={s.button}>
        Load more...
      </button>
    );
  }
}

export default Button;
