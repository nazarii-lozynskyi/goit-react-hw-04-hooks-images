import { useState, useEffect } from 'react';

import Skeleton from 'react-loading-skeleton';

import API from '../../services/apiService.js';

import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';
import Idle from '../Idle';

//import Loader from 'react-loader-spinner';

import styles from './ImageGallery.module.css';

const newAPI = new API();
export default function ImageGallery({ inputValue }) {
  const [gallery, setGallery] = useState(null);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!inputValue) {
      return;
    }

    setStatus('pending');

    newAPI.value = inputValue;
    newAPI.resetPage();

    newAPI.fetchImages().then(result => {
      if (result.hits.length !== 0) {
        setGallery(result.hits);
        setTotalHits(result.totalHits);
        setStatus('resolved');

        return;
      }
      setGallery(result.hits);
      setTotalHits(result.totalHits);
      setStatus('rejected');

      return result;
    });
  }, [inputValue]);

  const loadMoreImages = () => {
    setStatus('pending');

    newAPI
      .fetchImages()
      .then(result => {
        setGallery([...gallery, ...result.hits]);
        setTotalHits(result.totalHits);
        setStatus('resolved');

        return result;
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      })
      .finally(() => {
        scroll();
      });
  };

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  if (status === 'idle') {
    return <Idle />;
  }

  if (status === 'pending') {
    return (
      <>
        <ul className={styles.ImageGallery}>
          {gallery &&
            gallery.map(galleryItem => (
              <li className={styles.Item} key={galleryItem.id}>
                <Skeleton height={260} width={330} />
              </li>
            ))}
        </ul>

        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      </>
    );
  }

  if (status === 'rejected') {
    return <ErrorMessage inputValue={inputValue} message={error} />;
  }

  if (status === 'resolved') {
    return (
      <>
        <ul className={styles.ImageGallery}>
          {gallery &&
            gallery.map(galleryItem => (
              <ImageGalleryItem
                src={galleryItem.webformatURL}
                alt={galleryItem.tags}
                key={galleryItem.id}
                largeImageURL={galleryItem.largeImageURL}
              ></ImageGalleryItem>
            ))}
        </ul>

        {totalHits > 12 ? (
          <Button onClick={loadMoreImages} label="Load more" />
        ) : (
          <></>
        )}
      </>
    );
  }
}
