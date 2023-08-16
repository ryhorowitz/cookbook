import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [meals, setMeals] = useState([])
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch('/meals')
      .then(res => {
        if (res.ok) {
          res.json().then(meals => setMeals(meals))
        }
      })
      .catch(e => console.error('error is', e))
  }, [user])

  return (
    <AppContext.Provider value={{ user, setUser, meals, setMeals, recipes, setRecipes }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;