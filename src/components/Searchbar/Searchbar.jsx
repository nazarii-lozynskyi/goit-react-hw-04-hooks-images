import React, { Component } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = { inputValue: '', page: 1 };

  inputId = uuidv4();

  handleInputValueChange = event => {
    this.setState({ inputValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.inputValue.trim() === '') {
      toast.error('The input field cannot be entry. Pleas, enter something');

      return;
    }
    this.props.onSubmit(this.state.inputValue);

    this.setState({ inputValue: '', page: 1 });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.Form} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.Button}>
            <span className={styles.ButtonLabel}>Search</span>
          </button>

          <input
            className={styles.Input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleInputValueChange}
            id={this.inputId}
          />
        </form>
      </header>
    );
  }
}
