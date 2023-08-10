import React from "react";
import UserStore from "../store/UserStore.js";
import CatalogStore from "../store/CatalogStore.js";
import BasketStore from "../store/BasketStore.js";
import CommentStore from "../store/CommentStore.js";
const AppContext = React.createContext();

// контекст, который будем передавать
const context = {
  user: new UserStore(),
  basket: new BasketStore(),
  catalog: new CatalogStore(),
  comment: new CommentStore(),
};

const AppContextProvider = (props) => {
  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
