import React from 'react'
import Header from './components/Header'
import { createGlobalStyle } from 'styled-components';
import PostContainer from './components/PostContainer'
const GlobalStyle = createGlobalStyle`
  body {
    background:#e9ecef;
  }
`;
function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <PostContainer />
    </>

  );

}

export default App;
