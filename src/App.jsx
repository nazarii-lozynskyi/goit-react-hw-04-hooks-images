import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Container from './components/Container';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

function App() {
  const [inputValue, setInputValue] = useState('');

  // const handleSearchbarSubmit = inputValue => {
  //   setInputValue(inputValue);
  // };

  return (
    <>
      <Searchbar onSubmit={setInputValue} />

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
        <ImageGallery inputValue={inputValue} />
      </Container>
    </>
  );
}

export default App;
