import React, { useContext, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AppContext from './AppContext'
import Login from "./components/Login";
import LogoutButton from './components/LogoutButton';
import Home from './components/Home';

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
    return (
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
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
            <Link to="/recipes">Recipes</Link>
          </li>
          <li>
            <Link to="/new-recipe">Write A Recipe</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* <Route path="/shuls" element={<Shuls />} />
        <Route path='/shuls/:id/reviews' element={<ShulReviews />} />
        <Route path='/new-review' element={<CreateReview />} /> */}
      </Routes>
    </div>
  );
}

export default App;
