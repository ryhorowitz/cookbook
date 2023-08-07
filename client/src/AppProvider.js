import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([])

  // You can add any user-related functions here to update the user state
  //put useEffect for recipes data
  useEffect(() => {
    fetch('/recipes')
      .then(res => {
        if (res.ok) {

          res.json().then(recipes => setRecipes(recipes))
        }
      })
      .catch(e => console.error('error is', e))
  }, [user])

  return (
    <AppContext.Provider value={{ user, setUser, recipes, setRecipes }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;