import { useState } from 'react';

import Modal from '../Modal';
import IconButton from '../IconButton';
import { ReactComponent as CloseIcon } from '../../icons/closeBtnIcon.svg';

import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ src, alt, largeImageURL }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <li className={styles.Item} onClick={toggleModal}>
        <img src={src} alt={alt} className={styles.Image} />
      </li>

      {showModal && (
        <>
          <Modal onClose={toggleModal}>
            <IconButton onClick={toggleModal} aria-label="Close Button">
              <CloseIcon width="40" height="40" />
            </IconButton>

            <img
              src={largeImageURL}
              alt={alt}
              className={styles.ImageForModal}
            />
          </Modal>
        </>
      )}
    </>
  );
}
