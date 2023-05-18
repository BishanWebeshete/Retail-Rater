import React, {useState, createContext} from "react";

const StoresContext = createContext();
export default StoresContext;

export const StoresContextProvider = (props) => {
  const [stores, setStores] = useState(undefined);
  const [selectedStore, setSelectedStore] = useState(undefined);

  const addStores = (store) => {
    setStores([...stores, store])
  }


  return (
    <StoresContext.Provider value={{stores, setStores, addStores, selectedStore, setSelectedStore}}>
      {props.children}
    </StoresContext.Provider>
  )
}
