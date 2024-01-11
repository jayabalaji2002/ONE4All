import React, { createContext, useState } from "react";

import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

// Add to cart Logic
const getDefaultCart = () => {
  let cart = {};

  for(let index = 0; index < all_product.length+1; index++) {
    cart[index] = 0;
  }
  return cart;
}

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cartItems);
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const contextValue = { all_product, cartItems,addToCart,removeFromCart };
  // console.log(cartItems);
  // if (!props) {
  //     return null; // or handle the scenario accordingly
  // }
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
