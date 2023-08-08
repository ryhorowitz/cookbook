import React, { useContext, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AppContext from './AppContext'
import Login from "./components/Login";
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

  if (!user) {
    return (
      <><Login /></>
    )
  }
  return (
    <div className="App">
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
      <Home />


    </div>
  );
}

export default App;
