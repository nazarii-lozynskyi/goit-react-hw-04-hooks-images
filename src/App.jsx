import React, { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Container from './components/Container';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

class App extends Component {
  state = {
    inputValue: '',
    showModal: false,
  };

  handleSearchbarSubmit = inputValue => {
    this.setState({ inputValue, page: 1 });
  };


  loadMore() {}

  render() {
    
    return (
      <>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />

        <ToastContainer
          theme="colored"
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          progress={undefined}
        />

        <Container>
          <ImageGallery inputValue={this.state.inputValue} />
        </Container>

     
      </>
    );
  }
}

export default App;
