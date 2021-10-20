import { Component } from 'react';

import Modal from '../Modal';
import IconButton from '../IconButton';
import { ReactComponent as CloseIcon } from '../../icons/closeBtnIcon.svg';

import styles from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;

    return (
      <>
        <li className={styles.Item} onClick={this.toggleModal}>
          <img
            src={this.props.src}
            alt={this.props.alt}
            className={styles.Image}
          />
        </li>

        {showModal && (
          <>
            <Modal onClose={this.toggleModal}>
              <IconButton onClick={this.toggleModal} aria-label="Close Button">
                <CloseIcon width="40" height="40" />
              </IconButton>

              <img
                src={this.props.largeImageURL}
                alt={this.props.alt}
                className={styles.ImageForModal}
              />
            </Modal>
          </>
        )}
      </>
    );
  }
}
