import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

function ImageGallery({ searchQuery }) {
  return (
    <ul className={s.gallery_list}>
      <ImageGalleryItem searchQuery={searchQuery}></ImageGalleryItem>
    </ul>
  );
}

export default ImageGallery;
