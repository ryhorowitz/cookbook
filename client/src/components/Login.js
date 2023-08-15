import React, { useState, useContext } from "react"
import AppContext from "../AppContext"
import { useNavigate } from "react-router-dom"

function Login() {
  const { setUser } = useContext(AppContext)
  // eslint-disable-next-line
  const [loginErrors, setLoginErrors] = useState([])
  const [signupErrors, setSignupErrors] = useState([])
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  })
  const [signupFormData, setSignupFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()
  function handleLoginFormData(e) {
    const { name, value } = e.target
    setLoginFormData({ ...loginFormData, [name]: value })
  }

  function handleSignupFormData(e) {
    const { name, value } = e.target
    setSignupFormData({ ...signupFormData, [name]: value })
  }

  function handleLogin(e) {
    e.preventDefault()
    const body = {
      username: loginFormData.username,
      password: loginFormData.password
    }
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(user => {
            setUser(user)
            navigate('/home')
          })
        } else {
          r.json().then(e => {
            console.log('error response', e.error)
            setLoginErrors(Object.values(e).flat())
          })
        }
      })
  }

  function handleSignupSubmit(e) {
    e.preventDefault()
    const body = {
      username: signupFormData.username,
      password: signupFormData.password,
      password_confirmation: signupFormData.confirmPassword
    }
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(newUser => {
            console.log('user created successfully', newUser)
            setUser(newUser)
            navigate('/home')
          })
        } else {
          r.json().then(e => {
            console.log('error response', e)
            // console.log('flattening', e.errors.flat())
            setSignupErrors(Object.values(e.errors))
          })
        }
      })
  }

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div><label htmlFor="username">Username:</label>
          <input
            type="text"
            id="login-username"
            name="username"
            value={loginFormData.username}
            onChange={handleLoginFormData}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="login-password"
            name="password"
            value={loginFormData.password}
            onChange={handleLoginFormData}
            required
          />
        </div>
        {loginErrors.length > 0 && (
          <ul style={{ color: "red" }}>
            {loginErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <button type="submit">Login</button>
      </form>
      <br></br>
      <br></br>
      <h1>Signup</h1>

      <form onSubmit={handleSignupSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="signup-username"
            name="username"
            value={signupFormData.username}
            onChange={handleSignupFormData}
          // required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="signup-password"
            name="password"
            value={signupFormData.password}
            onChange={handleSignupFormData}
          // required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="signup-confirmPassword"
            name="confirmPassword"
            value={signupFormData.confirmPassword}
            onChange={handleSignupFormData}
          // required
          />
        </div>
        {signupErrors.length > 0 && (
          <ul style={{ color: "red" }}>
            {signupErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <button type="submit">Sign up</button>
      </form>

    </>
  )

}
export default Login