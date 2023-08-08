import React, { useContext, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import AppContext from './AppContext'
import Login from "./components/Login";
import LogoutButton from './components/LogoutButton';
import Home from './components/Home';
import Meals from './components/Meals';
function App() {
  const { user, setUser } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/auth')
      .then(res => {
        if (res.ok) {
          res.json().then(user => setUser(user))
        }
      })
      .catch(e => console.error('error is', e))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleLogout() {
    fetch('/logout', { method: 'DELETE' })
      .then(() => setUser(null))
      .then(() => navigate('/login'))
  }
  if (!user) {
    console.log('no user block')
    // navigate('/login')
    return (
      // <Routes>
      //   <Route path="/login" element={<Login setUser={setUser} />} />
      // </Routes>
      < Login setUser={setUser} />
    )
  }
  return (
    <div className="App">
      <LogoutButton logout={handleLogout} />
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/meals-categories">Meals/Categories</Link>
          </li>
          <li>
            <Link to="/my-meals">My Recipes By Meal</Link>
          </li>
          <li>
            <Link to="/recipes/new">Write A Recipe</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/meals-categories' element={<Meals />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}

export default App;


//creating a recipe in a new (to-me) category is the only way to add categories to my categories