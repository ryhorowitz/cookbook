import React, { useState } from "react"
import { useContext } from "react"
import UserContext from "../AppContext"

function Meals() {
  const [newMeal, setNewMeal] = useState('')
  const [errors, setErrors] = useState([])
  const { meals } = useContext(UserContext)

  async function addAMeal() {
    console.log('JSON is ', JSON.stringify(newMeal))
    const response = await fetch(`/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: newMeal })
    })
    const addedMeal = await response.json()
    if (response.ok) {
      // update meals list

    } else {
      setErrors(Object.values(addedMeal.errors))
    }
  }
  const mealsList = <ul>
    {meals.map(meal => {
      return <li key={meal.id}>{meal.name}</li>
    })}
  </ul>
  return (
    <>
      {mealsList}
      <div>
        <label htmlFor="new-meal">Add a new meal: </label>
        <input
          id="new-meal"
          value={newMeal}
          onChange={(e) => setNewMeal(e.target.value)}></input>
        <button onClick={addAMeal}>Submit</button>
        {errors.length > 0 && (
          <ul style={{ color: "red" }}>
            {errors.map((error) => (
              <li key={error}> {`Meal ${error}`} </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default Meals