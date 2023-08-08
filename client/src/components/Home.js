import React, { useContext, useState } from "react";
import UserContext from "../AppContext";

function Home() {
  const { user, setUser } = useContext(UserContext)
  const [updateUsername, setUpdateUsername] = useState(user.username)
  const [toggleForm, setToggleForm] = useState(false)

  function handleUpdateUser(e) {
    e.preventDefault()
    fetch(`/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateUsername)
    })
      .then(r => r.json())
      .then(updatedUser => {
        console.log('updatedUser is ', updatedUser)
        setUser(updatedUser)
      })
      .then(() => {
        setUpdateUsername('')
        setToggleForm(false)
      })
  }

  function handleToggle() { setToggleForm(toggleForm => !toggleForm) }

  return (
    <>
      <h1>Home</h1>
      <h1>Welcome {user.username}</h1>
      <button onClick={handleToggle}>Update User</button>
      {toggleForm ?
        <form onSubmit={handleUpdateUser}>
          <div><label htmlFor="username">Username:</label>
            <input
              type="text"
              id="login-username"
              name="username"
              value={updateUsername}
              onChange={(e) => setUpdateUsername(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update</button>
        </form>
        : ''}
    </>
  )
}

export default Home