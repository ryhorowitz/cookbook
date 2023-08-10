import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../AppContext"

function CreateRecipe() {
  const { meals } = useContext(UserContext)
  const [errors, setErrors] = useState([])
  const [recipeForm, setRecipeForm] = useState({
    title: '',
    description: '',
    meal_id: 0
  })
  const navigate = useNavigate()
  // useEffect(() => {
  //   setRecipeForm({ ...recipeForm, meal_id: meals[0].id })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  async function handleSubmitRecipe(e) {
    e.preventDefault()
    if (mealIsNotChoosen()) { return }
    const response = await fetch(`/recipes`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipeForm)
    })
    const recipe = await response.json()

    if (response.ok) {
      console.log('recipe is', recipe)
      navigate('/home')
    } else {
      console.error(recipe.errors)
      setErrors(recipe.errors)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setRecipeForm({
      ...recipeForm,
      [name]: value
    })
  }
  function mealIsNotChoosen() {
    if (recipeForm.meal_id === 0) {
      alert('Please choose a meal')
      return true
    }
  }
  function handleMealSelection(e) {
    setRecipeForm({ ...recipeForm, meal_id: e.target.selectedOptions[0].id })
  }
  const mealOptions = meals.map(meal => {
    return <option
      key={meal.id}
      id={meal.id}
      value={meal.id}
    >{meal.name}</option>
  })
  mealOptions.unshift(<option
    key={0}
    id={0}
    value={'Choose Meal'}
  >-Choose Meal-</option>)

  return (
    <>
      <form onSubmit={handleSubmitRecipe}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={recipeForm.title}
            onChange={handleChange}></input>
        </div>
        <div>
          <label htmlFor="meal">Meal:</label>
          <select
            name="meal_id"
            value={recipeForm.meal_id}
            onChange={handleMealSelection}>
            {mealOptions}
          </select>
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            type="text"
            id="description"
            name="description"
            rows="8"
            cols="50"
            value={recipeForm.description}
            onChange={handleChange}></textarea>
        </div>
        <button type="submit">Submit</button>
        {errors.length > 0 ?
          <ul style={{ color: "red" }}>
            {errors.map((error) => (
              <li key={error}> {error} </li>
            ))}
          </ul>
          : null}
      </form>
    </>
  )
}

export default CreateRecipe