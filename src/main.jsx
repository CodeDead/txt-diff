import { StrictMode } from 'react';
import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';
import App from './components/App/index.jsx';
import MainContextProvider from './context/MainContext/MainContextProvider/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="auto">
      <MainContextProvider>
        <App />
      </MainContextProvider>
    </MantineProvider>
  </StrictMode>,
);
