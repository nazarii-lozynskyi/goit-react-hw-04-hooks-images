import React from 'react';

import styles from './ErrorMessage.module.css';

function NotFound({ inputValue, message }) {
  return (
    <div className={styles.NotFound}>
      <h1>{message}</h1>

      <p>Your search "{inputValue}" did not match any documents.</p>

      <p>Suggestions: </p>
      <ul>
        <li>Make sure that all words are spelled correctly.</li>

        <li>Try different keywords.</li>

        <li>Try more general keywords.</li>
      </ul>
    </div>
  );
}

export default NotFound;
