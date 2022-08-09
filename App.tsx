import React from 'react';
import {StatusBar} from 'react-native';
import {Calculator} from './src/screens/Calculator';

export const App = () => {
  return (
    <>
      <StatusBar networkActivityIndicatorVisible barStyle="light-content" />
      <Calculator />
    </>
  );
};

export default App;
