import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../AppContext"

function CreateRecipe() {
  const { meals } = useContext(UserContext)
  const [recipeForm, setRecipeForm] = useState({
    title: '',
    description: '',
    meal_id: 0
  })
  function handleSubmitRecipe() {

  }
  function handleChange(e) {
    const { name, value } = e.target
    setRecipeForm({
      ...recipeForm,
      [name]: value
    })
  }

  function handleMealSelection() {

  }
  const mealOptions = meals.map(meal => {
    <option key={meal.id}>{meal.name}</option>
  })
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
      </form>
    </>
  )
}

export default CreateRecipe