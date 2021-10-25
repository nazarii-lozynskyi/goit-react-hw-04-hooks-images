import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');
  

  const inputId = uuidv4();

  const handleInputValueChange = event => {
    setInputValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      toast.error('The input field cannot be entry. Pleas, enter something');

      return;
    }
    onSubmit(inputValue);

    setInputValue('');
    
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.Button}>
          <span className={styles.ButtonLabel}>Search</span>
        </button>

        <input
          className={styles.Input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleInputValueChange}
          id={inputId}
        />
      </form>
    </header>
  );
}
