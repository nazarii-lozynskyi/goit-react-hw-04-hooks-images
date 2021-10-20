import { Component } from 'react';

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
export default class ImageGallery extends Component {
  state = {
    gallery: null,
    status: 'idle',
    totalHits: null,

    error: null,
  };

  componentDidUpdate(prevProps, prevStats) {
    const prevName = prevProps.inputValue;
    const nextName = this.props.inputValue;

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });

      newAPI.value = nextName;
      newAPI.resetPage();

      newAPI.fetchImages().then(result => {
        if (result.hits.length !== 0) {
          return this.setState({
            gallery: result.hits,
            status: 'resolved',
            totalHits: result.totalHits,
          });
        }
        return this.setState({
          gallery: result.hits,
          status: 'rejected',
          totalHits: result.totalHits,
        });
      });
    }
  }

  loadMoreImages = () => {
    this.setState({ status: 'pending' });

    //setTimeout
    newAPI
      .fetchImages()
      .then(result => {
        this.setState(prevState => {
          return {
            gallery: [...prevState.gallery, ...result.hits],
            status: 'resolved',
            totalHits: result.totalHits,
          };
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(() => {
        this.scroll();
      });
    console.log(this.state.totalHits);
    console.log(this.state.gallery.length);
  };

  scroll() {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  }

  render() {
    const { status } = this.state;
    const { inputValue } = this.props;

    if (status === 'idle') {
      return <Idle />;
    }

    if (status === 'pending') {
      return (
        <>
          <ul className={styles.ImageGallery}>
            {this.state.gallery &&
              this.state.gallery.map(galleryItem => (
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
      return (
        <ErrorMessage inputValue={inputValue} message={this.state.error} />
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={styles.ImageGallery}>
            {this.state.gallery &&
              this.state.gallery.map(galleryItem => (
                <ImageGalleryItem
                  src={galleryItem.webformatURL}
                  alt={galleryItem.tags}
                  key={galleryItem.id}
                  onClick={this.toggleModal}
                  largeImageURL={galleryItem.largeImageURL}
                ></ImageGalleryItem>
              ))}
          </ul>

          {this.state.totalHits > 12 ? (
            <Button onClick={this.loadMoreImages} label="Load more" />
          ) : (
            <></>
          )}

          {/* {this.state.gallery.length > 12 ? (
            <Button onClick={this.loadMoreImages} label="Load more" />
          ) : (
            <></>
          )} */}
        </>
      );
    }
  }
}
