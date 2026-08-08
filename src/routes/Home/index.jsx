import React, { useContext, useEffect } from 'react';
import { Container } from '@mantine/core';
import { MainContext } from '../../context/MainContext/index.jsx';
import { setPageIndex } from '../../reducer/MainReducer/Actions/index.js';

const Home = () => {
  const [,dispatch] = useContext(MainContext);

  useEffect(() => {
    dispatch(setPageIndex(0));
    document.title = 'Home | txt-diff';
  }, [dispatch]);

  return (
    <Container size="xl">
      <h1>Welcome to CodeDead</h1>
    </Container>
  );
};

export default Home;
