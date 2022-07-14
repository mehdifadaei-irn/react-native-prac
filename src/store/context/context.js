import React,{createContext, useState} from 'react';

export const FavContext = createContext({
  stackData: [],
  favIds: [],
  addFavorite: (id) => {},
  removeFavorite: (id)=> {},
  fetchStackData: ()=> {},
});

function FavContextProvider({children}) {

  const [stackData, setStackData] = useState([]);
  const [favIds, setFavIds] = useState([]);

  const addFavorite = (id)=> {
    setFavIds((prev)=> [...prev, id]);
  }

  const removeFavorite = (id)=> {
    let updatedItems = favIds.filter((i)=> i !== id)
    setFavIds(updatedItems);
  }

  const fetchStackData = ()=> {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(json => setStackData(json))
      .catch(error => console.error(error));
  }


  const value = {
    FavIds: favIds,
    addFavorite: addFavorite,
    removeFavorite,
    stackData: stackData,
    fetchStackData: fetchStackData
  }

  return <FavContext.Provider
    value={value}
  >
    {children}
  </FavContext.Provider>
}

export default FavContextProvider;
