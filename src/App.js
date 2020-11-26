import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import PapagoAPI from './components/PapagoAPI';
import Header from './components/Header';
function App() {
  return (
    <>
      <Header />
      <PapagoAPI />
    </>
  );
}

export default App;
