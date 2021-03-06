import React, { FC, useContext, useState } from 'react';

const defaultValue = {
  debug: false,
  minSpeed: 1000,
  maxSpeed: 200,
  gridSize: 9,
  setDebug: () => {},
  setGridSize: () => {},
};

type DefaultStore = typeof defaultValue;
type StoreType = Omit<DefaultStore, 'setDebug' | 'setGridSize'> & {
  setDebug: React.Dispatch<React.SetStateAction<boolean>>;
  setGridSize: React.Dispatch<React.SetStateAction<number>>;
};

export const StoreContext = React.createContext<StoreType>(defaultValue);

export const WithStore: FC = ({ children }) => {
  const [debug, setDebug] = useState(defaultValue.debug);
  const [gridSize, setGridSize] = useState(defaultValue.gridSize);

  const defaultStoreValue = {
    ...defaultValue,
    debug,
    setDebug,
    gridSize,
    setGridSize,
  };

  return (
    <StoreContext.Provider value={defaultStoreValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};

export const useDebug = () => {
  const { debug, setDebug } = useStore();
  return { debug, setDebug };
};
