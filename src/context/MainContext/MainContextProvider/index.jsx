import React, { useReducer } from 'react';
import MainReducer from '../../../reducer/MainReducer/index.jsx';
import { MainContext } from '../index.jsx';
import { initialState } from '../initState.js';

const MainContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MainReducer, initialState);

  return (
    <MainContext.Provider value={[state, dispatch]}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
