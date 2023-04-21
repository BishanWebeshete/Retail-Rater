import React, {useState, createContext} from "react";

const RestaurantsContext = createContext();
export default RestaurantsContext;

export const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);


  return (
    <RestaurantsContext.Provider value={{restaurants, setRestaurants}}>
      {props.children}
    </RestaurantsContext.Provider>
  )
}
